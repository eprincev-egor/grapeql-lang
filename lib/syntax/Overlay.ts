import {Syntax} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import allSyntax from "../allSyntax";

export class Overlay extends Syntax<Overlay> {
    structure() {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        return {
            str: Expression,
            placing: Expression,
            from: Expression,
            for: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        coach.expectWord("overlay");
        
        coach.expect("(");
        coach.skipSpace();

        data.str = coach.parse(Expression);
        coach.skipSpace();
        
        coach.expectWord("placing");
        data.placing = coach.parse(Expression);
        coach.skipSpace();

        coach.expectWord("from");
        data.from = coach.parse(Expression);

        if ( coach.isWord("for") ) {
            coach.expectWord("for");
            
            data.for = coach.parse(Expression);
        }

        coach.expect(")");
    }
    
    is(coach: GrapeQLCoach) {
        return coach.is(/^overlay\s*\(/i);
    }
    
    toString() {
        let out = "overlay(";

        out += this.row.str!.toString();

        out += " placing ";
        out += this.row.placing!.toString();

        out += " from ";
        out += this.row.from!.toString();

        if ( this.row.for ) {
            out += " for ";
            out += this.row.for.toString();
        }

        out += ")";
        return out;
    }
}
