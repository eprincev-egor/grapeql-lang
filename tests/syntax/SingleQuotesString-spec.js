"use strict";
"use strict";

const SingleQuotesString = require("../../lib/syntax/SingleQuotesString");
const testSyntax = require("../testSyntax");

describe("SingleQuotesString", () => {

    testSyntax(SingleQuotesString, {
        str: "'hello ''world'''",
        result: {
            content: "hello 'world'"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello'\n'world'",
        result: {
            content: "helloworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello'\r'world'",
        result: {
            content: "helloworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello'\n\r'world'",
        result: {
            content: "helloworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello' \n\r 'world' \n\r 'world'",
        result: {
            content: "helloworldworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello' \n\r 'world' \n\r 'world'  ",
        result: {
            content: "helloworldworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello' \n\r 'world' \n\r 'world' \n ",
        result: {
            content: "helloworldworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello' \n\r 'world' \n\r 'world' \r ",
        result: {
            content: "helloworldworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "'hello' \n\r 'world' \n\r 'world' \n\r ",
        result: {
            content: "helloworldworld"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\\\'",
        result: {
            content: "\\"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\n'",
        result: {
            content: "\n"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\rT'",
        result: {
            content: "\rT"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\b'",
        result: {
            content: "\b"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\f'",
        result: {
            content: "\f"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\t'",
        result: {
            content: "\t"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\U000061b'",
        result: {
            content: "ab"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\U00006aa'",
        result: {
            content: "ja"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\U00006A'",
        result: {
            content: "j"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\u0061'",
        result: {
            content: "a"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "E'\\061a'",
        result: {
            content: "1a"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "U&'d\\0061t\\+000061 test'",
        result: {
            content: "data test"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "u&'d\\0061t\\+000061 test'",
        result: {
            content: "data test"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "U&'d!0061t!+000061' UESCAPE '!'",
        result: {
            content: "data"
        }
    });
    
    testSyntax(SingleQuotesString, {
        str: "U&'\\066'",
        result: {
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
        result: {
            content: "f"
        }
    });

    testSyntax(SingleQuotesString, {
        str: "E'\\x6'",
        result: {
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
        result: {
            content: "p"
        }
    });

});
