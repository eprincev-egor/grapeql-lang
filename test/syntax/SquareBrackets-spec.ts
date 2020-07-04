
import {testSyntax} from "../testSyntax";
import {SquareBrackets} from "../../lib/syntax/SquareBrackets";

describe("SquareBrackets", () => {

    testSyntax(SquareBrackets, {
        str: "[1]",
        result: {
            content: {elements: [
                {number: "1"}
            ]}
        }
    });

});
