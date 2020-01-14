"use strict";

import {Syntax} from "lang-coach";
import ISyntaxes from "./ISyntaxes";

export default class SquareBrackets extends Syntax<SquareBrackets> {
    structure() {
        const Expression = this.syntax.Expression as any as ISyntaxes["Expression"];

        return {
            content: Expression
        };
    }

    parse(coach, data) {
        coach.expect("[");
        coach.skipSpace();
        
        data.content = coach.parseExpression();

        coach.skipSpace();
        coach.expect("]");
    }
    
    is(coach) {
        return coach.is("[");
    }
    
    toString() {
        return `[${ this.data.content }]`;
    }
}

