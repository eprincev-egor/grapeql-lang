"use strict";

const {Syntax} = require("lang-coach");
const ValueItem = require("./ValueItem");

class ValuesRow extends Syntax {
    static structure() {
        return {
            values: [ValueItem]
        };
    }

    static parse(coach, data) {
        coach.expect("(");
        coach.skipSpace();

        data.values = coach.parseComma("ValueItem");

        coach.skipSpace();
        coach.expect(")");
    }

    static is(coach) {
        return coach.is("(");
    }

    toString() {
        let out = "(";

        out += this.data.values.map(valueItem => valueItem.toString()).join(", ");

        out += ")";
        return out;
    }
}

module.exports = ValuesRow;