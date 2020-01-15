"use strict";

import {Syntax, Types} from "lang-coach";
import ISyntaxes from "./ISyntaxes";
import GrapeQLCoach from "../GrapeQLCoach";

export default class Between extends Syntax<Between> {
    structure() {
        const Expression = this.syntax.Expression as any as ISyntaxes["Expression"];

        return {
            symmetric: Types.Boolean,
            between: Expression,
            and: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("between");
        
        if ( coach.isWord("symmetric") ) {
            coach.expectWord("symmetric");
            data.symmetric = true;
        }

        data.between = coach.parseExpression({
            excludeOperators: ["and"]
        });
        coach.expectWord("and");
        data.and = coach.parseExpression({
            excludeOperators: ["and", "or", ">", "<", ">=", "<=", "="]
        });
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("between");
    }
    
    toString() {
        let out = "between ";

        if ( this.data.symmetric ) {
            out += "symmetric ";
        }

        out += this.data.between;
        out += " and ";
        out += this.data.and;

        return out;
    }
}

