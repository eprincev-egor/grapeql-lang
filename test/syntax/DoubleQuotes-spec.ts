
import {testSyntax} from "../testSyntax";
import {DoubleQuotes} from "../../lib/syntax/DoubleQuotes";

describe("DoubleQuotes", () => {

    testSyntax(DoubleQuotes, {
        str: "\"hello \"\"world\"\"\"",
        shouldBe: {
            content: "hello \"world\""
        }
    });
    
    testSyntax(DoubleQuotes, {
        str: "U&\"d\\0061t\\+000061 test\"",
        shouldBe: {
            content: "data test"
        }
    });
    
    testSyntax(DoubleQuotes, {
        str: "u&\"d\\0061t\\+000061 test\"",
        shouldBe: {
            content: "data test"
        }
    });
    
    testSyntax(DoubleQuotes, {
        str: "U&\"d!0061t!+000061\" UESCAPE '!'",
        shouldBe: {
            content: "data"
        }
    });

    testSyntax(DoubleQuotes, {
        str: "U&\"\\0066\"",
        shouldBe: {
            content: "f"
        }
    });

    testSyntax(DoubleQuotes, {
        str: "\"1\" uescape",
        error: /unexpected uescape, use u& before quotes/
    });

    testSyntax(DoubleQuotes, {
        str: "U&\"d!0061t!+000061\" UESCAPE '+'",
        error: /The escape character can be any single character other than a hexadecimal digit, the plus sign, a single quote, a double quote, or a whitespace character/
    });

    testSyntax(DoubleQuotes, {
        str: "u&\"\" uescape '+'",
        error: /The escape character can be any single character other than a hexadecimal digit, the plus sign, a single quote, a double quote, or a whitespace character/
    });

});
