"use strict";

const DoubleQuotes = require("./DoubleQuotes");

class ObjectName extends DoubleQuotes {
    static structure() {
        return {
            content: "string",
            word: "string"
        };
    }

    static parse(coach, data) {
        if ( coach.isDoubleQuotes() ) {
            super.parse(coach, data);
        }
        else {
            data.word = coach.expectWord();
        }
    }

    static is(coach) {
        return coach.isDoubleQuotes() || coach.isWord();
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

module.exports = ObjectName;
