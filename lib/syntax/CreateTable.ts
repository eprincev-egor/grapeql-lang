
import {Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {ColumnDefinition} from "./ColumnDefinition";
import {TableSyntax} from "./TableSyntax";
import {ObjectName} from "./ObjectName";
import {ObjectLink} from "./ObjectLink";
import {ValuesRow} from "./ValuesRow";
import {Constraint} from "./Constraint";
import {ValueItem} from "./ValueItem";
import {UniqueConstraint} from "./UniqueConstraint";
import {PrimaryKeyConstraint} from "./PrimaryKeyConstraint";

export class CreateTable extends TableSyntax<CreateTable> {
    structure() {
        return {
            ...super.structure(),
            schema: ObjectName,
            name: ObjectName,
            inherits: Types.Array({
                element: ObjectLink,
                nullAsEmpty: true
            }),
            values: Types.Array({
                element: Types.Object({
                    element: Types.Any
                }),
                nullAsEmpty: true
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.isWord("deprecated") ) {
            coach.expectWord("deprecated");
            data.deprecated = true;
        }

        if ( coach.isWord("create") ) {
            coach.expectWord("create");
        }

        coach.expectWord("table");
        data.name = coach.parse(ObjectName);
        
        if ( coach.is(/\s*\./) ) {
            coach.skipSpace();
            coach.expect(".");
            coach.skipSpace();

            data.schema = data.name;
            data.name = coach.parse(ObjectName);
        }

        super.parseBody(coach, data);
        
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

            data.deprecatedColumns = coach.parseComma(ObjectName);

            coach.skipSpace();
            coach.expect(")");
        }

        super.parseValues(coach, data);
        
        if ( data.valuesRows ) {
            data.values = this.prepareValues(
                coach, 
                data.columns as ColumnDefinition[], 
                data.constraints as Constraint[], 
                data.valuesRows as ValuesRow[]
            );
        }

    }

    prepareValues(
        coach: GrapeQLCoach, 
        columns: ColumnDefinition[], 
        constraints: Constraint[],
        rows: ValuesRow[]
    ): object[] {
        const uniqueness = this.buildUniqueness(columns, constraints);
        const prevDataLines: any[][] = [];
        const outputRows: object[] = [];

        const firstRow = rows[0];
        const firstRowValues = firstRow.get("values");

        // to much values!
        if ( firstRowValues.length > columns.length ) {
            coach.throwError("values has more expressions that table columns");
        }

        
        rows.forEach((row, rowIndex) => {
            const dataLine = [];
            prevDataLines.push(dataLine);
            const outputRow = {};

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
                        const type = column.get("type");
                        const typeName = (
                            type.isNumber() ? 
                                "number" :
                                type.isText() ? 
                                    "text" :
                                    type.get("type")
                        );
                        coach.throwError(`values for column ${column.get("name")} should be ${ typeName }`);
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

                const key = column.get("name").toString();
                outputRow[ key ]  = value;
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
                        prevValue === currentValues[j]
                    );
                    if ( isDuplicate ) {
                        coach.throwError(`unique columns (${uniqueKeys}) cannot contain duplicate values: ${currentValues}`);
                    }
                }
            });

            outputRows.push(outputRow);
        });

        return outputRows;
    }

    validateValueType(coach: GrapeQLCoach, column: ColumnDefinition, value: any) {
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
                value = columnDefault.toPrimitiveValue();
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
        const checkpoint = coach.i;
    
        if ( coach.isWord("deprecated") ) {
            coach.expectWord("deprecated"); 
        }
        if ( coach.isWord("table") ) {
            coach.i = checkpoint;
            return true;
        }
    
        if ( !coach.isWord("create") ) {
            coach.i = checkpoint;
            return false;
        }
    
        coach.expectWord("create");
        const isCreateTable = coach.isWord("table");
    
        coach.i = checkpoint;
        return isCreateTable;
    }
    
    toString() {
        let out = "";

        if ( this.row.deprecated ) {
            out += "deprecated ";
        }

        out += "table ";
        if ( this.row.schema ) {
            out += this.row.schema.toString();
            out += ".";
        }
        out += this.row.name.toString();

        out += super.bodyToString();

        if ( this.row.inherits.length ) {
            out += " inherits (";
            out += this.row.inherits.map((item) => 
                item.toString()
            ).join(", ");
            out += ")";
        }

        
        if ( this.row.deprecatedColumns.length ) {
            out += " deprecated (";
            out += this.row.deprecatedColumns.map((item) => 
                item.toString()
            ).join(", ");
            out += ")";
        }

        out += super.valuesToString();

        return out;
    }
}


