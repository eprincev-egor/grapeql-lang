"use strict";

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

import {Syntax} from "lang-coach";
import Expression from "./Expression";
import ObjectName from "./ObjectName";

export default class Join extends Syntax<Join> {
    structure() {
        const FromItem = Join.prototype.Coach.FromItem;
        
        return {
            type: "string",
            from: FromItem,
            on: Expression,
            using: [ObjectName]
        };
    }

    parse(coach, data) {
        let lateralErrorIndex = coach.i;

        let type = coach.expect(/(((left|right|full)\s+(outer\s+)?)|(inner\s+)?|cross\s+)join\s+/i, "expected join keyword");
        type = type.toLowerCase()
            // remove unnecessary spaces
            .replace(/\s+/g, " ")
            .trim();

        // coach.skipSpace();
        data.type = type;

        data.from = coach.parseFromItem();
        coach.skipSpace();

        if ( data.from.get("lateral") ) {
            if ( type != "join" && type != "left join" && type != "inner join" )  {
                coach.i = lateralErrorIndex;
                coach.throwError("The combining JOIN type must be INNER or LEFT for a LATERAL reference");
            }
        }

        if ( coach.isWord("on") ) {
            coach.expectWord("on");

            data.on = coach.parseExpression();
        }
        else if ( coach.isWord("using") ) {
            coach.expectWord("using");
            
            coach.expect("(");
            coach.skipSpace();

            data.using = coach.parseComma("ObjectName");

            coach.skipSpace();
            coach.expect(")");
        }
        else {
            coach.throwError("expected 'on' or 'using'");
        }
    }

    is(coach) {
        return coach.is(/(left|right|inner|join|full|cross)\s/i);
    }

    toString() {
        let out = this.data.type;

        out += " ";
        out += this.data.from.toString();

        if ( this.data.on ) {
            out += " on " + this.data.on.toString();
        } else {
            out += " using (" + this.data.using.map(elem => elem.toString()).join(", ") + ")";
        }

        return out;
    }
}
