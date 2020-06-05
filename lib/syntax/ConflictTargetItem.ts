
import {Syntax} from "lang-coach";
import {GrapeQLCoach, Expression, ObjectName} from "../GrapeQLCoach";

export class ConflictTargetItem extends Syntax<ConflictTargetItem> {
    structure() {
        return {
            expression: Expression,
            column: ObjectName
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.is("(") ) {
            coach.expect("(");
            coach.skipSpace();

            data.expression = coach.parse(Expression);

            coach.skipSpace();
            coach.expect(")");
        } else {
            data.column = coach.parse(ObjectName);
        }
    }

    is(coach) {
        return coach.is(Expression);
    }

    toString() {
        if ( this.row.expression ) {
            return "(" + this.row.expression.toString() + ")";
        } else {
            return this.row.column.toString();
        }
    }
}

