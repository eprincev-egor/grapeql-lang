

import {Syntax} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import allSyntax from "../allSyntax";

export default class SquareBrackets extends Syntax<SquareBrackets> {
    structure() {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        return {
            content: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        
        coach.expect("[");
        coach.skipSpace();
        
        data.content = coach.parse(Expression);

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

