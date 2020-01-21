
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
import ValueItem from "./ValueItem";

type TPrimitive = (
    number |
    string |
    boolean
);

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
            
            this.validateValues(coach, columns, rows);

            coach.skipSpace();
            coach.expect(")");
        }
    }

    validateValues(
        coach: GrapeQLCoach, 
        columns: ColumnDefinition[], 
        rows: ValuesRow[]
    ) {
        const prevDataLines: any[][] = [];

        const firstRow = rows[0];
        const firstRowValues = firstRow.get("values");

        rows.forEach((row) => {
            const dataLine = [];
            prevDataLines.push(dataLine);

            const rowValues = row.get("values");

            if ( rowValues.length > columns.length ) {
                coach.throwError("values has more expressions that table columns");
            }

            if ( rowValues.length !== firstRowValues.length ) {
                coach.throwError("VALUES lists must all be the same length");
            }

            columns.forEach((column, i) => {
                const type = column.get("type");
                const valueItem = rowValues[i];

                if ( !valueItem ) {
                    dataLine[i] = null;
                }
            });
        });
    }

    // Syntax ValueItem => primitive value
    valueItem2value(column: ColumnDefinition, valueItem: ValueItem, rowIndex: number) {
        const type = column.get("type");
        const columnDefault = column.get("default");
        let value: TPrimitive;
        
        const isKeywordDefault = valueItem.get("default");
        if ( isKeywordDefault ) {

            if ( type.isSerial() ) {
                value = rowIndex + 1;
            }
        }
        
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


