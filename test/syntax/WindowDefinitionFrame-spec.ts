
import WindowDefinitionFrame from "../../lib/syntax/WindowDefinitionFrame";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("WindowDefinitionFrame", () => {

    GrapeQLCoach.test(WindowDefinitionFrame, {
        str: "unbounded preceding",
        result: {
            start: {
                value: null,
                currentRow: null,
                unbounded: true,
                preceding: true,
                following: null
            },
            end: null
        }
    });

    GrapeQLCoach.test(WindowDefinitionFrame, {
        str: "1 preceding",
        result: {
            start: {
                value: {number: "1"},
                currentRow: null,
                unbounded: null,
                preceding: true,
                following: null
            },
            end: null
        }
    });

    GrapeQLCoach.test(WindowDefinitionFrame, {
        str: "between 1 preceding and 2 preceding",
        result: {
            start: {
                value: {number: "1"},
                currentRow: null,
                unbounded: null,
                preceding: true,
                following: null
            },
            end: {
                value: {number: "2"},
                currentRow: null,
                unbounded: null,
                preceding: true,
                following: null
            }
        }
    });

});
