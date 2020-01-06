"use strict";

import {Syntax} from "lang-coach";

export default class PgNull extends Syntax<PgNull> {
    structure() {
        return {
            null: {
                type: "boolean",
                default: true
            }
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

