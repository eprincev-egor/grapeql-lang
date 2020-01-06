"use strict";

import {Syntax} from "lang-coach";
import WindowDefinitionFrameElement from "./WindowDefinitionFrameElement";

/*
frame_start
BETWEEN frame_start AND frame_end
*/

export default class WindowDefinitionFrame extends Syntax<WindowDefinitionFrame> {
    structure() {
        return {
            start: WindowDefinitionFrameElement,
            end: WindowDefinitionFrameElement
        };
    }

    parse(coach, data) {
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

    is(coach) {
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
