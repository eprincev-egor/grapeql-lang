"use strict";

const FunctionLink = require("../../lib/syntax/FunctionLink");
const ObjectLink = require("../../lib/syntax/ObjectLink");
const testSyntax = require("../testSyntax");
const assert = require("assert");

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
