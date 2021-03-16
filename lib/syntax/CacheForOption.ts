import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {WithoutInsertOn} from "./WithoutInsertOn";
import {WithoutTriggersOn} from "./WithoutTriggersOn";
import {CacheIndex} from "./CacheIndex";

export class CacheForOption extends Syntax<CacheForOption> {
    structure() {
        return {
            element: Types.Or({
                or: [
                    WithoutTriggersOn,
                    WithoutInsertOn,
                    CacheIndex
                ]
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.is(CacheIndex) ) {
            data.element = coach.parse(CacheIndex);
        }
        else if ( coach.is(WithoutInsertOn) ) {
            data.element = coach.parse(WithoutInsertOn);
        }
        else if ( coach.is(WithoutTriggersOn) ) {
            data.element = coach.parse(WithoutTriggersOn);
        }
    }
    
    is(coach: GrapeQLCoach) {
        return (
            coach.is(CacheIndex) ||
            coach.is(WithoutInsertOn) ||
            coach.is(WithoutTriggersOn)
        );
    }
    
    toString() {
        return this.row.element!.toString();
    }
}
