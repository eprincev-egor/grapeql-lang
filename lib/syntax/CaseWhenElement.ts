"use strict";

import {Syntax} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";

export default class CaseWhenElement extends Syntax<CaseWhenElement> {
    structure() {
        const Expression = this.syntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        return {
            when: Expression,
            then: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = this.syntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        coach.expectWord("when");
        
        data.when = coach.parse(Expression);
        
        coach.expectWord("then");
        
        data.then = coach.parse(Expression);
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("when");
    }
    
    toString() {
        return `when ${ this.data.when } then ${ this.data.then }`;
    }
}
