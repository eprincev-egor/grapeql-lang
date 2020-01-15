

import TableLink from "../../lib/syntax/TableLink";
import ObjectLink from "../../lib/syntax/ObjectLink";
import testSyntax from "../testSyntax";
import assert from "assert";

describe("TableLink", () => {

    it("TableLink instanceof ObjectLink", () => {
        assert.ok( TableLink.prototype instanceof ObjectLink );
    });

    testSyntax(TableLink, {
        str: "public.company",
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
                }
            ]
        }
    });

});