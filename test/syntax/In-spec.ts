
import {testSyntax} from "../testSyntax";
import {In} from "../../lib/syntax/In";

describe("In", () => {

    testSyntax(In, {
        str: "in( select )",
        shouldBe: {
            inItems: null,
            inSelect: {
                with: null,
                columns: null,
                into: null,
                from: null,
                where: null,
                groupBy: null,
                having: null,
                window: null,
                orderBy: null,
                union: null,
                offset: null,
                offsetRow: null,
                offsetRows: null,
                limit: null,
                fetch: null
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
            ],
            inSelect: null
        }
    });

});
