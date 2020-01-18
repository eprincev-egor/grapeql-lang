
import { Types } from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import Constraint from "./Constraint";
import ObjectName from "./ObjectName";

export default class UniqueConstraint extends Constraint<UniqueConstraint> {
    
    structure() {
        return {
            ...super.structure(),
            
            unique: Types.Array({
                element: ObjectName
            })
        };
    }

    is(coach: GrapeQLCoach) {
        return (
            coach.isWord("primary") ||
            super.is(coach)
        );
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        super.parseName(coach, data);

        coach.expectWord("unique"); 
        coach.expect("(");
        coach.skipSpace();

        data.unique = coach.parseComma(ObjectName);

        coach.skipSpace();
        coach.expect(")");
    }

    toString() {
        let out = super.toString();
        const {unique} = this.data;

        out += " primary key (";
        out += unique.map((name) => name.toString()).join(", ");
        out += ")";

        return out;
    }
}
