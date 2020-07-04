
import {testSyntax} from "../testSyntax";
import assert from "assert";
import {ColumnLink} from "../../lib/syntax/ColumnLink";
import {ObjectLink} from "../../lib/syntax/ObjectLink";

describe("ColumnLink", () => {

    it("ColumnLink instanceof ObjectLink", () => {
        assert.ok( ColumnLink.prototype instanceof ObjectLink );
    });

    testSyntax(ColumnLink, {
        str: "public.company.id",
        shouldBe: {
            star: false,
            link: [
                {
                    word: "public"
                },
                {
                    word: "company"
                },
                {
                    word: "id"
                }
            ]
        }
    });

});
