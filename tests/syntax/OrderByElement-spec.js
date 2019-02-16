"use strict";

const OrderByElement = require("../../lib/syntax/OrderByElement");
const testSyntax = require("../testSyntax");

describe("OrderByElement", () => {

    testSyntax(OrderByElement, {
        str: "id",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: "asc",
            using: null,
            nulls: null
        }
    });

    testSyntax(OrderByElement, {
        str: "id asc",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: "asc",
            using: null,
            nulls: null
        }
    });

    testSyntax(OrderByElement, {
        str: "id desc",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: "desc",
            using: null,
            nulls: null
        }
    });

    testSyntax(OrderByElement, {
        str: "id using >",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: null,
            using: {operator: ">"},
            nulls: null
        }
    });

    testSyntax(OrderByElement, {
        str: "id using <",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: null,
            using: {operator: "<"},
            nulls: null
        }
    });

    testSyntax(OrderByElement, {
        str: "id nulls first",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: "asc",
            using: null,
            nulls: "first"
        }
    });

    testSyntax(OrderByElement, {
        str: "id nulls last",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: "asc",
            using: null,
            nulls: "last"
        }
    });

    testSyntax(OrderByElement, {
        str: "id desc nulls first",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: "desc",
            using: null,
            nulls: "first"
        }
    });

    testSyntax(OrderByElement, {
        str: "id desc nulls last",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: "desc",
            using: null,
            nulls: "last"
        }
    });

    testSyntax(OrderByElement, {
        str: "id using > nulls last",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: null,
            using: {operator: ">"},
            nulls: "last"
        }
    });

});
