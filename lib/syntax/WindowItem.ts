"use strict";

import {Syntax} from "lang-coach";
import ObjectName from "./ObjectName";
import WindowDefinition from "./WindowDefinition";

export default class WindowItem extends Syntax<WindowItem> {
    structure() {
        return {
            as: ObjectName,
            body: WindowDefinition
        };
    }

    parse(coach, data) {

        data.as = coach.parseObjectName();
        coach.skipSpace();

        coach.expectWord("as");

        coach.expect("(");
        coach.skipSpace();

        data.body = coach.parseWindowDefinition();

        coach.skipSpace();
        coach.expect(")");
    }

    is(coach) {
        if ( !coach.isObjectName() ) {
            return false;
        }

        let i = coach.i;

        coach.parseObjectName();
        coach.skipSpace();

        let isWindowItem = coach.is(/as\s*\(/i);

        coach.i = i;
        return isWindowItem;
    }

    toString() {
        return `${this.data.as} as (${ this.data.body })`;
    }
}
