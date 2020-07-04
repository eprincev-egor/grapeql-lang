
import {testSyntax} from "../testSyntax";
import {DollarString} from "../../lib/syntax/DollarString";

describe("DollarString", () => {

    testSyntax(DollarString, {
        str: "$$hello'world$$",
        shouldBe: {
            content: "hello'world"
        }
    });

    testSyntax(DollarString, {
        str: "$Tag_1$hello'world$Tag_1$",
        shouldBe: {
            content: "hello'world"
        }
    });

    testSyntax(DollarString, {
        str: "$Tag_1$$tag_1$$Tag_1$",
        shouldBe: {
            content: "$tag_1$"
        }
    });

    testSyntax(DollarString, {
        str: "$Tag_1$$tag1$$Tag_1$",
        shouldBe: {
            content: "$tag1$"
        }
    });
    
    testSyntax(DollarString, {
        str: "$$\n\r$$",
        shouldBe: {
            content: "\n\r"
        }
    });
    
    testSyntax(DollarString, {
        str: "$q$[\\t\\r\\n\\v\\\\]$q$",
        shouldBe: {
            content: "[\\t\\r\\n\\v\\\\]"
        }
    });

});
