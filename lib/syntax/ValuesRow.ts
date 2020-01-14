"use strict";

import {Syntax, Types} from "lang-coach";
import ValueItem from "./ValueItem";

export default class ValuesRow extends Syntax<ValuesRow> {
    structure() {
        return {
            values: Types.Array({
                element: ValueItem
            })
        };
    }

    parse(coach, data) {
        coach.expect("(");
        coach.skipSpace();

        data.values = coach.parseComma("ValueItem");

        coach.skipSpace();
        coach.expect(")");
    }

    is(coach) {
        return coach.is("(");
    }

    toString() {
        let out = "(";

        out += this.data.values.map((valueItem) => valueItem.toString()).join(", ");

        out += ")";
        return out;
    }
}

