"use strict";

import {Syntax} from "lang-coach";
import ISyntaxes from "./ISyntaxes";
import GrapeQLCoach from "../GrapeQLCoach";

export default class CaseWhenElement extends Syntax<CaseWhenElement> {
    structure() {
        const Expression = this.syntax.Expression as any as ISyntaxes["Expression"];

        return {
            when: Expression,
            then: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("when");
        
        data.when = coach.parseExpression();
        
        coach.expectWord("then");
        
        data.then = coach.parseExpression();
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("when");
    }
    
    toString() {
        return `when ${ this.data.when } then ${ this.data.then }`;
    }
}
