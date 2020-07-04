
import {testSyntax} from "../testSyntax";
import {GroupByElement} from "../../lib/syntax/GroupByElement";

describe("GroupByElement", () => {

    testSyntax(GroupByElement, {
        str: "id",
        shouldBe: {
            isEmpty: null,
            rollup: null,
            cube: null,
            groupingSets: null,

            expression: {elements: [
                {star: false, link: [
                    {word: "id", content: null}
                ]}
            ]}
        }
    });

    testSyntax(GroupByElement, {
        str: "GROUPING SETS (brand, size, ( ))",
        shouldBe: {
            isEmpty: null,
            rollup: null,
            cube: null,
            expression: null,

            groupingSets: [
                {
                    isEmpty: null,
                    rollup: null,
                    cube: null,
                    groupingSets: null,

                    expression: {elements: [
                        {star: false, link: [
                            {word: "brand", content: null}
                        ]}
                    ]}
                },
                {
                    isEmpty: null,
                    rollup: null,
                    cube: null,
                    groupingSets: null,

                    expression: {elements: [
                        {star: false, link: [
                            {word: "size", content: null}
                        ]}
                    ]}
                },
                {
                    rollup: null,
                    cube: null,
                    groupingSets: null,
                    expression: null,

                    isEmpty: true
                }
            ]
        }
    });

    testSyntax(GroupByElement, {
        str: "cube ( brand, (size, 1) )",
        shouldBe: {
            
            isEmpty: null,
            rollup: null,
            groupingSets: null,
            expression: null,

            cube: [
                {
                    single: true,
                    expressions: [
                        {elements: [
                            {star: false, link: [
                                {word: "brand", content: null}
                            ]}
                        ]}
                    ]
                },
                {
                    single: false,
                    expressions: [
                        {elements: [
                            {star: false, link: [
                                {word: "size", content: null}
                            ]}
                        ]},
                        {elements: [
                            {number: "1"}
                        ]}
                    ]
                }
            ]
        }
    });

    testSyntax(GroupByElement, {
        str: "rollup ( brand, (size, 1) )",
        shouldBe: {
            
            isEmpty: null,
            cube: null,
            groupingSets: null,
            expression: null,

            rollup: [
                {
                    single: true,
                    expressions: [
                        {elements: [
                            {star: false, link: [
                                {word: "brand", content: null}
                            ]}
                        ]}
                    ]
                },
                {
                    single: false,
                    expressions: [
                        {elements: [
                            {star: false, link: [
                                {word: "size", content: null}
                            ]}
                        ]},
                        {elements: [
                            {number: "1"}
                        ]}
                    ]
                }
            ]
        }
    });

});
