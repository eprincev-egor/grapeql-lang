
import {testSyntax} from "../testSyntax";
import {WindowDefinitionFrameElement} from "../../lib/syntax/WindowDefinitionFrameElement";

describe("WindowDefinitionFrameElement", () => {

    testSyntax(WindowDefinitionFrameElement, {
        str: "unbounded preceding",
        shouldBe: {
            unbounded: true,
            preceding: true
        }
    });

    testSyntax(WindowDefinitionFrameElement, {
        str: "unbounded following",
        shouldBe: {
            unbounded: true
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
            currentRow: true
        }
    });

    testSyntax(WindowDefinitionFrameElement, {
        str: "1 preceding",
        shouldBe: {
            value: {number: "1"}
            preceding: true
        }
    });

    testSyntax(WindowDefinitionFrameElement, {
        str: "1 following",
        shouldBe: {
            value: {number: "1"}
            following: true
        }
    });

    testSyntax(WindowDefinitionFrameElement, {
        str: "1 wrong",
        error: /expected preceding or following/
    });

});
