"use strict";

import {Syntax, Types} from "lang-coach";
import ISyntaxes from "./ISyntaxes";

export default class In extends Syntax<In> {
    structure() {
        const Expression = this.syntax.Expression as any as ISyntaxes["Expression"];
        const Select = this.syntax.Select as any as ISyntaxes["Select"];

        return {
            inSelect: Select,
            inItems: Types.Array({
                element: Expression
            })
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

