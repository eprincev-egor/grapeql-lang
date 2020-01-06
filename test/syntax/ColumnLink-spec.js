"use strict";

const ColumnLink = require("../../lib/syntax/ColumnLink");
const ObjectLink = require("../../lib/syntax/ObjectLink");
const testSyntax = require("../testSyntax");
const assert = require("assert");

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
