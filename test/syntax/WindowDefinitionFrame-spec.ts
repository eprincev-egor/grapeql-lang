
import {testSyntax} from "../testSyntax";
import {WindowDefinitionFrame} from "../../lib/syntax/WindowDefinitionFrame";

describe("WindowDefinitionFrame", () => {

    testSyntax(WindowDefinitionFrame, {
        str: "unbounded preceding",
        shouldBe: {
            start: {
                unbounded: true,
                preceding: true
            }
        }
    });

    testSyntax(WindowDefinitionFrame, {
        str: "1 preceding",
        shouldBe: {
            start: {
                value: {number: "1"},
                preceding: true
            }
        }
    });

    testSyntax(WindowDefinitionFrame, {
        str: "between 1 preceding and 2 preceding",
        shouldBe: {
            start: {
                value: {number: "1"},
                preceding: true
            },
            end: {
                value: {number: "2"},
                preceding: true
            }
        }
    });

});
