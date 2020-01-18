
import GrapeQLCoach from "../GrapeQLCoach";
import Constraint from "./Constraint";
import Expression from "./Expression";

export default class CheckConstraint extends Constraint<CheckConstraint> {
    
    structure() {
        return {
            ...super.structure(),
            
            check: Expression
        };
    }

    is(coach: GrapeQLCoach) {
        return (
            coach.isWord("check") ||
            super.is(coach)
        );
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        super.parseName(coach, data);

        coach.expectWord("check");
        coach.expect("(");
        coach.skipSpace();

        data.check = coach.parse(Expression);

        coach.skipSpace();
        coach.expect(")");
    }

    toString() {
        const {check} = this.data;
        let out = super.toString();
        
        out += ` check( ${ check.toString() } )`;

        return out;
    }
}
