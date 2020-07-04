
import {testSyntax} from "../testSyntax";
import {Comment} from "../../lib/syntax/Comment";

describe("Comment", () => {

    testSyntax(Comment, {
        str: "--123\n",
        shouldBe: {
            isLine: true,
            isMulti: false,
            content: "123"
        }
    });

    testSyntax(Comment, {
        str: "--123\r",
        shouldBe: {
            isLine: true,
            isMulti: false,
            content: "123"
        }
    });

    testSyntax(Comment, {
        str: "/*123\n456*/",
        shouldBe: {
            isLine: false,
            isMulti: true,
            content: "123\n456"
        }
    });

    testSyntax(Comment, {
        str: "/*123\r456*/",
        shouldBe: {
            isLine: false,
            isMulti: true,
            content: "123\r456"
        }
    });

    testSyntax(Comment, {
        str: "-1",
        error: /SyntaxError/
    });

});
