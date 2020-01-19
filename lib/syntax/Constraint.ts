
import {Syntax} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import ObjectName from "./ObjectName";

export default class Constraint<Child extends Constraint = any> extends Syntax<Constraint & Child> {
    
    IOptions: {
        column: ObjectName["TInput"]
    };

    structure() {
        return {
            name: ObjectName,
            column: ObjectName
        };
    }

    is(coach: GrapeQLCoach, str: string, options: this["IOptions"] = {column: null}) {
        return coach.isWord("constraint");
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        this.parseName(coach, data);
    }

    parseName(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("constraint");
        
        data.name = coach.parse(ObjectName);
        coach.skipSpace();
    }

    toString() {
        return "constraint " + this.data.name.toString();
    }
}
