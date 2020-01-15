"use strict";

import {Syntax} from "lang-coach";
import ISyntaxes from "./ISyntaxes";
import GrapeQLCoach from "../GrapeQLCoach";

export default class SquareBrackets extends Syntax<SquareBrackets> {
    structure() {
        const Expression = this.syntax.Expression as any as ISyntaxes["Expression"];

        return {
            content: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expect("[");
        coach.skipSpace();
        
        data.content = coach.parseExpression();

        coach.skipSpace();
        coach.expect("]");
    }
    
    is(coach: GrapeQLCoach) {
        return coach.is("[");
    }
    
    toString() {
        return `[${ this.data.content }]`;
    }
}

