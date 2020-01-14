"use strict";

import {Syntax, Types} from "lang-coach";
import SingleQuotesString from "./SingleQuotesString";
import DollarString from "./DollarString";

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

    is(coach) {
        return coach.isWord("interval");
    }

    parse(coach, data) {
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

