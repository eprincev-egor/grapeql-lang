
import {testSyntax} from "../testSyntax";
import {OrderByElement} from "../../lib/syntax/OrderByElement";

describe("OrderByElement", () => {

    testSyntax(OrderByElement, {
        str: "id",
        shouldBe: {
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
        shouldBe: {
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
        shouldBe: {
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
        shouldBe: {
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
        shouldBe: {
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
        shouldBe: {
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
        shouldBe: {
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
        shouldBe: {
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
        shouldBe: {
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
        shouldBe: {
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
