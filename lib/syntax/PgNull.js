"use strict";

const {Syntax} = require("lang-coach");

class PgNull extends Syntax {
    static structure() {
        return {
            null: {
                type: "boolean",
                default: true
            }
        };
    }

    static is(coach) {
        return coach.isWord("null");
    }

    static parse(coach) {
        coach.expectWord("null");
    }

    toString() {
        return "null";
    }
}

module.exports = PgNull;