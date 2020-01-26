
import DoubleQuotes from "../../lib/syntax/DoubleQuotes";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("DoubleQuotes", () => {

    GrapeQLCoach.test(DoubleQuotes, {
        str: "\"hello \"\"world\"\"\"",
        result: {
            content: "hello \"world\""
        }
    });
    
    GrapeQLCoach.test(DoubleQuotes, {
        str: "U&\"d\\0061t\\+000061 test\"",
        result: {
            content: "data test"
        }
    });
    
    GrapeQLCoach.test(DoubleQuotes, {
        str: "u&\"d\\0061t\\+000061 test\"",
        result: {
            content: "data test"
        }
    });
    
    GrapeQLCoach.test(DoubleQuotes, {
        str: "U&\"d!0061t!+000061\" UESCAPE '!'",
        result: {
            content: "data"
        }
    });

    GrapeQLCoach.test(DoubleQuotes, {
        str: "U&\"\\0066\"",
        result: {
            content: "f"
        }
    });

    GrapeQLCoach.test(DoubleQuotes, {
        str: "\"1\" uescape",
        error: /unexpected uescape, use u& before quotes/
    });

    GrapeQLCoach.test(DoubleQuotes, {
        str: "U&\"d!0061t!+000061\" UESCAPE '+'",
        error: /The escape character can be any single character other than a hexadecimal digit, the plus sign, a single quote, a double quote, or a whitespace character/
    });

    GrapeQLCoach.test(DoubleQuotes, {
        str: "u&\"\" uescape '+'",
        error: /The escape character can be any single character other than a hexadecimal digit, the plus sign, a single quote, a double quote, or a whitespace character/
    });

});
