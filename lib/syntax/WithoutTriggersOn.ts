
import {Syntax} from "lang-coach";
import {GrapeQLCoach, TableLink} from "../GrapeQLCoach";

export class WithoutTriggersOn extends Syntax<WithoutTriggersOn> {
    structure() {
        return {
            onTable: TableLink
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("without");
        coach.expect(/trigger(s?)/);
        coach.expectWord("on");

        data.onTable = coach.parse(TableLink);
    }
    
    is(coach: GrapeQLCoach) {
        return coach.is(/without\s+trigger(s?)/i);
    }
    
    toString() {
        return `without triggers on ${this.row.onTable}`;
    }
}
