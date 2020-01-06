"use strict";

import {Syntax} from "lang-coach";

export default class PgArray extends Syntax<PgArray> {
    structure() {
        const Expression = PgArray.prototype.Coach.Expression;

        return {
            array: [Expression]
        };
    }

    parse(coach, data) {
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
    
    is(coach) {
        return coach.isWord("array");
    }
    
    toString() {
        let out = "array[";
        
        out += this.data.array.map(item => item.toString()).join(", ");

        out += "]";
        return out;
    }
}



