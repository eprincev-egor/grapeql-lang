
import {testSyntax} from "../testSyntax";
import {SingleQuotesString} from "../../lib/syntax/SingleQuotesString";

describe("SingleQuotesString", () => {

    testSyntax(SingleQuotesString, {
        str: "'hello ''world'''",
        shouldBe: {
            content: "hello 'world'"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello'\n'world'",
        shouldBe: {
            content: "helloworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello'\r'world'",
        shouldBe: {
            content: "helloworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello'\n\r'world'",
        shouldBe: {
            content: "helloworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello' \n\r 'world' \n\r 'world'",
        shouldBe: {
            content: "helloworldworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello' \n\r 'world' \n\r 'world'  ",
        shouldBe: {
            content: "helloworldworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello' \n\r 'world' \n\r 'world' \n ",
        shouldBe: {
            content: "helloworldworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello' \n\r 'world' \n\r 'world' \r ",
        shouldBe: {
            content: "helloworldworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello' \n\r 'world' \n\r 'world' \n\r ",
        shouldBe: {
            content: "helloworldworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\\\'",
        shouldBe: {
            content: "\\"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\n'",
        shouldBe: {
            content: "\n"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\rT'",
        shouldBe: {
            content: "\rT"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\b'",
        shouldBe: {
            content: "\b"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\f'",
        shouldBe: {
            content: "\f"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\t'",
        shouldBe: {
            content: "\t"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\U000061b'",
        shouldBe: {
            content: "ab"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\U00006aa'",
        shouldBe: {
            content: "ja"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\U00006A'",
        shouldBe: {
            content: "j"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\u0061'",
        shouldBe: {
            content: "a"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\061a'",
        shouldBe: {
            content: "1a"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "U&'d\\0061t\\+000061 test'",
        shouldBe: {
            content: "data test"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "u&'d\\0061t\\+000061 test'",
        shouldBe: {
            content: "data test"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "U&'d!0061t!+000061' UESCAPE '!'",
        shouldBe: {
            content: "data"
        }
    });

    testSyntax(SingleQuotesString, {
        str: "U&'d!0061t!+000061 '\n'd!0061t!+000061' UESCAPE '!'",
        shouldBe: {
            content: "data data"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "U&'\\066'",
        shouldBe: {
            content: "f"
        }
    });

    testSyntax(SingleQuotesString, {
        str: "'1' uescape",
        error: /unexpected uescape, use u& before quotes/
    });

    testSyntax(SingleQuotesString, {
        str: "U&'d!0061t!+000061' UESCAPE '+'",
        error: /The escape character can be any single character other than a hexadecimal digit, the plus sign, a single quote, a double quote, or a whitespace character/
    });

    testSyntax(SingleQuotesString, {
        str: "E'\\x66'",
        shouldBe: {
            content: "f"
        }
    });

    testSyntax(SingleQuotesString, {
        str: "E'\\x6'",
        shouldBe: {
            content: "\u0006"
        }
    });

    testSyntax(SingleQuotesString, {
        str: "E'\\x0'",
        error: /invalid unicode sequence/
    });

    testSyntax(SingleQuotesString, {
        str: "E'\\x00'",
        error: /invalid unicode sequence/
    });

    testSyntax(SingleQuotesString, {
        str: "E'\\xpp'",
        error: /invalid unicode sequence/
    });

    testSyntax(SingleQuotesString, {
        str: "E'\\p'",
        shouldBe: {
            content: "p"
        }
    });

});
