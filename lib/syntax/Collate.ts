
import {Syntax} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {ObjectName} from "./ObjectName";

export class Collate extends Syntax<Collate> {
    structure() {
        return {
            collate: ObjectName
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("collate");
        data.collate = coach.parse(ObjectName);
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("collate");
    }
    
    toString() {
        return `collate ${ this.row.collate }`;
    }
}
