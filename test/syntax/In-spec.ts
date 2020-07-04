
import {testSyntax} from "../testSyntax";
import {In} from "../../lib/syntax/In";

describe("In", () => {

    testSyntax(In, {
        str: "in( select )",
        shouldBe: {
            inSelect: {
            }
        }
    });

    testSyntax(In, {
        str: "in( 1, 2 )",
        shouldBe: {
            inItems: [
                {elements: [
                    {number: "1"}
                ]},
                {elements: [
                    {number: "2"}
                ]}
            ]
        }
    });

});
