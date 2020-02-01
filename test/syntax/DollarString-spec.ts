


import DollarString from "../../lib/syntax/DollarString";
import testSyntax from "../testSyntax";

describe("DollarString", () => {

    testSyntax(DollarString, {
        str: "$$hello'world$$",
        result: {
            content: "hello'world"
        }
    });

    testSyntax(DollarString, {
        str: "$Tag_1$hello'world$Tag_1$",
        result: {
            content: "hello'world"
        }
    });

    testSyntax(DollarString, {
        str: "$Tag_1$$tag_1$$Tag_1$",
        result: {
            content: "$tag_1$"
        }
    });

    testSyntax(DollarString, {
        str: "$Tag_1$$tag1$$Tag_1$",
        result: {
            content: "$tag1$"
        }
    });
    
    testSyntax(DollarString, {
        str: "$$\n\r$$",
        result: {
            content: "\n\r"
        }
    });
    
    testSyntax(DollarString, {
        str: "$q$[\\t\\r\\n\\v\\\\]$q$",
        result: {
            content: "[\\t\\r\\n\\v\\\\]"
        }
    });

});
