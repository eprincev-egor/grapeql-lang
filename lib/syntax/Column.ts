

import {Syntax} from "lang-coach";
import Expression from "./Expression";
import ObjectName from "./ObjectName";
import DoubleQuotes from "./DoubleQuotes";
import {GrapeQLCoach} from "../GrapeQLCoach";

const keywords = [
    "from",
    "where",
    "having",
    "offset",
    "limit",
    "fetch",
    "union",
    "intersect",
    "except",
    "order",
    "group",
    // @see joins
    "on",
    "using",
    "left",
    "right",
    "full",
    "inner",
    "cross",
    "join"
];

export default class Column extends Syntax<Column> {
    structure() {
        return {
            expression: Expression,
            as: ObjectName
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        data.expression = coach.parse(Expression, { 
            availableStar: true 
        });

        // select 1 as id
        if ( coach.isWord("as") ) {
            coach.expectWord("as");

            data.as = coach.parse(ObjectName);
        }
        // select 1 "id"
        else if ( coach.is(DoubleQuotes) ) {
            data.as = coach.parse(ObjectName);
        }
        // select 1 id
        else if ( coach.is(ObjectName) ) {
            const i = coach.i;
            const word = coach.readWord();
            coach.i = i;

            // select 1 from table
            if ( !keywords.includes(word) ) {
                data.as = coach.parse(ObjectName);
            }
        }
    }

    is(coach: GrapeQLCoach) {
        const checkpoint = coach.i;
        coach.skipSpace();

        if ( coach.isWord() ) {
            const word = coach.readWord();
            coach.i = checkpoint;

            return !keywords.includes(word);
        }

        coach.i = checkpoint;
        return coach.is(Expression, { availableStar: true });
    }

    toString() {
        let out = this.row.expression.toString();

        if ( this.row.as ) {
            out += " as " + this.row.as.toString();
        }

        return out;
    }
}

