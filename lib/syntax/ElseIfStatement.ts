
import {Syntax} from "lang-coach";
import {GrapeQLCoach, Expression} from "../GrapeQLCoach";
import allSyntax from "../allSyntax";

// elsif ...
// then ...

export class ElseIfStatement extends Syntax<ElseIfStatement> {
    structure() {
        const Body = allSyntax.BodyStatement as GrapeQLCoach["syntax"]["BodyStatement"];

        return {
            elsif: Expression,
            then: Body
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Body = allSyntax.BodyStatement as GrapeQLCoach["syntax"]["BodyStatement"];

        coach.expectWord("elsif");
        data.elsif = coach.parse(Expression);

        coach.expectWord("then");
        data.then = coach.parse(Body);
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("elsif");
    }
    
    toString() {
        const row = this.row;
        let sql = "";

        sql += `elsif ${row.elsif} then`;
        sql += "\n";
        sql += `${row.then}`;
        sql += "\n";
        
        return sql;
    }
}
