

import DoubleQuotes from "./DoubleQuotes";
import { Types } from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";

export default class ObjectName extends DoubleQuotes<ObjectName> {
    structure() {
        return {
            content: Types.String,
            word: Types.String
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.is(DoubleQuotes) ) {
            super.parse(coach, data);
        }
        else {
            data.word = coach.expectWord();
        }
    }

    is(coach: GrapeQLCoach) {
        return coach.is(DoubleQuotes) || coach.isWord();
    }

    toString() {
        if ( this.row.word ) {
            return this.row.word;
        } else {
            return super.toString();
        }
    }
    
    toLowerCase() {
        return (
            this.row.word || 
            this.row.content
        );
    }
}


