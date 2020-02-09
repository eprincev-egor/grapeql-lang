

import {Syntax, Types} from "lang-coach";
import Expression from "./Expression";
import {GrapeQLCoach} from "../GrapeQLCoach";

/*
    { expression | ( expression [, ...] ) }
 */
export default class GroupByElementContent extends Syntax<GroupByElementContent> {
    structure() {
        return {
            single: Types.Boolean,
            expressions: Types.Array({
                element: Expression
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.is("(") ) {
            data.single = false;

            coach.expect("(");
            coach.skipSpace();
            
            data.expressions = coach.parseComma(Expression);
            
            coach.skipSpace();
            coach.expect(")");
        } else {
            data.single = true;
            data.expressions = [
                coach.parse(Expression)
            ];
        }
    }
    
    is(coach: GrapeQLCoach) {
        return coach.is(Expression);
    }
    
    toString() {
        if ( this.row.single ) {
            const expression = this.row.expressions[0];
            return expression.toString();
        } 
        else {
            let out = "(";

            out += this.row.expressions.map((expression) => 
                expression.toString()
            ).join(", ");
            
            out += ")";
            return out;
        }
    }
}

