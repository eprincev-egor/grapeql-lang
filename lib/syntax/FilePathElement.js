"use strict";

const DoubleQuotes = require("./DoubleQuotes");

class FilePathElement extends DoubleQuotes {
    static structure() {
        return {
            name: "string",
            content: "string"
        };
    }

    static parse(coach, data, options) {
        if ( coach.isDoubleQuotes() ) {
            DoubleQuotes.parse(coach, data, options);
        }
        else {
            data.name = coach.read(/[^\s/)]+/);
        }
    }

    static is(coach) {
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

module.exports = FilePathElement;