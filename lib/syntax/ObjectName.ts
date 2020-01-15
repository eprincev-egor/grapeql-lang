"use strict";

import DoubleQuotes from "./DoubleQuotes";
import { Types } from "lang-coach";

export default class ObjectName extends DoubleQuotes {
    structure() {
        return {
            content: Types.String,
            word: Types.String
        };
    }

    parse(coach, data) {
        if ( coach.is(DoubleQuotes) ) {
            super.parse(coach, data);
        }
        else {
            data.word = coach.expectWord();
        }
    }

    is(coach) {
        return coach.is(DoubleQuotes) || coach.isWord();
    }

    toString() {
        if ( this.data.word ) {
            return this.data.word;
        } else {
            return super.toString();
        }
    }
    
    toLowerCase() {
        return (
            this.data.word || 
            this.data.content
        );
    }
}


