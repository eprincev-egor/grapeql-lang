"use strict";

import {Syntax} from "lang-coach";
import Expression from "./Expression";
import ObjectName from "./ObjectName";

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

    parse(coach, data) {
        data.expression = coach.parseExpression({ 
            availableStar: true 
        });

        // select 1 as id
        if ( coach.isWord("as") ) {
            coach.expectWord("as");

            data.as = coach.parseObjectName();
        }
        // select 1 "id"
        else if ( coach.isDoubleQuotes() ) {
            data.as = coach.parseObjectName();
        }
        // select 1 id
        else if ( coach.isObjectName() ) {
            const i = coach.i;
            const word = coach.readWord();
            coach.i = i;

            // select 1 from table
            if ( !keywords.includes(word) ) {
                data.as = coach.parseObjectName();
            }
        }
    }

    is(coach) {
        if ( coach.isWord() ) {
            const i = coach.i;
            const word = coach.readWord();
            coach.i = i;

            return !keywords.includes(word);
        }

        return coach.isExpression({ availableStar: true });
    }

    toString() {
        let out = this.data.expression.toString();

        if ( this.data.as ) {
            out += " as " + this.data.as.toString();
        }

        return out;
    }
}

