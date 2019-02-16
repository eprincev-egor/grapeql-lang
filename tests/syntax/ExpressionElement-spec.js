"use strict";

const GrapeQLCoach = require("../../lib/GrapeQLCoach");
const assert = require("assert");
const ExpressionElement = require("../../lib/syntax/ExpressionElement");
const testSyntax = require("../testSyntax");

describe("ExpressionElement", () => {

    testSyntax(ExpressionElement, {
        str: "null",
        result: {
            element: {
                null: true
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "true",
        result: {
            element: {
                boolean: true
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "1",
        result: {
            element: {
                number: "1"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "b'0011'",
        result: {
            element: {
                content: "0011"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "$body$some code$body$",
        result: {
            element: {
                content: "some code"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "'string'",
        result: {
            element: {
                content: "string"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "$var",
        result: {
            element: {
                name: "var"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "numeric(14, 2)",
        result: {
            element: {
                type: "numeric(14,2)"
            }
        }
    });

    testSyntax(ExpressionElement, {
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

    testSyntax(ExpressionElement, {
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

    testSyntax(ExpressionElement, {
        str: "cast(1 as numeric( 12, 12 ))",
        result: {
            element: {
                dataType: {
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
        result: {
            element: {items: [
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

    testSyntax(ExpressionElement, {
        str: "bigint",
        result: {
            element: {
                type: "bigint"
            }
        }
    });

    it("error on empty string", () => {
        assert.throws(
            () => {
                let coach = new GrapeQLCoach("");
                coach.parseExpressionElement();
            },
            err =>
                /expected any expression element/.test( err.message )
        );
    });

    testSyntax(ExpressionElement, {
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

});
