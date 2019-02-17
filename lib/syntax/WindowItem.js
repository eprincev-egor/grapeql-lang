"use strict";

const {Syntax} = require("lang-coach");
const ObjectName = require("./ObjectName");
const WindowDefinition = require("./WindowDefinition");

class WindowItem extends Syntax {
    static structure() {
        return {
            as: ObjectName,
            body: WindowDefinition
        };
    }

    static parse(coach, data) {

        data.as = coach.parseObjectName();
        coach.skipSpace();

        coach.expectWord("as");

        coach.expect("(");
        coach.skipSpace();

        data.body = coach.parseWindowDefinition();

        coach.skipSpace();
        coach.expect(")");
    }

    static is(coach) {
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

module.exports = WindowItem;