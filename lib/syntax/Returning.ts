import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach, Column} from "../GrapeQLCoach";


export class Returning extends Syntax<Returning> {
    structure() {
        return {
            returningColumns: Types.Array({
                element: Column
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("returning");
        data.returningColumns = coach.parseComma(Column);
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("returning");
    }
    
    toString() {
        return "returning " + this.row.returningColumns.map((column) => 
            column.toString()
        ).join(", ");
    }
}
