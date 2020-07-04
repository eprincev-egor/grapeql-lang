
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
                        {word: "id"}
                    ]
                }
            ]},
            vector: "asc"
        }
    });

    testSyntax(OrderByElement, {
        str: "id asc",
        shouldBe: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id"}
                    ]
                }
            ]},
            vector: "asc"
        }
    });

    testSyntax(OrderByElement, {
        str: "id desc",
        shouldBe: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id"}
                    ]
                }
            ]},
            vector: "desc"
        }
    });

    testSyntax(OrderByElement, {
        str: "id using >",
        shouldBe: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id"}
                    ]
                }
            ]},
            using: {operator: ">"}
        }
    });

    testSyntax(OrderByElement, {
        str: "id using <",
        shouldBe: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id"}
                    ]
                }
            ]},
            using: {operator: "<"}
        }
    });

    testSyntax(OrderByElement, {
        str: "id nulls first",
        shouldBe: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id"}
                    ]
                }
            ]},
            vector: "asc",
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
                        {word: "id"}
                    ]
                }
            ]},
            vector: "asc",
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
                        {word: "id"}
                    ]
                }
            ]},
            vector: "desc",
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
                        {word: "id"}
                    ]
                }
            ]},
            vector: "desc",
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
                        {word: "id"}
                    ]
                }
            ]},
            using: {operator: ">"},
            nulls: "last"
        }
    });

});
