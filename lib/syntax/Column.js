"use strict";

const {Syntax} = require("lang-coach");
const Expression = require("./Expression");
const ObjectName = require("./ObjectName");

class Column extends Syntax {
    static structure() {
        return {
            expression: Expression,
            as: ObjectName
        };
    }

    static parse(coach, data) {
        data.expression = coach.parseExpression({ 
            availableStar: true 
        });

        if ( coach.isWord("as") ) {
            coach.expectWord("as");

            data.as = coach.parseObjectName();
        }
    }

    static is(coach) {
        // if ( coach.isWord() ) {
        //     let i = coach.i;
        //     let word = coach.readWord();
        //     coach.i = i;

        //     return !this.Coach.Select.keywords.includes(word);
        // }

        return coach.isExpression({ availableStar: true });
    }

    toString() {
        let out = this.data.expression.toString();

        if ( this.data.as ) {
            out += " as " + this.data.as.toString();
        }

        return out;
    }
}

module.exports = Column;