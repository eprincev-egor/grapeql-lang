"use strict";

import {Syntax} from "lang-coach";
import WindowDefinitionFrameElement from "./WindowDefinitionFrameElement";
import GrapeQLCoach from "../GrapeQLCoach";

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

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.isWord("between") ) {
            coach.expectWord("between");

            data.start = coach.parse(WindowDefinitionFrameElement);

            coach.expectWord("and");

            data.end = coach.parse(WindowDefinitionFrameElement);
        }
        else {
            data.start = coach.parse(WindowDefinitionFrameElement);
        }
    }

    is(coach: GrapeQLCoach) {
        return (
            coach.isWord("between") ||
            coach.is(WindowDefinitionFrameElement)
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

