
import { Types } from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import Constraint from "./Constraint";
import ObjectName from "./ObjectName";

export default class UniqueConstraint extends Constraint<UniqueConstraint> {
    
    structure() {
        return {
            ...super.structure(),
            column: ObjectName,

            unique: Types.Array({
                element: ObjectName
            })
        };
    }

    is(coach: GrapeQLCoach) {
        return (
            coach.isWord("unique") ||
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

        coach.expectWord("unique"); 

        if ( options.column ) {
            data.column = options.column;
            data.unique = [options.column];
        }
        else {
            coach.expect("(");
            coach.skipSpace();
    
            data.unique = coach.parseComma(ObjectName);
    
            coach.skipSpace();
            coach.expect(")");
        }
    }

    toString() {
        let out = "";
        const {
            unique, 
            column
        } = this.data;

        if ( column ) {
            out += "unique";  
        }
        else {
            out = super.toString();
            out += " unique (";
            out += unique.map((name) => name.toString()).join(", ");
            out += ")";  
        }

        return out;
    }
}
