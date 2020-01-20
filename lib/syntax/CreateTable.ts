
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


