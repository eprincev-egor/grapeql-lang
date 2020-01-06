"use strict";

const TableLink = require("../../lib/syntax/TableLink");
const ObjectLink = require("../../lib/syntax/ObjectLink");
const testSyntax = require("../testSyntax");
const assert = require("assert");

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
