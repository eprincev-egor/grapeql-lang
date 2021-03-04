import {Syntax} from "lang-coach";
import {GrapeQLCoach, TableLink} from "../GrapeQLCoach";

export class WithoutInsertOn extends Syntax<WithoutInsertOn> {
    structure() {
        return {
            onTable: TableLink
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("without");
        coach.expectWord("insert");
        coach.expectWord("case");
        coach.expectWord("on");

        data.onTable = coach.parse(TableLink);
    }
    
    is(coach: GrapeQLCoach) {
        return coach.is(/without\s+insert/i);
    }
    
    toString() {
        return `without insert case on ${this.row.onTable}`;
    }
}
