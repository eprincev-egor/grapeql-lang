import { Syntax, Types } from "lang-coach";
import { GrapeQLCoach } from "../GrapeQLCoach";
import { ObjectName } from "./ObjectName";
import { ObjectLink } from "./ObjectLink";
import { Expression } from "./Expression";

// index INDEX_TYPE on ( { COLUMN_NAME | ( EXPRESSION ) } [, ...] ) 

export class CacheIndex extends Syntax<CacheIndex> {
    structure() {
        return {
            index: Types.String({
                required: true
            }),
            on: Types.Array({
                element: Types.Or({
                    or: [
                        ObjectName,
                        Expression
                    ]
                })
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("index");
        data.index = coach.expectWord();

        coach.expectWord("on");
        coach.expect("(");

        const on: any[] = [];
        do {
            coach.skipSpace();
            const expression = coach.parse(Expression);
            const elements = expression.get("elements") || [];

            const link = elements[0];
            if (
                elements.length === 1 && 
                link instanceof ObjectLink
            ) {
                const columnName = link.last();
                on.push(columnName);
            }
            else {
                on.push(expression);
            }


            coach.skipSpace();
            if ( coach.isWord("desc") || coach.isWord("asc") ) {
                coach.readWord();
                coach.skipSpace();
            }

            if ( coach.isWord("nulls") ) {
                coach.readWord();
                coach.skipSpace();
                coach.readWord();
            }

            if ( coach.isWord("jsonb_path_ops") || coach.isWord("json_path_ops") ) {
                coach.readWord();
                coach.skipSpace();
            }

            coach.skipSpace();
            if ( coach.is(",") ) {
                coach.expect(",");
                coach.skipSpace();
            }
            else {
                break;
            }
        }
        while ( coach.is(Expression) );

        coach.expect(")");

        data.on = on;
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("index");
    }
    
    toString() {
        let sql = "index " + this.row.index + " on (";

        const on = (this.row.on || []);
        sql += on.map(elem => 
            elem.toString()
        ).join(", ");

        sql += ")";
        return sql;
    }
}
