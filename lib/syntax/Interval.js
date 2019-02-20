"use strict";

const {Syntax} = require("lang-coach");
const SingleQuotesString = require("./SingleQuotesString");
const DollarString = require("./DollarString");

class Interval extends Syntax {
    static structure() {
        return {
            interval: {
                type: Syntax,
                validate: value =>
                    value instanceof SingleQuotesString ||
                    value instanceof DollarString
            }
        };
    }

    static is(coach) {
        return coach.isWord("interval");
    }

    static parse(coach, data) {
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

module.exports = Interval;