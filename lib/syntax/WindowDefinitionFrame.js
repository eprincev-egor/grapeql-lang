"use strict";

const {Syntax} = require("lang-coach");
const WindowDefinitionFrameElement = require("./WindowDefinitionFrameElement");

/*
frame_start
BETWEEN frame_start AND frame_end
*/

class WindowDefinitionFrame extends Syntax {
    static structure() {
        return {
            start: WindowDefinitionFrameElement,
            end: WindowDefinitionFrameElement
        };
    }

    static parse(coach, data) {
        if ( coach.isWord("between") ) {
            coach.expectWord("between");

            data.start = coach.parseWindowDefinitionFrameElement(coach);

            coach.expectWord("and");

            data.end = coach.parseWindowDefinitionFrameElement(coach);
        }
        else {
            data.start = coach.parseWindowDefinitionFrameElement(coach);
        }
    }

    static is(coach) {
        return (
            coach.isWord("between") ||
            coach.isWindowDefinitionFrameElement()
        );
    }

    toString() {
        if ( this.data.end ) {
            return (
                "between " +
                this.data.start.toString() +
                " and " +
                this.data.end.toString()
            );
        }
        else {
            return this.data.start.toString();
        }
    }
}

module.exports = WindowDefinitionFrame;