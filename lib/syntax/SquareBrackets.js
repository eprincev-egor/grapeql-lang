"use strict";

const {Syntax} = require("lang-coach");

class SquareBrackets extends Syntax {
    static structure() {
        const Expression = SquareBrackets.prototype.Coach.Expression;

        return {
            content: Expression
        };
    }

    static parse(coach, data) {
        coach.expect("[");
        coach.skipSpace();
        
        data.content = coach.parseExpression();

        coach.skipSpace();
        coach.expect("]");
    }
    
    static is(coach) {
        return coach.is("[");
    }
    
    toString() {
        return `[${ this.data.content }]`;
    }
}

module.exports = SquareBrackets;