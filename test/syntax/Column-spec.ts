

import GrapeQLCoach from "../../lib/GrapeQLCoach";
import assert from "assert";
import Column from "../../lib/syntax/Column";
import testSyntax from "../testSyntax";

describe("Column", () => {

    testSyntax(Column, {
        str: "company.id as id",
        result: {
            expression: {
                elements: [
                    {star: false, link: [
                        {word: "company", content: null},
                        {word: "id", content: null}
                    ]}
                ]
            },
            as: { word: "id", content: null }
        }
    });

    testSyntax(Column, {
        str: "company.id id",
        result: {
            expression: {
                elements: [
                    {star: false, link: [
                        {word: "company", content: null},
                        {word: "id", content: null}
                    ]}
                ]
            },
            as: { word: "id", content: null }
        }
    });

    testSyntax(Column, {
        str: "company.id \"id\"",
        result: {
            expression: {
                elements: [
                    {star: false, link: [
                        {word: "company", content: null},
                        {word: "id", content: null}
                    ]}
                ]
            },
            as: { word: null, content: "id" }
        }
    });

    testSyntax(Column, {
        str: "null as nulL1",
        result: {
            expression: {
                elements: [
                    {null: true}
                ]
            },
            as: { word: "null1", content: null }
        }
    });

    testSyntax(Column, {
        str: "*",
        result: {
            expression: {
                elements: [
                    {star: true, link: []}
                ]
            },
            as: null
        }
    });


    // test keywords
    
    const keywords = [
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
            result: {
                expression: {elements: [
                    {number: "1"}
                ]},
                as: null
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
