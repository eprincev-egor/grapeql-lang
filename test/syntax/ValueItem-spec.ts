
import {testSyntax} from "../testSyntax";
import {ValueItem} from "../../lib/syntax/ValueItem";

describe("ValueItem", () => {

    testSyntax(ValueItem, {
        str: "default",
        shouldBe: {
            value: null,
            default: true
        }
    });

    testSyntax(ValueItem, {
        str: "1",
        shouldBe: {
            value: {elements: [
                {number: "1"}
            ]},
            default: null
        }
    });

});
