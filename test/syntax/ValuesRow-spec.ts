

import ValuesRow from "../../lib/syntax/ValuesRow";
import testSyntax from "../testSyntax";

describe("ValuesRow", () => {

    testSyntax(ValuesRow, {
        str: "(default)",
        result: {
            values: [{
                default: true,
                value: null
            }]
        }
    });

    testSyntax(ValuesRow, {
        str: "(default, 2)",
        result: {
            values: [
                {
                    default: true,
                    value: null
                },
                {
                    default: null,
                    value: {elements: [
                        {number: "2"}
                    ]}
                }
            ]
        }
    });

});
