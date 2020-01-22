
import {Syntax, Types, Coach} from "lang-coach";
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
import ValueItem from "./ValueItem";

// for equaling
const DEFAULT_VALUE = {};

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
            
            this.validateValues(coach, columns, constraints, rows);

            coach.skipSpace();
            coach.expect(")");
        }
    }

    validateValues(
        coach: GrapeQLCoach, 
        columns: ColumnDefinition[], 
        constraints: Constraint[],
        rows: ValuesRow[]
    ) {
        const uniqueness = this.buildUniqueness(columns, constraints);
        const prevDataLines: any[][] = [];

        const firstRow = rows[0];
        const firstRowValues = firstRow.get("values");

        // to much values!
        if ( firstRowValues.length > columns.length ) {
            coach.throwError("values has more expressions that table columns");
        }

        
        rows.forEach((row, rowIndex) => {
            const dataLine = [];
            prevDataLines.push(dataLine);

            const rowValues = row.get("values");

            // every values row should have same length
            if ( rowValues.length !== firstRowValues.length ) {
                coach.throwError("VALUES lists must all be the same length");
            }

            // converting valueRow to primitive values
            columns.forEach((column, columnIndex) => {
                const valueItem = rowValues[columnIndex];
                
                let value;
                try {
                    value = this.valueItem2value(column, valueItem, rowIndex);
                } catch (err) {
                    if ( /cannot convert/.test(err.message) ) {
                        coach.throwError("values should content only constants");
                    }
                    else {
                        throw err;
                    }
                }

                // validate not nulls
                const isNotNull = column.get("nulls") === false;
                if ( isNotNull && value === null ) {
                    coach.throwError(`need value for not null column: ${column.get("name")}`);
                }

                // validate type
                this.validateValueType(coach, column, value);
    

                dataLine[columnIndex] = value;
            });

            // validate uniqueness
            uniqueness.forEach((uniqueKeys) => {
                const columnsIndexes = uniqueKeys.map((key) => 
                    columns.findIndex((column) =>
                        column.get("name").equal(key)
                    )
                );

                const currentValues = columnsIndexes.map((columnIndex) =>
                    dataLine[columnIndex]
                );
                for (let i = rowIndex - 1; i >= 0; i--) {
                    const prevDataLine = prevDataLines[i];
                    const prevValues = columnsIndexes.map((columnIndex) =>
                        prevDataLine[columnIndex]
                    );
    
                    const isDuplicate = prevValues.every((prevValue, j) =>
                        prevValue != null &&
                        currentValues[j] != null &&
                        prevValue !== DEFAULT_VALUE &&
                        currentValues[j] !== DEFAULT_VALUE &&
                        prevValue === currentValues[j]
                    );
                    if ( isDuplicate ) {
                        coach.throwError(`unique columns (${uniqueKeys}) cannot contain duplicate values: ${currentValues}`);
                    }
                }
            });
        });
    }

    validateValueType(coach: GrapeQLCoach, column: ColumnDefinition, value: any) {
        if ( value === DEFAULT_VALUE ) {
            return;
        }
        if ( value === null ) {
            return;
        }

        const type = column.get("type");
        if ( type.isNumber() ) {
            if ( typeof value !== "number" ) {
                coach.throwError(`values for column ${column.get("name")} should be number`);
            }

            if ( type.isInteger() ) {
                const isFloat = Math.floor(value) !== value;

                if ( isFloat ) {
                    coach.throwError(`values for column ${column.get("name")} should be not float number`);
                }
            }
        }

        else if ( type.isText() ) {
            if ( typeof value !== "string" ) {
                coach.throwError(`values for column ${column.get("name")} should be text`);
            }
        }

        else if ( type.isBoolean() ) {
            if ( typeof value !== "boolean" ) {
                coach.throwError(`values for column ${column.get("name")} should be boolean`);
            }
        }
    }

    buildUniqueness(
        columns: ColumnDefinition[],
        constraints: Constraint[]
    ): ObjectName[][] {
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

        return uniqueness;
    }

    // Syntax ValueItem => primitive value
    valueItem2value(column: ColumnDefinition, valueItem: ValueItem, rowIndex: number) {
        const type = column.get("type");
        let value;
        
        const isDefault = (
            // when: value row length less then columns length
            !valueItem || 
            // when: inside valueItem used keyword 'default'
            valueItem.get("default")
        );
        
        // need use default expression
        if ( isDefault ) {

            // special pseudo types: smallserial, serial, bigserial
            if ( type.isSerial() ) {
                return rowIndex + 1;
            }

            // column default can contain primitive value: 'some name'
            const columnDefault = column.get("default");

            // try convert column default expression to primitive value
            if ( columnDefault ) {
                // but column default expression can contain function call
                // column for example: dt_create date default now()
                try {
                    value = columnDefault.toPrimitiveValue();
                } catch (err) {
                    if ( /cannot convert/.test(err) ) {
                        return DEFAULT_VALUE;
                    }
                    else {
                        throw err;
                    }
                }
            }
            // column can be without default expression
            else {
                value = null;
            }
        } else {
            value = valueItem.get("value").toPrimitiveValue();
        }
        
        return value;
    }

    is(coach: GrapeQLCoach) {
        return coach.is(/(create\s+)?table/i);
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


