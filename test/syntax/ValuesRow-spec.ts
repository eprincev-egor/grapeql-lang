

import ValuesRow from "../../lib/syntax/ValuesRow";
import testSyntax from "../testSyntax";

describe("ValuesRow", () => {

    testSyntax(ValuesRow, {
        str: "(default)",
        result: {
            values: [{
                default: true,
                expression: null
            }]
        }
    });

    testSyntax(ValuesRow, {
        str: "(default, 2)",
        result: {
            values: [
                {
                    default: true,
                    expression: null
                },
                {
                    default: null,
                    expression: {elements: [
                        {number: "2"}
                    ]}
                }
            ]
        }
    });

});
