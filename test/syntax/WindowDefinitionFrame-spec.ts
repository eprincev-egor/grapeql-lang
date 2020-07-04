
import {testSyntax} from "../testSyntax";
import {WindowDefinitionFrame} from "../../lib/syntax/WindowDefinitionFrame";

describe("WindowDefinitionFrame", () => {

    testSyntax(WindowDefinitionFrame, {
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

    testSyntax(WindowDefinitionFrame, {
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

    testSyntax(WindowDefinitionFrame, {
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
