"use strict";

const {Syntax} = require("lang-coach");

class SystemVariable extends Syntax {
    static structure() {
        return {
            name: "string"
        };
    }

    static parse(coach, data) {
        coach.expect("$");

        data.name = "";
        for (; coach.i < coach.n; coach.i++) {
            let symbol = coach.str[ coach.i ];

            if ( !/[\wА-ЯЁа-яё\d_$]/i.test(symbol) ) {
                break;
            }

            data.name += symbol;
        }

        if ( /\$/.test(data.name) ) {
            coach.throwError(`forbidden symbol $ in variable name: ${data.name}`);
        }

        if ( !data.name ) {
            coach.throwError("expect variable name");
        }
    }

    static is(coach) {
        return coach.is("$");
    }

    toString() {
        return "$" + this.data.name;
    }

    toLowerCase() {
        return this.data.name.toLowerCase();
    }
}

module.exports = SystemVariable;
