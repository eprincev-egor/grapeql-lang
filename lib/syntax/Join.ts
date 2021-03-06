
/*
 join_type from_item [ ON join_condition | USING ( join_column [, ...] ) ]
where
    join_type One of
        [ INNER ] JOIN
        LEFT [ OUTER ] JOIN
        RIGHT [ OUTER ] JOIN
        FULL [ OUTER ] JOIN
        CROSS JOIN
 */

import {Syntax, Types} from "lang-coach";
import allSyntax from "../allSyntax";
import {Expression} from "./Expression";
import {ObjectName} from "./ObjectName";
import {GrapeQLCoach} from "../GrapeQLCoach";

export class Join extends Syntax<Join> {
    structure() {
        const FromItem = allSyntax.FromItem as GrapeQLCoach["syntax"]["FromItem"];
        
        return {
            type: Types.String,
            from: FromItem,
            on: Expression,
            using: Types.Array({
                element: ObjectName
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const FromItem = allSyntax.FromItem as GrapeQLCoach["syntax"]["FromItem"];

        const lateralErrorIndex = coach.i;

        let type = coach.expect(/(((left|right|full)\s+(outer\s+)?)|(inner\s+)?|cross\s+)join\s+/i, "expected join keyword");
        type = type.toLowerCase()
            // remove unnecessary spaces
            .replace(/\s+/g, " ")
            .trim();

        // coach.skipSpace();
        data.type = type;

        data.from = coach.parse(FromItem);
        coach.skipSpace();

        if ( data.from.get("lateral") ) {
            if ( type !== "join" && type !== "left join" && type !== "inner join" )  {
                coach.i = lateralErrorIndex;
                coach.throwError("The combining JOIN type must be INNER or LEFT for a LATERAL reference");
            }
        }

        if ( coach.isWord("on") ) {
            coach.expectWord("on");

            data.on = coach.parse(Expression);
        }
        else if ( coach.isWord("using") ) {
            coach.expectWord("using");
            
            coach.expect("(");
            coach.skipSpace();

            data.using = coach.parseComma(ObjectName);

            coach.skipSpace();
            coach.expect(")");
        }
        else {
            coach.throwError("expected 'on' or 'using'");
        }
    }

    is(coach: GrapeQLCoach) {
        return coach.is(/(left|right|inner|join|full|cross)\s/i);
    }

    toString() {
        let out = this.row.type!;

        out += " ";
        out += this.row.from!.toString();

        if ( this.row.on ) {
            out += " on\n" + this.row.on.toString({
                parentSpace: "    "
            });
            out += "\n";
        } else {
            out += " using (" + this.row.using!.map((elem) => elem.toString()).join(", ") + ")";
        }

        return out;
    }
}

