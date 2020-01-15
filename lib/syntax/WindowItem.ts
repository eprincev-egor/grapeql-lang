"use strict";

import {Syntax} from "lang-coach";
import ObjectName from "./ObjectName";
import WindowDefinition from "./WindowDefinition";
import GrapeQLCoach from "../GrapeQLCoach";

export default class WindowItem extends Syntax<WindowItem> {
    structure() {
        return {
            as: ObjectName,
            body: WindowDefinition
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {

        data.as = coach.parse(ObjectName);
        coach.skipSpace();

        coach.expectWord("as");

        coach.expect("(");
        coach.skipSpace();

        data.body = coach.parse(WindowDefinition);

        coach.skipSpace();
        coach.expect(")");
    }

    is(coach: GrapeQLCoach) {
        if ( !coach.is(ObjectName) ) {
            return false;
        }

        const i = coach.i;

        coach.parse(ObjectName);
        coach.skipSpace();

        const isWindowItem = coach.is(/as\s*\(/i);

        coach.i = i;
        return isWindowItem;
    }

    toString() {
        return `${this.data.as} as (${ this.data.body })`;
    }
}

