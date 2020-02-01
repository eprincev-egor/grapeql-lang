

import ColumnLink from "../../lib/syntax/ColumnLink";
import ObjectLink from "../../lib/syntax/ObjectLink";
import testSyntax from "../testSyntax";
import assert from "assert";

describe("ColumnLink", () => {

    it("ColumnLink instanceof ObjectLink", () => {
        assert.ok( ColumnLink.prototype instanceof ObjectLink );
    });

    testSyntax(ColumnLink, {
        str: "public.company.id",
        result: {
            star: false,
            link: [
                {
                    word: "public",
                    content: null
                },
                {
                    word: "company",
                    content: null
                },
                {
                    word: "id",
                    content: null
                }
            ]
        }
    });

});
