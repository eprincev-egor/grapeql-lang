"use strict";

import {Syntax} from "lang-coach";
import Expression from "./Expression";
import ObjectName from "./ObjectName";
import DoubleQuotes from "./DoubleQuotes";
import GrapeQLCoach from "../GrapeQLCoach";

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
        if ( coach.isWord() ) {
            const i = coach.i;
            const word = coach.readWord();
            coach.i = i;

            return !keywords.includes(word);
        }

        return coach.is(Expression, { availableStar: true });
    }

    toString() {
        let out = this.data.expression.toString();

        if ( this.data.as ) {
            out += " as " + this.data.as.toString();
        }

        return out;
    }
}

