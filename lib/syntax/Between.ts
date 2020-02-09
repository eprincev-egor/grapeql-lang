

import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import allSyntax from "../allSyntax";

export default class Between extends Syntax<Between> {
    structure() {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        return {
            symmetric: Types.Boolean,
            between: Expression,
            and: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        
        coach.expectWord("between");
        
        if ( coach.isWord("symmetric") ) {
            coach.expectWord("symmetric");
            data.symmetric = true;
        }

        data.between = coach.parse(Expression, {
            excludeOperators: ["and"]
        });
        coach.expectWord("and");
        data.and = coach.parse(Expression, {
            excludeOperators: ["and", "or", ">", "<", ">=", "<=", "="]
        });
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("between");
    }
    
    toString() {
        let out = "between ";

        if ( this.row.symmetric ) {
            out += "symmetric ";
        }

        out += this.row.between;
        out += " and ";
        out += this.row.and;

        return out;
    }
}

