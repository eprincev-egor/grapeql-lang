
import {Syntax} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import allSyntax from "../allSyntax";

export class CaseWhenElement extends Syntax<CaseWhenElement> {
    structure() {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        return {
            when: Expression,
            then: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        coach.expectWord("when");
        
        data.when = coach.parse(Expression);
        
        coach.expectWord("then");
        
        data.then = coach.parse(Expression);
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("when");
    }
    
    toString() {
        return `when ${ this.row.when } then ${ this.row.then }`;
    }
}
