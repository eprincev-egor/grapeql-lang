
import {testSyntax} from "../testSyntax";
import {WindowDefinitionFrameElement} from "../../lib/syntax/WindowDefinitionFrameElement";

describe("WindowDefinitionFrameElement", () => {

    testSyntax(WindowDefinitionFrameElement, {
        str: "unbounded preceding",
        shouldBe: {
            value: null,
            currentRow: null,
            unbounded: true,
            preceding: true,
            following: null
        }
    });

    testSyntax(WindowDefinitionFrameElement, {
        str: "unbounded following",
        shouldBe: {
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
        shouldBe: {
            value: null,
            currentRow: true,
            unbounded: null,
            preceding: null,
            following: null
        }
    });

    testSyntax(WindowDefinitionFrameElement, {
        str: "1 preceding",
        shouldBe: {
            value: {number: "1"},
            currentRow: null,
            unbounded: null,
            preceding: true,
            following: null
        }
    });

    testSyntax(WindowDefinitionFrameElement, {
        str: "1 following",
        shouldBe: {
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
