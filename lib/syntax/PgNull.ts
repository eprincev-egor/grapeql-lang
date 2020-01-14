"use strict";

import {Syntax, Types} from "lang-coach";

export default class PgNull extends Syntax<PgNull> {
    structure() {
        return {
            null: Types.Boolean({
                default: true
            })
        };
    }

    is(coach) {
        return coach.isWord("null");
    }

    parse(coach) {
        coach.expectWord("null");
    }

    toString() {
        return "null";
    }
}

