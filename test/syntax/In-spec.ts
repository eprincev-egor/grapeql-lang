

import In from "../../lib/syntax/In";
import testSyntax from "../testSyntax";

describe("In", () => {

    testSyntax(In, {
        str: "in( select )",
        result: {
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
        result: {
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
