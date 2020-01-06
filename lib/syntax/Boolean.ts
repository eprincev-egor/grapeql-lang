"use strict";

import {Syntax, Types} from "lang-coach";

// true or false

// tslint:disable-next-line: ban-types
export default class Boolean extends Syntax<Boolean> {
    structure() {
        return {
            boolean: Types.Boolean({
                required: true
            })
        };
    }

    parse(coach, data) {

        if ( coach.isWord("true") ) {
            coach.expectWord("true");
            data.boolean = true;
        } else {
            coach.expectWord("false");
            data.boolean = false;
        }
    }
    
    is(coach) {
        return coach.isWord("true") || coach.isWord("false");
    }
    
    toString() {
        if ( this.data.boolean ) {
            return "true";
        } else {
            return "false";
        }
    }
}
