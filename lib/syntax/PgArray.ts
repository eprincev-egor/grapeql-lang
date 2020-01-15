"use strict";

import {Syntax, Types} from "lang-coach";
import ISyntaxes from "./ISyntaxes";
import GrapeQLCoach from "../GrapeQLCoach";

export default class PgArray extends Syntax<PgArray> {
    structure() {
        const Expression = this.syntax.Expression as any as ISyntaxes["Expression"];

        return {
            array: Types.Array({
                element: Expression
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        data.array = [];
        coach.expectWord("array");
        
        coach.expect("[");
        coach.skipSpace();

        if ( !coach.is("]") ) {
            data.array = coach.parseComma("Expression");
        }

        coach.skipSpace();
        coach.expect("]");
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("array");
    }
    
    toString() {
        let out = "array[";
        
        out += this.data.array.map((item) => item.toString()).join(", ");

        out += "]";
        return out;
    }
}



