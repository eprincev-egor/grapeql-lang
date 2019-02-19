"use strict";

const {Syntax} = require("lang-coach");
const Expression = require("./Expression");

class ValueItem extends Syntax {
    static structure() {
        return {
            default: "boolean",
            expression: Expression
        };
    }

    static parse(coach, data) {
        if ( coach.isWord("default") ) {
            coach.expectWord("default");
            data.default = true;
        } else {
            data.expression = coach.parseExpression();
        }
    }

    static is(coach) {
        return (
            coach.isWord("default") || 
            coach.isExpression()
        );
    }

    toString() {
        if ( this.data.default ) {
            return "default";
        } else {
            return this.data.expression.toString();
        }
    }
}

module.exports = ValueItem;