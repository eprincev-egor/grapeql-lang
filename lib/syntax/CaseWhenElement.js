"use strict";

const {Syntax} = require("lang-coach");

class CaseWhenElement extends Syntax {
    static structure() {
        const Expression = CaseWhenElement.prototype.Coach.Expression;

        return {
            when: Expression,
            then: Expression
        };
    }

    static parse(coach, data) {
        coach.expectWord("when");
        
        data.when = coach.parseExpression();
        
        coach.expectWord("then");
        
        data.then = coach.parseExpression();
    }
    
    static is(coach) {
        return coach.isWord("when");
    }
    
    toString() {
        return `when ${ this.data.when } then ${ this.data.then }`;
    }
}

module.exports = CaseWhenElement;