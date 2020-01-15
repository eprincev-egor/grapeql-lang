

import FunctionLink from "../../lib/syntax/FunctionLink";
import ObjectLink from "../../lib/syntax/ObjectLink";
import testSyntax from "../testSyntax";
import assert from "assert";

describe("FunctionLink", () => {

    it("FunctionLink instanceof ObjectLink", () => {
        assert.ok( FunctionLink.prototype instanceof ObjectLink );
    });

    testSyntax(FunctionLink, {
        str: "public.get_curs",
        result: {
            star: false,
            link: [
                {
                    word: "public",
                    content: null
                },
                {
                    word: "get_curs",
                    content: null
                }
            ]
        }
    });

});
