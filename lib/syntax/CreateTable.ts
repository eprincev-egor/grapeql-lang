
import {Syntax, Types} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import CreateTableElement from "./CreateTableElement";
import ColumnDefinition from "./ColumnDefinition";
import ForeignKeyConstraint from "./ForeignKeyConstraint";
import CheckConstraint from "./CheckConstraint";
import UniqueConstraint from "./UniqueConstraint";
import PrimaryKeyConstraint from "./PrimaryKeyConstraint";
import ObjectName from "./ObjectName";
import Constraint from "./Constraint";
import ObjectLink from "./ObjectLink";
import ValuesRow from "./ValuesRow";
import PgNull from "./PgNull";
import PgNumber from "./PgNumber";
import SingleQuotesString from "./SingleQuotesString";
import DollarString from "./DollarString";
import Boolean from "./Boolean";
import Operator from "./Operator";
import DataType from "./DataType";

export default class CreateTable extends Syntax<CreateTable> {
    structure() {
        return {
            name: ObjectName,
            columns: Types.Array({
                element: ColumnDefinition
            }),
            constraints: Types.Array({
                element: Types.Or({
                    or: [
                        ForeignKeyConstraint,
                        CheckConstraint,
                        UniqueConstraint,
                        PrimaryKeyConstraint
                    ]
                })
            }),
            inherits: Types.Array({
                element: ObjectLink,
                nullAsEmpty: true
            }),
            deprecated: Types.Array({
                element: ObjectName,
                nullAsEmpty: true
            }),
            values: Types.Array({
                element: ValuesRow,
                nullAsEmpty: true
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.isWord("create") ) {
            coach.expectWord("create");
        }

        coach.expectWord("table");
        data.name = coach.parse(ObjectName);

        coach.expect("(");
        coach.skipSpace();


        // parse table content
        const elements = coach.parseComma(CreateTableElement);
        const tableElements = elements.map((element) => 
            element.get("element")
        );

        // table columns
        const columns = tableElements.filter((element) =>
        element instanceof ColumnDefinition
        ) as ColumnDefinition[];

        // table constraints
        const constraints = tableElements.filter((element) =>
            element instanceof Constraint
        ) as Constraint[];


        // validate columns names
        const existsColumnNames = {};
        for (const column of columns) {
            const name = column.get("name").toString();

            if ( name in existsColumnNames ) {
                coach.throwError("duplicate column name: " + name);
            }

            existsColumnNames[ name ] = true;
        }

        // validate constraints names
        const existsConstraintNames = {};
        for (const constraint of constraints) {
            const name = constraint.get("name").toString();

            if ( name in existsConstraintNames ) {
                coach.throwError("duplicate constraint name: " + name);
            }

            existsConstraintNames[ name ] = true;
        }

        // table should have only one primary key
        let existsPrimaryKey = false;
        for (const constraint of constraints) {
            if ( constraint instanceof PrimaryKeyConstraint ) {
                if ( existsPrimaryKey ) {
                    coach.throwError("duplicate primary key");
                }
                existsPrimaryKey = true;
            }
        }
        for (const column of columns) {
            if ( column.get("primaryKey") ) {
                if ( existsPrimaryKey ) {
                    coach.throwError("duplicate primary key");
                }
                existsPrimaryKey = true;
            }
        }


        
        data.columns = columns;
        data.constraints = constraints as Array<
            ForeignKeyConstraint |
            CheckConstraint |
            UniqueConstraint |
            PrimaryKeyConstraint
        >;

        coach.skipSpace();
        coach.expect(")");

        if ( coach.isWord("inherits") ) {
            coach.expectWord("inherits");

            coach.expect("(");
            coach.skipSpace();

            data.inherits = coach.parseComma(ObjectLink);

            coach.skipSpace();
            coach.expect(")");
        }


        if ( coach.isWord("deprecated") ) {
            coach.expectWord("deprecated");

            coach.expect("(");
            coach.skipSpace();

            data.deprecated = coach.parseComma(ObjectName);

            coach.skipSpace();
            coach.expect(")");
        }


        if ( coach.isWord("values") ) {
            coach.expectWord("values");

            coach.expect("(");
            coach.skipSpace();

            const rows = coach.parseComma(ValuesRow);
            data.values = rows;

            // validate values
            const firstRow = rows[0];
            const firstRowValues = firstRow.get("values");

            rows.forEach((row) => {
                const rowValues = row.get("values");

                if ( rowValues.length > columns.length ) {
                    coach.throwError("values has more expressions that table columns");
                }

                if ( rowValues.length !== firstRowValues.length ) {
                    coach.throwError("VALUES lists must all be the same length");
                }

                this.checkValues(coach, columns, row);
            });

            this.checkUniqueValues(coach, columns, constraints, rows);

            coach.skipSpace();
            coach.expect(")");
        }
    }

    checkValues(coach: GrapeQLCoach, columns: ColumnDefinition[], row: ValuesRow) {
        const rowValues = row.get("values");
        rowValues.forEach((valueItem, i) => {
            const column = columns[i];
            const value = valueItem.get("value");
            const type = column.get("type");
            
            if ( !value ) {// valueItem can be 'default'
                return;
            }

            // validate expression,
            // expression should be constant or 
            // constant::type
            const valueElements = value.get("elements");
            const firstElem = valueElements[0];
            const isConstant = (
                firstElem instanceof PgNull ||
                firstElem instanceof PgNumber ||
                firstElem instanceof SingleQuotesString ||
                firstElem instanceof DollarString ||
                firstElem instanceof Boolean
            );
            const castingType = valueElements[2] as DataType;

            if ( !isConstant ) {
                coach.throwError("values should content only constants");
            }
            if ( valueElements.length !== 1 ) {
                const secondElem = valueElements[1];
                const thirdElem = valueElements[2];
                
                const isCasting = (
                    secondElem instanceof Operator &&
                    secondElem.get("operator") === "::"
                    &&
                    thirdElem instanceof DataType
                );

                if ( !isCasting ) {
                    coach.throwError("values should content only constants");
                }
            }

            if ( firstElem instanceof PgNull ) {
                return;
            }

            // column: 'serial', value: '1'::integer
            if ( castingType ) {
                if ( castingType.equalSameType(type) ) {
                    return;
                }

                const shouldBeType = (
                    type.isText() ?
                        "text" :
                        type.isInteger() ?
                            "integer" :
                            type.isNumber() ?
                                "numeric" :
                                type.get("type")
                );
                coach.throwError(`casting type for column ${column.get("name")} should be ${ shouldBeType }`);
            }

            // validate constant type
            const constantElem = value.get("elements")[0];
            
            if ( type.isNumber() ) {
                if ( !(constantElem instanceof PgNumber) ) {
                    coach.throwError(`values for column ${column.get("name")} should be number`);
                }

                if ( type.isInteger() ) {
                    const numb = +constantElem.get("number");
                    const isFloat = Math.floor(numb) !== numb;

                    if ( isFloat ) {
                        coach.throwError(`values for column ${column.get("name")} should be not float number`);
                    }
                }
            }


            if ( type.isText() ) {
                const isTextConstant = (
                    constantElem instanceof SingleQuotesString ||
                    constantElem instanceof DollarString
                );
                if ( isTextConstant ) {
                    return;
                }

                coach.throwError(`values for column ${column.get("name")} should be text`);
            }

            if ( type.isBoolean() ) {
                if ( constantElem instanceof Boolean ) {
                    return;
                }

                coach.throwError(`values for column ${column.get("name")} should be boolean`);
            }
        });

        columns.forEach((column, i) => {
            const isNotNull = column.get("nulls") === false;
            const hasDefault = (
                !!column.get("default") ||
                column.get("type").isSerial()
            );
            const value = (
                rowValues[i] && 
                rowValues[i].get("value")
            );
            const firstElem = (
                value &&
                value.get("elements")[0]
            );

            const hasValue = (
                !!rowValues[i] &&
                !rowValues[i].get("default")
            );

            const isInvalid = isNotNull && (
                !hasDefault && !hasValue
                ||
                firstElem instanceof PgNull
            );
            
            if ( isInvalid ) {
                coach.throwError(`need value for not null column: ${column.get("name")}`);
            }
        });
    }

    checkUniqueValues(
        coach: GrapeQLCoach, 
        columns: ColumnDefinition[],
        constraints: Constraint[],
        rows: ValuesRow[]
    ) {
        const uniqueness: ObjectName[][] = [];

        constraints.forEach((constraint) => {
            if ( constraint instanceof UniqueConstraint ) {
                uniqueness.push( constraint.get("unique") );
            }
            else if ( constraint instanceof PrimaryKeyConstraint ) {
                uniqueness.push( constraint.get("primaryKey") );
            }
        });

        columns.forEach((column) => {
            const isUniqueColumn = (
                !!column.get("unique") ||
                !!column.get("primaryKey")
            );
            if ( isUniqueColumn ) {
                uniqueness.push( [column.get("name")] );
            }
        });

        uniqueness.forEach((uniqueKeys) => {
            const existsValue: Array<Array<Syntax<any>>> = [];

            const columnsIndexes = uniqueKeys.map((key) =>
                columns.findIndex((column) =>
                    column.get("name").equal(key)
                )
            );

            // for special checks
            const SERIAL_VALUE = {};

            rows.forEach((row) => {
                const rowValues = row.get("values");
                const values = columnsIndexes
                    .map((columnIndex) => 
                        rowValues[columnIndex]
                    )
                    .map((valueItem, i) => {
                        // when no column inside values
                        if ( valueItem == null ) {
                            return null;
                        }

                        // when used keyword 'default'
                        if ( valueItem.get("default") ) {
                            const column = columns[i];
                            const defaultValue = column.get("default");
                            
                            if ( defaultValue ) {
                                return defaultValue;
                            }

                            if ( column.get("type").isSerial() ) {
                                return SERIAL_VALUE;
                            }

                            return null;
                        }
                        else {
                            // get first element from expression
                            const value = valueItem.get("value");
                            const firstElem = value.get("elements")[0];

                            if ( firstElem instanceof PgNull ) {
                                return null;
                            }

                            return firstElem;
                        }
                    }) as Array<Syntax<any>>;
                
                
                const isDuplicate = existsValue.some((anotherValues) => 
                    anotherValues.every((anotherValue, i) =>
                        anotherValue != null &&
                        values[i] != null &&
                        anotherValue !== SERIAL_VALUE &&
                        values[i] !== SERIAL_VALUE &&
                        anotherValue.equal( values[i] )
                    )
                );
                if ( isDuplicate ) {
                    coach.throwError(`unique columns (${uniqueKeys}) cannot contain duplicate values: ${values}`);
                }
                existsValue.push(values);
            });
        });
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("create") || coach.isWord("table");
    }
    
    toString() {
        const name = this.data.name;
        let out = `table ${name} (`;


        const columns = this.data.columns.map((item) => 
            item.toString()
        ).join(", ");

        out += columns;


        if ( this.data.constraints.length ) {
            const constraints = this.data.constraints.map((item) => 
                item.toString()
            ).join(", ");

            
            out += ", ";
            out += constraints;
        }


        out += ")";


        if ( this.data.inherits.length ) {
            out += " inherits (";
            out += this.data.inherits.map((item) => 
                item.toString()
            ).join(", ");
            out += ")";
        }

        
        if ( this.data.deprecated.length ) {
            out += " deprecated (";
            out += this.data.deprecated.map((item) => 
                item.toString()
            ).join(", ");
            out += ")";
        }


        if ( this.data.values.length ) {
            out += " values (";
            out += this.data.values.map((item) => 
                item.toString()
            ).join(", ");
            out += ")";
        }

        return out;
    }
}


