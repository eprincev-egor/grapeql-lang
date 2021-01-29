
import {Syntax} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {WindowDefinitionFrameElement} from "./WindowDefinitionFrameElement";

/*
frame_start
BETWEEN frame_start AND frame_end
*/

export class WindowDefinitionFrame extends Syntax<WindowDefinitionFrame> {
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
        if ( this.row.end ) {
            return (
                "between " +
                this.row.start!.toString() +
                " and " +
                this.row.end.toString()
            );
        }
        else {
            return this.row.start!.toString();
        }
    }
}
