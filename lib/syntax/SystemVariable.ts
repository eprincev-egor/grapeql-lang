"use strict";

import {Syntax, Types} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";

export default class SystemVariable extends Syntax<SystemVariable> {
    structure() {
        return {
            name: Types.String
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expect("$");

        data.name = "";
        for (; coach.i < coach.n; coach.i++) {
            const symbol = coach.str[ coach.i ];

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

    is(coach: GrapeQLCoach) {
        return coach.is("$");
    }

    toString() {
        return "$" + this.data.name;
    }

    toLowerCase() {
        return this.data.name.toLowerCase();
    }
}


