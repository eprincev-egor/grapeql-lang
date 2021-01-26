import { Syntax, Types } from "lang-coach";
import { GrapeQLCoach } from "../GrapeQLCoach";
import { ObjectName } from "./ObjectName";
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

            if ( coach.is(ObjectName) ) {
                const name = coach.parse(ObjectName);
                on.push( name );

                coach.skipSpace();
                if ( coach.isWord("desc") || coach.isWord("asc") ) {
                    coach.readWord();
                    coach.skipSpace();
                    
                    if ( coach.isWord("nulls") ) {
                        coach.readWord();
                        coach.skipSpace();
                        coach.readWord();
                    }
                }
            }
            else if ( coach.is("(") ) {
                coach.expect("(");
                coach.skipSpace();

                const expression = coach.parse(Expression);
                on.push( expression );
            }
            else {
                coach.throwError("expected column name or (expression)")
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
        while ( coach.is(ObjectName) || coach.is("(") );

        coach.expect(")");

        data.on = on;
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("index");
    }
    
    toString() {
        let sql = "index " + this.row.index + " on (";

        const on = (this.row.on || []);
        sql += on.map(elem => {
            if ( elem instanceof ObjectName ) {
                return elem.toString();
            }
            else {
                return `(${ elem.toString() })`;
            }
        }).join(", ");

        sql += ")";
        return sql;
    }
}
