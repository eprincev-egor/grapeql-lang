// https://postgrespro.ru/docs/postgresql/9.6/functions-datetime
// https://database.guide/how-make_interval-works-in-postgresql/
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {MakeIntervalArg} from "./MakeIntervalArg";

export class MakeInterval extends Syntax<MakeInterval> {
    structure() {
        return {
            intervalArgs: Types.Array({
                element: MakeIntervalArg
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        
        coach.expectWord("make_interval");
        coach.expect("(");
        coach.skipSpace();

        data.intervalArgs = coach.parseComma(MakeIntervalArg);
        
        coach.skipSpace();
        coach.expect(")");
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("make_interval");
    }
    
    toString() {
        const {intervalArgs = []} = this.row;
        return `make_interval( ${intervalArgs.join(", ")})`;
    }
}

