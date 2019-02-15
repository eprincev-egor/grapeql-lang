"use strict";

const {Syntax} = require("lang-coach");

class PgArray extends Syntax {
    static structure() {
        const Expression = PgArray.prototype.Coach.Expression;

        return {
            items: [Expression]
        };
    }

    static parse(coach, data) {
        data.items = [];
        coach.expectWord("array");
        
        coach.expect("[");
        coach.skipSpace();

        if ( !coach.is("]") ) {
            data.items = coach.parseComma("Expression");
        }

        coach.skipSpace();
        coach.expect("]");
    }
    
    static is(coach) {
        return coach.isWord("array");
    }
    
    toString() {
        let out = "array[";
        
        out += this.data.items.map(item => item.toString()).join(", ");

        out += "]";
        return out;
    }
}

module.exports = PgArray;

