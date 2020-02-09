

import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";

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

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {

        if ( coach.isWord("true") ) {
            coach.expectWord("true");
            data.boolean = true;
        } else {
            coach.expectWord("false");
            data.boolean = false;
        }
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("true") || coach.isWord("false");
    }
    
    toString() {
        if ( this.row.boolean ) {
            return "true";
        } else {
            return "false";
        }
    }
}
