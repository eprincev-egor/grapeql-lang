
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
                    {word: "id"}
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
                            {word: "brand"}
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
                            {word: "size"}
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
                                {word: "brand"}
                            ]}
                        ]}
                    ]
                },
                {
                    single: false,
                    expressions: [
                        {elements: [
                            {star: false, link: [
                                {word: "size"}
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
                                {word: "brand"}
                            ]}
                        ]}
                    ]
                },
                {
                    single: false,
                    expressions: [
                        {elements: [
                            {star: false, link: [
                                {word: "size"}
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
