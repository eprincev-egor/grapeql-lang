

import GrapeQLCoach from "../../lib/GrapeQLCoach";
import assert from "assert";
import ExpressionElement from "../../lib/syntax/ExpressionElement";

describe("ExpressionElement", () => {

    GrapeQLCoach.test(ExpressionElement, {
        str: "null",
        result: {
            element: {
                null: true
            }
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
        str: "true",
        result: {
            element: {
                boolean: true
            }
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
        str: "1",
        result: {
            element: {
                number: "1"
            }
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
        str: "b'0011'",
        result: {
            element: {
                content: "0011"
            }
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
        str: "$body$some code$body$",
        result: {
            element: {
                content: "some code"
            }
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
        str: "'string'",
        result: {
            element: {
                content: "string"
            }
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
        str: "$var",
        result: {
            element: {
                name: "var"
            }
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
        str: "public.table.column",
        result: {
            element: {
                star: false,
                link: [
                    {
                        word: "public",
                        content: null
                    },
                    {
                        word: "table",
                        content: null
                    },
                    {
                        word: "column",
                        content: null
                    }
                ]
            }
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
        str: "public.table.*",
        options: {availableStar: true},
        result: {
            element: {
                star: true,
                link: [
                    {
                        word: "public",
                        content: null
                    },
                    {
                        word: "table",
                        content: null
                    }
                ]
            }
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
        str: "*",
        options: {availableStar: true},
        result: {
            element: {
                star: true,
                link: []
            }
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
        str: "cast(1 as numeric( 12, 12 ))",
        result: {
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

    GrapeQLCoach.test(ExpressionElement, {
        str: "array[1]",
        result: {
            element: {array: [
                {elements: [
                    {number: "1"}
                ]}
            ]}
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
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

    GrapeQLCoach.test(ExpressionElement, {
        str: "case when true then 1 else 0 end",
        result: {
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

    GrapeQLCoach.test(ExpressionElement, {
        str: "extract(week FROM $$2000-12-16 12:21:13$$)",
        result: {
            element: {
                field: "week",
                type: null,
                source: {elements: [
                    {content: "2000-12-16 12:21:13"}
                ]}
            }
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
        str: "substring( company.name from 1 for 5)",
        result: {
            element: {
                str: {elements: [{
                    star: false,
                    link: [
                        {word: "company", content: null},
                        {word: "name", content: null}
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

    GrapeQLCoach.test(ExpressionElement, {
        str: "now()",
        result: {
            element: {
                function: {
                    star: false,
                    link: [
                        {word: "now", content: null}
                    ]
                },
                all: null,
                distinct: null,
                arguments: [],
                where: null,
                orderBy: null,
                within: null,
                over: null,
                emptyOver: null
            }
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
        str: "interval '2 years 13 months'",
        result: {
            element: {
                interval: {
                    content: "2 years 13 months"
                }
            }
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
        str: "exists(select)",
        result: {
            element: {
                exists: {
                    with: null,
                    columns: null,
                    from: null,
                    where: null,
                    groupBy: null,
                    having: null,
                    window: null,
                    orderBy: null,
                    union: null,
                    offset: null,
                    offsetRow: null,
                    offsetRows: null,
                    limit: null,
                    fetch: null
                }
            }
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
        str: "any(select)",
        result: {
            element: {
                type: "any",
                array: null,
                select: {
                    with: null,
                    columns: null,
                    from: null,
                    where: null,
                    groupBy: null,
                    having: null,
                    window: null,
                    orderBy: null,
                    union: null,
                    offset: null,
                    offsetRow: null,
                    offsetRows: null,
                    limit: null,
                    fetch: null
                }
            }
        }
    });

    GrapeQLCoach.test(ExpressionElement, {
        str: "in( 1 + 1 )",
        result: {
            element: {
                inSelect: null,
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
