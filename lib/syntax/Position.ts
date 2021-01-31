import {Syntax} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import allSyntax from "../allSyntax";

export class Position extends Syntax<Position> {
    structure() {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        return {
            substring: Expression,
            in: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        coach.expectWord("position");
        
        coach.expect("(");
        coach.skipSpace();

        data.substring = coach.parse(Expression, {
            excludeOperators: ["in"]
        });
        coach.skipSpace();
        
        coach.expectWord("in");
        data.in = coach.parse(Expression);
        
        coach.skipSpace();
        coach.expect(")");
    }
    
    is(coach: GrapeQLCoach) {
        return coach.is(/^position\s*\(/i);
    }
    
    toString() {
        let out = "position(";

        out += this.row.substring!.toString();
        out += " in ";
        out += this.row.in!.toString();

        out += ")";
        return out;
    }
}
