
import {GrapeQLCoach} from "../../lib/GrapeQLCoach";
import {testSyntax} from "../testSyntax";
import assert from "assert";
import {WindowItem} from "../../lib/syntax/WindowItem";

describe("WindowItem", () => {

    testSyntax(WindowItem, {
        str: "x as (order by company.name)",
        shouldBe: {
            as: {word: "x"},
            body: {
                windowDefinition: null,
                partitionBy: null,
                orderBy: [
                    {
                        expression: {elements: [
                            {star: false, link: [
                                {word: "company"},
                                {word: "name"}
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
        const coach = new GrapeQLCoach("**");

        assert.strictEqual(
            coach.is(WindowItem),
            false
        );
    });

});
