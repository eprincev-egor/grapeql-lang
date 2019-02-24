"use strict";

const {Syntax} = require("lang-coach");

class In extends Syntax {
    static structure() {
        const Expression = In.prototype.Coach.Expression;
        const Select = In.prototype.Coach.Select;

        return {
            inSelect: Select,
            inItems: [Expression]
        };
    }

    static parse(coach, data) {
        coach.expectWord("in");
        
        coach.expect("(");
        coach.skipSpace();
        
        if ( coach.isSelect() ) {
            data.inSelect = coach.parseSelect();
        } else {
            data.inItems = coach.parseComma("Expression");
        }
        
        
        coach.skipSpace();
        coach.expect(")");
    }
    
    static is(coach) {
        return coach.isWord("in");
    }
    
    toString() {
        if ( this.data.inItems ) {
            return `in (${ this.data.inItems.join(", ") })`;
        } else {
            return `in (${ this.data.inSelect })`;
        }
    }
}

module.exports = In;