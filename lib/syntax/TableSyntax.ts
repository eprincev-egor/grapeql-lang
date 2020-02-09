
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import CreateTableElement from "./CreateTableElement";
import ColumnDefinition from "./ColumnDefinition";
import ForeignKeyConstraint from "./ForeignKeyConstraint";
import CheckConstraint from "./CheckConstraint";
import UniqueConstraint from "./UniqueConstraint";
import PrimaryKeyConstraint from "./PrimaryKeyConstraint";
import Constraint from "./Constraint";
import ValuesRow from "./ValuesRow";

export default class TableSyntax<Child extends TableSyntax = any> extends Syntax<TableSyntax & Child> {
    structure() {
        return {
            columns: Types.Array({
                element: ColumnDefinition,
                nullAsEmpty: true
            }),
            constraints: Types.Array({
                element: Types.Or({
                    or: [
                        ForeignKeyConstraint,
                        CheckConstraint,
                        UniqueConstraint,
                        PrimaryKeyConstraint
                    ]
                }),
                nullAsEmpty: true
            }),
            valuesRows: Types.Array({
                element: ValuesRow,
                nullAsEmpty: true
            })
        };
    }

    parseBody(coach: GrapeQLCoach, data: this["TInputData"]) {
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
    }

    parseValues(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.isWord("values") ) {
            coach.expectWord("values");

            coach.expect("(");
            coach.skipSpace();

            const rows = coach.parseComma(ValuesRow);
            data.valuesRows = rows;
            
            coach.skipSpace();
            coach.expect(")");
        }
    }

    bodyToString() {
        let out = "(";

        const columns = this.row.columns.map((item) => 
            item.toString()
        ).join(", ");

        out += columns;


        if ( this.row.constraints.length ) {
            const constraints = this.row.constraints.map((item) => 
                item.toString()
            ).join(", ");


            if ( columns.length ) {
                out += ", ";
            }

            out += constraints;
        }

        out += ")";

        return out;
    }

    valuesToString() {
        let out = "";

        if ( this.row.valuesRows.length ) {
            out += " values (";
            out += this.row.valuesRows.map((item) => 
                item.toString()
            ).join(", ");
            out += ")";
        }

        return out;
    }
}


