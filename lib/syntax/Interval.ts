"use strict";

import {Syntax, Types} from "lang-coach";
import SingleQuotesString from "./SingleQuotesString";
import DollarString from "./DollarString";
import GrapeQLCoach from "../GrapeQLCoach";

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

        if ( coach.isSingleQuotesString() ) {
            data.interval = coach.parseSingleQuotesString();
        }
        else {
            data.interval = coach.parseDollarString();
        }
    }

    toString() {
        return "interval " + this.data.interval.toString();
    }
}

