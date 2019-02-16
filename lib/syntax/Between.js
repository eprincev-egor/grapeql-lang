"use strict";

const {Syntax} = require("lang-coach");

// true or false

class Between extends Syntax {
    static structure() {
        const Expression = Between.prototype.Coach.Expression;

        return {
            symmetric: "boolean",
            between: Expression,
            and: Expression
        };
    }

    static parse(coach, data) {
        coach.expectWord("between");
        
        if ( coach.isWord("symmetric") ) {
            coach.expectWord("symmetric");
            data.symmetric = true;
        }

        data.between = coach.parseExpression({
            excludeOperators: ["and"]
        });
        coach.expectWord("and");
        data.and = coach.parseExpression({
            excludeOperators: ["and", "or", ">", "<", ">=", "<=", "="]
        });
    }
    
    static is(coach) {
        return coach.isWord("between");
    }
    
    toString() {
        let out = "between ";

        if ( this.data.symmetric ) {
            out += "symmetric ";
        }

        out += this.data.between;
        out += " and ";
        out += this.data.and;

        return out;
    }
}

module.exports = Between;
