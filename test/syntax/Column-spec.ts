
import {GrapeQLCoach} from "../../lib/GrapeQLCoach";
import assert from "assert";
import {testSyntax} from "../testSyntax";
import {Column} from "../../lib/syntax/Column";

describe("Column", () => {

    testSyntax(Column, {
        str: "company.id as id",
        shouldBe: {
            expression: {
                elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "id"}
                    ]}
                ]
            },
            as: { word: "id" }
        }
    });

    testSyntax(Column, {
        str: "company.id id",
        shouldBe: {
            expression: {
                elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "id"}
                    ]}
                ]
            },
            as: { word: "id" }
        }
    });

    testSyntax(Column, {
        str: "company.id \"id\"",
        shouldBe: {
            expression: {
                elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "id"}
                    ]}
                ]
            },
            as: { content: "id" }
        }
    });

    testSyntax(Column, {
        str: "null as nulL1",
        shouldBe: {
            expression: {
                elements: [
                    {null: true}
                ]
            },
            as: { word: "null1" }
        }
    });

    testSyntax(Column, {
        str: "*",
        shouldBe: {
            expression: {
                elements: [
                    {star: true, link: []}
                ]
            }
        }
    });


    // test keywords
    
    const keywords = [
        "into",
        "from",
        "where",
        "having",
        "offset",
        "limit",
        "fetch",
        "union",
        "intersect",
        "except",
        "order",
        "group",
        // @see joins
        "on",
        "using",
        "left",
        "right",
        "full",
        "inner",
        "cross",
        "join"
    ];

    keywords.forEach((keyword) => {

        testSyntax(Column, {
            str: "1 " + keyword,
            shouldBe: {
                expression: {elements: [
                    {number: "1"}
                ]}
            }
        });
        
        it(`select ${ keyword }  // select without columns`, () => {
            const coach = new GrapeQLCoach( keyword );

            assert.ok(
                !coach.is(Column)
            );
        });
    });

});
