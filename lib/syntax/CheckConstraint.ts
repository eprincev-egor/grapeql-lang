
import GrapeQLCoach from "../GrapeQLCoach";
import Constraint from "./Constraint";
import Expression from "./Expression";
import ObjectName from "./ObjectName";

export default class CheckConstraint extends Constraint<CheckConstraint> {
    
    structure() {
        return {
            ...super.structure(),
            
            column: ObjectName,
            check: Expression
        };
    }

    is(coach: GrapeQLCoach) {
        return (
            coach.isWord("check") ||
            super.is(coach)
        );
    }

    parse(
        coach: GrapeQLCoach, 
        data: this["TInputData"], 
        options: this["IOptions"] = {column: null}
    ) {
        if ( options.column ) {
            data.column = options.column;
        }
        else {
            super.parseName(coach, data);
        }

        coach.expectWord("check");
        coach.expect("(");
        coach.skipSpace();

        data.check = coach.parse(Expression);

        coach.skipSpace();
        coach.expect(")");
    }

    toString() {
        const {
            check, 
            column
        } = this.data;
        let out = "";

        if ( !column ) {
            out += super.toString();
            out += " ";
        }
        
        out += `check( ${ check.toString() } )`;

        return out;
    }
}
