
import { Types } from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import Constraint from "./Constraint";
import ObjectName from "./ObjectName";

export default class PrimaryKeyConstraint extends Constraint<PrimaryKeyConstraint> {
    
    structure() {
        return {
            ...super.structure(),
            column: ObjectName,
            
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

    parse(
        coach: GrapeQLCoach, 
        data: this["TInputData"], 
        options: this["IOptions"] = {column: null}
    ) {
        if ( !options.column ) {
            super.parseName(coach, data);
        }

        coach.expectWord("primary");
        coach.expectWord("key");

        if ( !options.column ) {
            coach.expect("(");
            coach.skipSpace();

            data.primaryKey = coach.parseComma(ObjectName);

            coach.skipSpace();
            coach.expect(")");
        }
        else {
            data.column = options.column;
            data.primaryKey = [options.column];
        }
    }

    toString() {
        let out = "";
        
        const {
            primaryKey,
            column
        } = this.data;

        if ( column ) {
            out = "primary key";
        }
        else {
            out += super.toString();
            out += " primary key (";
            out += primaryKey.map((name) => name.toString()).join(", ");
            out += ")";
        }

        return out;
    }
}
