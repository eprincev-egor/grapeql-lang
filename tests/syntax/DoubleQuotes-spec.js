"use strict";
"use strict";

const DoubleQuotes = require("../../lib/syntax/DoubleQuotes");
const testSyntax = require("../testSyntax");

describe("DoubleQuotes", () => {

    testSyntax(DoubleQuotes, {
        str: "\"hello \"\"world\"\"\"",
        result: {
            content: "hello \"world\""
        }
    });
    
    testSyntax(DoubleQuotes, {
        str: "U&\"d\\0061t\\+000061 test\"",
        result: {
            content: "data test"
        }
    });
    
    testSyntax(DoubleQuotes, {
        str: "u&\"d\\0061t\\+000061 test\"",
        result: {
            content: "data test"
        }
    });
    
    testSyntax(DoubleQuotes, {
        str: "U&\"d!0061t!+000061\" UESCAPE '!'",
        result: {
            content: "data"
        }
    });

    testSyntax(DoubleQuotes, {
        str: "U&\"\\0066\"",
        result: {
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
