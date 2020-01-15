"use strict";

import {Syntax, Types} from "lang-coach";
import ValueItem from "./ValueItem";
import GrapeQLCoach from "../GrapeQLCoach";

export default class ValuesRow extends Syntax<ValuesRow> {
    structure() {
        return {
            values: Types.Array({
                element: ValueItem
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expect("(");
        coach.skipSpace();

        data.values = coach.parseComma("ValueItem");

        coach.skipSpace();
        coach.expect(")");
    }

    is(coach: GrapeQLCoach) {
        return coach.is("(");
    }

    toString() {
        let out = "(";

        out += this.data.values.map((valueItem) => valueItem.toString()).join(", ");

        out += ")";
        return out;
    }
}

