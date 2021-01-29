
import {Syntax} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {Expression} from "./Expression";

// return expression

export class ReturnStatement extends Syntax<ReturnStatement> {
    structure() {
        return {
            return: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("return");
        data.return = coach.parse(Expression);
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("return");
    }
    
    toString() {
        const sql = "return " + this.row.return!.toString();
        return sql;
    }
}
