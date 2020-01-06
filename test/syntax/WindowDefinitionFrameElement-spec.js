"use strict";

const WindowDefinitionFrameElement = require("../../lib/syntax/WindowDefinitionFrameElement");
const testSyntax = require("../testSyntax");

describe("WindowDefinitionFrameElement", () => {

    testSyntax(WindowDefinitionFrameElement, {
        str: "unbounded preceding",
        result: {
            value: null,
            currentRow: null,
            unbounded: true,
            preceding: true,
            following: null
        }
    });

    testSyntax(WindowDefinitionFrameElement, {
        str: "unbounded following",
        result: {
            value: null,
            currentRow: null,
            unbounded: true,
            preceding: null,
            following: true
        }
    });

    testSyntax(WindowDefinitionFrameElement, {
        str: "unbounded wrong",
        error: /expected preceding or following/
    });

    testSyntax(WindowDefinitionFrameElement, {
        str: "current row",
        result: {
            value: null,
            currentRow: true,
            unbounded: null,
            preceding: null,
            following: null
        }
    });

    testSyntax(WindowDefinitionFrameElement, {
        str: "1 preceding",
        result: {
            value: {number: "1"},
            currentRow: null,
            unbounded: null,
            preceding: true,
            following: null
        }
    });

    testSyntax(WindowDefinitionFrameElement, {
        str: "1 following",
        result: {
            value: {number: "1"},
            currentRow: null,
            unbounded: null,
            preceding: null,
            following: true
        }
    });

    testSyntax(WindowDefinitionFrameElement, {
        str: "1 wrong",
        error: /expected preceding or following/
    });

});
