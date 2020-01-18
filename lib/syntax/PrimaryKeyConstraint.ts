
import { Types } from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import Constraint from "./Constraint";
import ObjectName from "./ObjectName";

export default class PrimaryKeyConstraint extends Constraint<PrimaryKeyConstraint> {
    
    structure() {
        return {
            ...super.structure(),
            
            primaryKey: Types.Array({
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

        coach.expectWord("primary");
        coach.expectWord("key");
        coach.expect("(");
        coach.skipSpace();

        data.primaryKey = coach.parseComma(ObjectName);

        coach.skipSpace();
        coach.expect(")");
    }

    toString() {
        let out = super.toString();
        const {primaryKey} = this.data;

        out += " primary key (";
        out += primaryKey.map((name) => name.toString()).join(", ");
        out += ")";

        return out;
    }
}
