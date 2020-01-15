

import SquareBrackets from "../../lib/syntax/SquareBrackets";
import testSyntax from "../testSyntax";

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
