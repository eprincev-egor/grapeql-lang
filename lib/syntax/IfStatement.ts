
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import allSyntax from "../allSyntax";
import {Expression} from "./Expression";
import {ElseIfStatement} from "./ElseIfStatement";

// if ... then
// ...
// else
// ...
// end if;

export class IfStatement extends Syntax<IfStatement> {
    structure() {
        const Body = allSyntax.BodyStatement as GrapeQLCoach["syntax"]["BodyStatement"];

        return {
            if: Expression,
            then: Body,
            elsif: Types.Array({
                element: ElseIfStatement
            }),
            else: Body
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Body = allSyntax.BodyStatement as GrapeQLCoach["syntax"]["BodyStatement"];

        coach.expectWord("if");
        data.if = coach.parse(Expression);

        coach.expectWord("then");
        data.then = coach.parse(Body);
        coach.skipSpace();

        if ( coach.is(ElseIfStatement) ) {
            data.elsif = coach.parseChain(ElseIfStatement);
            coach.skipSpace();
        }

        if ( coach.isWord("else") ) {
            coach.expectWord("else");

            data.else = coach.parse(Body);
            coach.skipSpace();
        }

        coach.expectWord("end");
        coach.expectWord("if");
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("if");
    }
    
    toString() {
        const row = this.row;
        let sql = "";

        sql += `if ${row.if} then\n`;
        sql += `${row.then}\n`;

        if ( row.elsif ) {
            const elsif = row.elsif.map((elem) => 
                elem.toString()
            );
            sql += elsif.join("\n") + "\n";
        }
        
        if ( row.else ) {
            sql += `else ${row.else}\n`;
        }

        sql += "end if";
        
        return sql;
    }
}
