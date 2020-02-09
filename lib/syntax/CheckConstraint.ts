
import {GrapeQLCoach} from "../GrapeQLCoach";
import Constraint from "./Constraint";
import Expression from "./Expression";

export default class CheckConstraint extends Constraint<CheckConstraint> {
    
    structure() {
        return {
            ...super.structure(),
            
            check: Expression
        };
    }

    is(coach: GrapeQLCoach, str: string, options: this["IOptions"] = {column: null}) {
        if ( options.column ) {
            return coach.isWord("check");
        }
        else {
            const i = coach.i;
            try {
                super.parseName(coach, {});
            } catch (err) {
                return false;
            }
            
            const isCheck = coach.isWord("check");
            coach.i = i;

            return isCheck;
        }
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
        } = this.row;
        let out = "";

        if ( !column ) {
            out += super.toString();
            out += " ";
        }
        
        out += `check( ${ check.toString() } )`;

        return out;
    }
}
