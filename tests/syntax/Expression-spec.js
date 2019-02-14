"use strict";

const Expression = require("../../lib/syntax/Expression");
const testSyntax = require("../testSyntax");

describe("Expression", () => {

    testSyntax(Expression, {
        str: "1+1",
        result: {
            elements: [
                {number: "1"},
                {operator: "+"},
                {number: "1"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "1 + 1",
        result: {
            elements: [
                {number: "1"},
                {operator: "+"},
                {number: "1"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "(1+1)",
        result: {
            elements: [
                {number: "1"},
                {operator: "+"},
                {number: "1"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "1::text::bigint-2 ",
        result: {
            elements: [
                {number: "1"},
                {operator: "::"},
                {type: "text"},
                {operator: "::"},
                {type: "bigint"},
                {operator: "-"},
                {number: "2"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "1::1",
        error: /unknown data type/
    });

    testSyntax(Expression, {
        str: "(1)::bigint",
        result: {
            elements: [
                {
                    elements: [
                        {number: "1"}
                    ]
                },
                {operator: "::"},
                {type: "bigint"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "$user::bigint % 4",
        result: {
            elements: [
                {name: "user"},
                {operator: "::"},
                {type: "bigint"},
                {operator: "%"},
                {number: "4"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "$$test$$ || E'str'",
        result: {
            elements: [
                {content: "test"},
                {operator: "||"},
                {content: "str"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "true-false*null+1/'test'",
        result: {
            elements: [
                {boolean: true},
                {operator: "-"},
                {boolean: false},
                {operator: "*"},
                {null: true},
                {operator: "+"},
                {number: "1"},
                {operator: "/"},
                {content: "test"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "((('extrude')))",
        result: {
            elements: [
                {content: "extrude"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "(-1+2.1)*''-(('test')+8)",
        result: {
            elements: [
                {
                    elements: [
                        {operator: "-"},
                        {number: "1"},
                        {operator: "+"},
                        {number: "2.1"}
                    ]
                },
                {operator: "*"},
                {content: ""},
                {operator: "-"},
                {
                    elements: [
                        {elements: [
                            {content: "test"}
                        ]},
                        {operator: "+"},
                        {number: "8"}
                    ]
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "order.sum + Company.total",
        result: {
            elements: [
                {star: false, link: [
                    {word: "order", content: null},
                    {word: "sum", content: null}
                ]},
                {operator: "+"},
                {star: false, link: [
                    {word: "company", content: null},
                    {word: "total", content: null}
                ]}
            ]
        }
    });

    testSyntax(Expression, {
        str: "1::::bigint",
        error: /expected type/
    });

});
