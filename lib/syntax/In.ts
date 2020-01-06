"use strict";

import {Syntax} from "lang-coach";

export default class In extends Syntax<In> {
    structure() {
        const Expression = In.prototype.Coach.Expression;
        const Select = In.prototype.Coach.Select;

        return {
            inSelect: Select,
            inItems: [Expression]
        };
    }

    parse(coach, data) {
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
    
    is(coach) {
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

