"use strict";

const {Syntax} = require("lang-coach");
const Expression = require("./Expression");

/*
    { expression | ( expression [, ...] ) }
 */
class GroupByElementContent extends Syntax {
    static structure() {
        return {
            single: "boolean",
            expressions: [Expression]
        };
    }

    static parse(coach, data) {
        if ( coach.is("(") ) {
            data.single = false;

            coach.expect("(");
            coach.skipSpace();
            
            data.expressions = coach.parseComma("Expression");
            
            coach.skipSpace();
            coach.expect(")");
        } else {
            data.single = true;
            data.expressions = [
                coach.parseExpression()
            ];
        }
    }
    
    static is(coach) {
        return coach.isExpression();
    }
    
    toString() {
        if ( this.data.single ) {
            let expression = this.data.expressions[0];
            return expression.toString();
        } 
        else {
            let out = "(";

            out += this.data.expressions.map(expression => 
                expression.toString()
            ).join(", ");
            
            out += ")";
            return out;
        }
    }
}

module.exports = GroupByElementContent;