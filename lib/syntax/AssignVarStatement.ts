
import {Syntax} from "lang-coach";
import {GrapeQLCoach, Expression, ObjectLink} from "../GrapeQLCoach";

// variable = expression
// new.column = expression

export class AssignVarStatement extends Syntax<AssignVarStatement> {
    structure() {
        return {
            variable: ObjectLink,
            assign: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        data.variable = coach.parse(ObjectLink);
        
        coach.skipSpace();
        coach.expect("=");
        coach.skipSpace();

        data.assign = coach.parse(Expression);
    }
    
    is(coach: GrapeQLCoach) {
        if ( !coach.is(ObjectLink) ) {
            return false;
        }

        const i = coach.i;
        
        coach.parse(ObjectLink);
        coach.skipSpace();

        const isAssign = coach.is("=");
        coach.i = i;

        return isAssign;
    }
    
    toString() {
        const row = this.row;
        const sql = `${row.variable} = ${row.assign}`;
        return sql;
    }
}
