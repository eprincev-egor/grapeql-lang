"use strict";

const WindowItem = require("../../lib/syntax/WindowItem");
const GrapeQLCoach = require("../../lib/GrapeQLCoach");
const testSyntax = require("../testSyntax");
const assert = require("assert");

describe("WindowItem", () => {

    testSyntax(WindowItem, {
        str: "x as (order by company.name)",
        result: {
            as: {word: "x", content: null},
            body: {
                windowDefinition: null,
                partitionBy: null,
                orderBy: [
                    {
                        expression: {elements: [
                            {star: false, link: [
                                {word: "company", content: null},
                                {word: "name", content: null}
                            ]}
                        ]},
                        vector: "asc",
                        using: null,
                        nulls: null
                    }
                ],
                range: null,
                rows: null
            }
        }
    });

    testSyntax(WindowItem, {
        str: "****",
        error: /SyntaxError/
    });

    it("WindowItem.is(something wrong)", () => {
        let coach = new GrapeQLCoach("**");

        assert.strictEqual(
            coach.isWindowItem(),
            false
        );
    });

});
