
import WindowDefinitionFrameElement from "../../lib/syntax/WindowDefinitionFrameElement";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("WindowDefinitionFrameElement", () => {

    GrapeQLCoach.test(WindowDefinitionFrameElement, {
        str: "unbounded preceding",
        result: {
            value: null,
            currentRow: null,
            unbounded: true,
            preceding: true,
            following: null
        }
    });

    GrapeQLCoach.test(WindowDefinitionFrameElement, {
        str: "unbounded following",
        result: {
            value: null,
            currentRow: null,
            unbounded: true,
            preceding: null,
            following: true
        }
    });

    GrapeQLCoach.test(WindowDefinitionFrameElement, {
        str: "unbounded wrong",
        error: /expected preceding or following/
    });

    GrapeQLCoach.test(WindowDefinitionFrameElement, {
        str: "current row",
        result: {
            value: null,
            currentRow: true,
            unbounded: null,
            preceding: null,
            following: null
        }
    });

    GrapeQLCoach.test(WindowDefinitionFrameElement, {
        str: "1 preceding",
        result: {
            value: {number: "1"},
            currentRow: null,
            unbounded: null,
            preceding: true,
            following: null
        }
    });

    GrapeQLCoach.test(WindowDefinitionFrameElement, {
        str: "1 following",
        result: {
            value: {number: "1"},
            currentRow: null,
            unbounded: null,
            preceding: null,
            following: true
        }
    });

    GrapeQLCoach.test(WindowDefinitionFrameElement, {
        str: "1 wrong",
        error: /expected preceding or following/
    });

});
