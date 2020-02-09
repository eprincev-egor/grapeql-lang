

import {Syntax, Types} from "lang-coach";
import SingleQuotesString from "./SingleQuotesString";
import DollarString from "./DollarString";
import {GrapeQLCoach} from "../GrapeQLCoach";

export default class Interval extends Syntax<Interval> {
    structure() {
        return {
            interval: Types.Or({
                or: [
                    SingleQuotesString, 
                    DollarString
                ]
            })
        };
    }

    is(coach: GrapeQLCoach) {
        return coach.isWord("interval");
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("interval");

        if ( coach.is(SingleQuotesString) ) {
            data.interval = coach.parse(SingleQuotesString);
        }
        else {
            data.interval = coach.parse(DollarString);
        }
    }

    toString() {
        return "interval " + this.row.interval.toString();
    }
}

