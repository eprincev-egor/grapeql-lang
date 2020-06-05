
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach, With, TableLink, ObjectName, Select, OnConflict} from "../GrapeQLCoach";
import ValuesRow from "./ValuesRow";
import {Returning} from "./Returning";


/*
[ WITH [ RECURSIVE ] with_query [, ...] ]
INSERT INTO table_name [ AS alias ] [ ( column_name [, ...] ) ]
    { DEFAULT VALUES | VALUES ( { expression | DEFAULT } [, ...] ) [, ...] | query }
    [ ON CONFLICT [ conflict_target ] conflict_action ]
    [ RETURNING * | output_expression [ [ AS ] output_name ] [, ...] ]

where conflict_target can be one of:

    ( { index_column_name | ( index_expression ) } [ COLLATE collation ] [ opclass ] [, ...] ) [ WHERE index_predicate ]
    ON CONSTRAINT constraint_name

and conflict_action is one of:

    DO NOTHING
    DO UPDATE SET { column_name = { expression | DEFAULT } |
                    ( column_name [, ...] ) = ( { expression | DEFAULT } [, ...] ) |
                    ( column_name [, ...] ) = ( sub-SELECT )
                  } [, ...]
              [ WHERE condition ]
 */

export class Insert extends Syntax<Insert> {
    structure() {
        return {
            with: With,
            table: TableLink,
            as: ObjectName,
            columns: Types.Array({
                element: ObjectName
            }),
            defaultValues: Types.Boolean,
            values: Types.Array({
                element: ValuesRow
            }),
            select: Select,
            onConflict: OnConflict,
            returning: Returning
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        
        if ( coach.is(With) ) {
            data.with = coach.parse(With);
            coach.skipSpace();
        }

        coach.expectWord("insert");
        coach.expectWord("into");

        data.table = coach.parse(TableLink);
        coach.skipSpace();

        if ( coach.isWord("as") ) {
            coach.expectWord("as");

            data.as = coach.parse(ObjectName);
            coach.skipSpace();
        }

        if ( coach.is("(") ) {
            coach.expect("(");
            coach.skipSpace();

            data.columns = coach.parseComma(ObjectName);

            coach.skipSpace();
            coach.expect(")");
            coach.skipSpace();
        }

        if ( coach.isWord("default") ) {
            coach.expectWord("default");
            coach.expectWord("values");
            data.defaultValues = true;
        }
        else if ( coach.isWord("values") ) {
            coach.expectWord("values");

            const values: ValuesRow[] = coach.parseComma(ValuesRow);
            data.values = values;
            
            const length = values[0].get("values").length;
            for (let i = 0, n = values.length; i < n; i++) {
                const valuesRow = values[ i ];
                
                if ( valuesRow.get("values").length !== length ) {
                    coach.throwError("VALUES lists must all be the same length");
                }
            }
        }
        else {
            data.select = coach.parse(Select);
        }

        coach.skipSpace();
        if ( coach.is(OnConflict) ) {
            data.onConflict = coach.parse(OnConflict);
        }

        if ( coach.is(Returning) ) {
            data.returning = coach.parse(Returning);
        }
    }

    is(coach: GrapeQLCoach) {
        if ( coach.isWord("insert") ) {
            return true;
        }
        if ( coach.is(With) ) {
            const index = coach.i;
            coach.parse(With);
            coach.skipSpace();

            const isInsert = coach.isWord("insert");
            coach.i = index;

            return isInsert;
        } else {
            return false;
        }
    }

    toString() {
        const row = this.row;
        let out = "";

        if ( row.with ) {
            out += row.with.toString();
            out += " ";
        }
        
        out += "insert into ";
        out += row.table.toString();

        if ( row.as ) {
            out += " as ";
            out += row.as.toString();
        }

        if ( row.columns ) {
            out += "(";
            out += row.columns.map((name) => name.toString()).join(", ");
            out += ")";
        }

        if ( row.defaultValues ) {
            out += " default values";
        }
        else if ( row.values ) {
            out += " values ";
            out += row.values.map((valueRow) => valueRow.toString()).join(", ");
        }
        else {
            out += " ";
            out += row.select.toString();
        }

        if ( row.onConflict ) {
            out += " ";
            out += row.onConflict.toString();
        }

        if ( row.returning ) {
            out += " ";
            out += row.returning.toString();
        }

        return out;
    }
}
