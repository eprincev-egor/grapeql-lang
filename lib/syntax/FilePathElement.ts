"use strict";

import DoubleQuotes from "./DoubleQuotes";
import { Types } from "lang-coach";

export default class FilePathElement extends DoubleQuotes<FilePathElement> {
    structure() {
        return {
            name: Types.String,
            content: Types.String
        };
    }

    parse(coach, data: this["TInputData"]) {
        if ( coach.isDoubleQuotes() ) {
            const quotes = coach.parseDoubleQuotes();
            data.content = quotes.get("content");
        }
        else {
            data.name = coach.read(/[^\s/)]+/);
            
            if ( !data.name ) {
                coach.throwError("expected file path");
            }
        }
    }

    is(coach) {
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

