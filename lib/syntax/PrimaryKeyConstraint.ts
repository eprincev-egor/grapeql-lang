
import { Types } from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {Constraint} from "./Constraint";
import {ObjectName} from "./ObjectName";

export class PrimaryKeyConstraint extends Constraint<PrimaryKeyConstraint> {
    
    structure() {
        return {
            ...super.structure(),
            
            primaryKey: Types.Array({
                element: ObjectName
            })
        };
    }

    is(coach: GrapeQLCoach, str: string, options: this["IOptions"] = {column: null}) {
        if ( options.column ) {
            return coach.isWord("primary");
        }
        else {
            const i = coach.i;
            try {
                super.parseName(coach, {});
            } catch (err) {
                return false;
            }
            
            const isPrimaryKey = coach.isWord("primary");
            coach.i = i;

            return isPrimaryKey;
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
        } = this.row;

        if ( column ) {
            out = "primary key";
        }
        else {
            out += super.toString();
            out += " primary key (";
            out += primaryKey!.map((name) => name.toString()).join(", ");
            out += ")";
        }

        return out;
    }
}
