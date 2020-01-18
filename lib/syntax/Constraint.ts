
import {Syntax} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import ObjectName from "./ObjectName";

export default class Constraint<Child extends Constraint = any> extends Syntax<Constraint & Child> {
    
    structure() {
        return {
            name: ObjectName
        };
    }

    is(coach: GrapeQLCoach) {
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