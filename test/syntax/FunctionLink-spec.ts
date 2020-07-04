
import {testSyntax} from "../testSyntax";
import assert from "assert";
import {FunctionLink} from "../../lib/syntax/FunctionLink";
import {ObjectLink} from "../../lib/syntax/ObjectLink";

describe("FunctionLink", () => {

    it("FunctionLink instanceof ObjectLink", () => {
        assert.ok( FunctionLink.prototype instanceof ObjectLink );
    });

    testSyntax(FunctionLink, {
        str: "public.get_curs",
        shouldBe: {
            star: false,
            link: [
                {
                    word: "public"
                },
                {
                    word: "get_curs"
                }
            ]
        }
    });

});
