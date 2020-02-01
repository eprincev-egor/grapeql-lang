

import {Syntax} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import allSyntax from "../allSyntax";

export default class Substring extends Syntax<Substring> {
    structure() {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        return {
            str: Expression,
            from: Expression,
            for: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        coach.expectWord("substring");
        
        coach.expect("(");
        coach.skipSpace();

        data.str = coach.parse(Expression);
        
        if ( coach.isWord("from") ) {
            coach.expectWord("from");
            
            data.from = coach.parse(Expression);
        }

        if ( coach.isWord("for") ) {
            coach.expectWord("for");
            
            data.for = coach.parse(Expression);
        }

        coach.expect(")");
    }
    
    is(coach: GrapeQLCoach) {
        return coach.is(/^substring\s*\(/i);
    }
    
    toString() {
        let out = "substring(";

        out += this.data.str.toString();

        if ( this.data.from ) {
            out += " from ";
            out += this.data.from.toString();
        }

        if ( this.data.for ) {
            out += " for ";
            out += this.data.for.toString();
        }

        out += ")";
        return out;
    }
}

