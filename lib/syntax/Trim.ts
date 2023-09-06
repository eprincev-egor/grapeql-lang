
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import allSyntax from "../allSyntax";

export class Trim extends Syntax<Trim> {
    structure() {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        return {
            trim: Types.String({
                enum: ["both", "leading", "trailing"]
            }),
            from: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        coach.expectWord("trim");

        coach.expect("(");
        coach.skipSpace();

        let type: string = "both";
        if ( coach.isWord("both") ) {
            coach.expectWord("both");
        }
        else if ( coach.isWord("leading") ) {
            coach.expectWord("leading");
            type = "leading";
        }
        else if ( coach.isWord("trailing") ) {
            coach.expectWord("trailing");
            type = "trailing";
        }
        data.trim = type;
        coach.skipSpace();

        if ( coach.isWord("from") ) {
            coach.expectWord("from");
            coach.skipSpace();
        }

        data.from = coach.parse(Expression);

        coach.skipSpace();
        coach.expect(")");
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("trim");
    }
    
    toString() {
        return `trim(${this.row.trim} from ${ this.row.from })`;
    }
}


