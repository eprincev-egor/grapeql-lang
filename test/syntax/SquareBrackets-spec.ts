
import {testSyntax} from "../testSyntax";
import {SquareBrackets} from "../../lib/syntax/SquareBrackets";

describe("SquareBrackets", () => {

    testSyntax(SquareBrackets, {
        str: "[1]",
        shouldBe: {
            content: {elements: [
                {number: "1"}
            ]}
        }
    });

});
