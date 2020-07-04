
import {testSyntax} from "../testSyntax";
import {ValuesRow} from "../../lib/syntax/ValuesRow";

describe("ValuesRow", () => {

    testSyntax(ValuesRow, {
        str: "(default)",
        shouldBe: {
            values: [{
                default: true
            }]
        }
    });

    testSyntax(ValuesRow, {
        str: "(default, 2)",
        shouldBe: {
            values: [
                {
                    default: true
                },
                {
                    value: {elements: [
                        {number: "2"}
                    ]}
                }
            ]
        }
    });

});
