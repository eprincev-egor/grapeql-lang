"use strict";

import DoubleQuotes from "./DoubleQuotes";
import { Types } from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";

export default class FilePathElement extends DoubleQuotes<FilePathElement> {
    structure() {
        return {
            name: Types.String,
            content: Types.String
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.is(DoubleQuotes) ) {
            const quotes = coach.parse(DoubleQuotes);
            data.content = quotes.get("content");
        }
        else {
            data.name = coach.read(/[^\s/)]+/);
            
            if ( !data.name ) {
                coach.throwError("expected file path");
            }
        }
    }

    is(coach: GrapeQLCoach) {
        return coach.is(/[^\s)/]/);
    }

    toString() {
        if ( this.data.name ) {
            return this.data.name;
        } else {
            return super.toString();
        }
    }
}

