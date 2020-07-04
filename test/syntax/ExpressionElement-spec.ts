
import {GrapeQLCoach} from "../../lib/GrapeQLCoach";
import {testSyntax} from "../testSyntax";
import assert from "assert";
import {ExpressionElement} from "../../lib/syntax/ExpressionElement";

describe("ExpressionElement", () => {

    testSyntax(ExpressionElement, {
        str: "null",
        shouldBe: {
            element: {
                null: true
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "true",
        shouldBe: {
            element: {
                boolean: true
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "1",
        shouldBe: {
            element: {
                number: "1"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "b'0011'",
        shouldBe: {
            element: {
                content: "0011"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "$body$some code$body$",
        shouldBe: {
            element: {
                content: "some code"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "'string'",
        shouldBe: {
            element: {
                content: "string"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "$var",
        shouldBe: {
            element: {
                name: "var"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "public.table.column",
        shouldBe: {
            element: {
                star: false,
                link: [
                    {
                        word: "public"
                    },
                    {
                        word: "table"
                    },
                    {
                        word: "column"
                    }
                ]
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "public.table.*",
        options: {availableStar: true},
        shouldBe: {
            element: {
                star: true,
                link: [
                    {
                        word: "public"
                    },
                    {
                        word: "table"
                    }
                ]
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "*",
        options: {availableStar: true},
        shouldBe: {
            element: {
                star: true,
                link: []
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "cast(1 as numeric( 12, 12 ))",
        shouldBe: {
            element: {
                cast: {
                    type: "numeric(12,12)"
                },
                expression: {
                    elements: [
                        {
                            number: "1"
                        }
                    ]
                }
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "array[1]",
        shouldBe: {
            element: {array: [
                {elements: [
                    {number: "1"}
                ]}
            ]}
        }
    });

    testSyntax(ExpressionElement, {
        str: "public.table.*",
        error: /SyntaxError/
    });

    it("error on empty string", () => {
        assert.throws(
            () => {
                const coach = new GrapeQLCoach("");
                coach.parse(ExpressionElement);
            },
            (err) =>
                /expected any expression element/.test( err.message )
        );
    });

    testSyntax(ExpressionElement, {
        str: "case when true then 1 else 0 end",
        shouldBe: {
            element: {
                case: [
                    {
                        when: {elements: [
                            {boolean: true}
                        ]},
                        then: {elements: [
                            {number: "1"}
                        ]}
                    }
                ],
                else: {elements: [
                    {number: "0"}
                ]}
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "extract(week FROM $$2000-12-16 12:21:13$$)",
        shouldBe: {
            element: {
                field: "week",
                source: {elements: [
                    {content: "2000-12-16 12:21:13"}
                ]}
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "substring( company.name from 1 for 5)",
        shouldBe: {
            element: {
                str: {elements: [{
                    star: false,
                    link: [
                        {word: "company"},
                        {word: "name"}
                    ]
                }]},
                from: {elements: [{
                    number: "1"
                }]},
                for: {elements: [{
                    number: "5"
                }]}
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "now()",
        shouldBe: {
            element: {
                function: {
                    star: false,
                    link: [
                        {word: "now"}
                    ]
                },
                arguments: []
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "interval '2 years 13 months'",
        shouldBe: {
            element: {
                interval: {
                    content: "2 years 13 months"
                }
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "exists(select)",
        shouldBe: {
            element: {
                exists: {
                }
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "any(select)",
        shouldBe: {
            element: {
                type: "any",
                select: {
                }
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "in( 1 + 1 )",
        shouldBe: {
            element: {
                inItems: [
                    {elements: [
                        {number: "1"},
                        {operator: "+"},
                        {number: "1"}
                    ]}
                ]
            }
        }
    });
});
