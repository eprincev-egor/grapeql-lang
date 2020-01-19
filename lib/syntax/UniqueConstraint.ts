
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

    is(coach: GrapeQLCoach, str: string, options: this["IOptions"] = {column: null}) {
        if ( options.column ) {
            return coach.isWord("unique");
        }
        else {
            const i = coach.i;
            try {
                super.parseName(coach, {});
            } catch (err) {
                return false;
            }
            
            const isUnique = coach.isWord("unique");
            coach.i = i;

            return isUnique;
        }
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
