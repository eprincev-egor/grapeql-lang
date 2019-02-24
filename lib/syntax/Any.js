"use strict";

const {Syntax} = require("lang-coach");

class Any extends Syntax {
    static structure() {
        const Expression = Any.prototype.Coach.Expression;
        const Select = Any.prototype.Coach.Select;

        return {
            type: {
                type: "string",
                enum: ["any", "all", "some"]
            },
            array: Expression,
            select: Select
        };
    }

    static  parse(coach, data) {
        if ( coach.isWord("any") ) {
            coach.expectWord("any");
            data.type = "any";
        }
        else if ( coach.isWord("all") ) {
            coach.expectWord("all");
            data.type = "all";
        }
        else {
            coach.expectWord("some");
            data.type = "some";
        }

        coach.expect("(");
        coach.skipSpace();
        
        if ( coach.isSelect() ) {
            data.select = coach.parseSelect();
        } else {
            data.array = coach.parseExpression();
        }
        
        coach.skipSpace();
        coach.expect(")");
    }
    
    static is(coach) {
        let isKeyword = (
            coach.isWord("any") ||
            coach.isWord("all") ||
            coach.isWord("some")
        );
            
        if ( !isKeyword ) {
            return false;
        }

        let i = coach.i;
        coach.readWord();
        coach.skipSpace();

        let isBracket = coach.is("(");
        coach.i = i;
        
        return isKeyword && isBracket;
    }
    
    toString() {
        if ( this.data.select ) {
            return `${this.data.type} (${ this.data.select })`;
        } else {
            return `${this.data.type} (${ this.data.array })`;
        }
    }
}

module.exports = Any;