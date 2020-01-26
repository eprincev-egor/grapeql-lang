
import SingleQuotesString from "../../lib/syntax/SingleQuotesString";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("SingleQuotesString", () => {

    GrapeQLCoach.test(SingleQuotesString, {
        str: "'hello ''world'''",
        result: {
            content: "hello 'world'"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "'hello'\n'world'",
        result: {
            content: "helloworld"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "'hello'\r'world'",
        result: {
            content: "helloworld"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "'hello'\n\r'world'",
        result: {
            content: "helloworld"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "'hello' \n\r 'world' \n\r 'world'",
        result: {
            content: "helloworldworld"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "'hello' \n\r 'world' \n\r 'world'  ",
        result: {
            content: "helloworldworld"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "'hello' \n\r 'world' \n\r 'world' \n ",
        result: {
            content: "helloworldworld"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "'hello' \n\r 'world' \n\r 'world' \r ",
        result: {
            content: "helloworldworld"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "'hello' \n\r 'world' \n\r 'world' \n\r ",
        result: {
            content: "helloworldworld"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\\\'",
        result: {
            content: "\\"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\n'",
        result: {
            content: "\n"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\rT'",
        result: {
            content: "\rT"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\b'",
        result: {
            content: "\b"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\f'",
        result: {
            content: "\f"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\t'",
        result: {
            content: "\t"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\U000061b'",
        result: {
            content: "ab"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\U00006aa'",
        result: {
            content: "ja"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\U00006A'",
        result: {
            content: "j"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\u0061'",
        result: {
            content: "a"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\061a'",
        result: {
            content: "1a"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "U&'d\\0061t\\+000061 test'",
        result: {
            content: "data test"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "u&'d\\0061t\\+000061 test'",
        result: {
            content: "data test"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "U&'d!0061t!+000061' UESCAPE '!'",
        result: {
            content: "data"
        }
    });

    GrapeQLCoach.test(SingleQuotesString, {
        str: "U&'d!0061t!+000061 '\n'd!0061t!+000061' UESCAPE '!'",
        result: {
            content: "data data"
        }
    });
    
    GrapeQLCoach.test(SingleQuotesString, {
        str: "U&'\\066'",
        result: {
            content: "f"
        }
    });

    GrapeQLCoach.test(SingleQuotesString, {
        str: "'1' uescape",
        error: /unexpected uescape, use u& before quotes/
    });

    GrapeQLCoach.test(SingleQuotesString, {
        str: "U&'d!0061t!+000061' UESCAPE '+'",
        error: /The escape character can be any single character other than a hexadecimal digit, the plus sign, a single quote, a double quote, or a whitespace character/
    });

    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\x66'",
        result: {
            content: "f"
        }
    });

    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\x6'",
        result: {
            content: "\u0006"
        }
    });

    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\x0'",
        error: /invalid unicode sequence/
    });

    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\x00'",
        error: /invalid unicode sequence/
    });

    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\xpp'",
        error: /invalid unicode sequence/
    });

    GrapeQLCoach.test(SingleQuotesString, {
        str: "E'\\p'",
        result: {
            content: "p"
        }
    });

});
