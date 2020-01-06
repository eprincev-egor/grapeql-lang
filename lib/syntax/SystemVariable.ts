"use strict";

import {Syntax} from "lang-coach";

export default class SystemVariable extends Syntax<SystemVariable> {
    structure() {
        return {
            name: "string"
        };
    }

    parse(coach, data) {
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

    is(coach) {
        return coach.is("$");
    }

    toString() {
        return "$" + this.data.name;
    }

    toLowerCase() {
        return this.data.name.toLowerCase();
    }
}


