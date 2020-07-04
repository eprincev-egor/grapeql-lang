
import {testSyntax} from "../testSyntax";
import {GroupByElement} from "../../lib/syntax/GroupByElement";

describe("GroupByElement", () => {

    testSyntax(GroupByElement, {
        str: "id",
        shouldBe: {

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

            groupingSets: [
                {

                    expression: {elements: [
                        {star: false, link: [
                            {word: "brand"}
                        ]}
                    ]}
                },
                {

                    expression: {elements: [
                        {star: false, link: [
                            {word: "size"}
                        ]}
                    ]}
                },
                {

                    isEmpty: true
                }
            ]
        }
    });

    testSyntax(GroupByElement, {
        str: "cube ( brand, (size, 1) )",
        shouldBe: {

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
