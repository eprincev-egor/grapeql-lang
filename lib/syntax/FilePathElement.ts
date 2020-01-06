"use strict";

import DoubleQuotes from "./DoubleQuotes";

export default class FilePathElement extends DoubleQuotes {
    structure() {
        return {
            name: "string",
            content: "string"
        };
    }

    parse(coach, data) {
        if ( coach.isDoubleQuotes() ) {
            let quotes = coach.parseDoubleQuotes();
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

