
import {testSyntax} from "../testSyntax";
import {WithQuery} from "../../lib/syntax/WithQuery";

describe("WithQuery", () => {

    testSyntax(WithQuery, {
        str: `items as (
            select
        )`,
        shouldBe: {
            name: {word: "items"},
            select: {
            }
        }
    });

    testSyntax(WithQuery, {
        str: `items as (
            values
                (1, 2),
                (3, 4)
        )`,
        shouldBe: {
            name: {word: "items"},
            values: [
                {values: [
                    {
                        value: {elements: [
                            {number: "1"}
                        ]}
                    },
                    {
                        value: {elements: [
                            {number: "2"}
                        ]}
                    }
                ]},
                {values: [
                    {
                        value: {elements: [
                            {number: "3"}
                        ]}
                    },
                    {
                        value: {elements: [
                            {number: "4"}
                        ]}
                    }
                ]}
            ]
        }
    });
    
    testSyntax(WithQuery, {
        str: `items (id, code) as (
            values
                (1, 2),
                (3, 4)
        )`,
        shouldBe: {
            name: {word: "items"},
            columns: [
                {word: "id"},
                {word: "code"}
            ],
            values: [
                {values: [
                    {
                        value: {elements: [
                            {number: "1"}
                        ]}
                    },
                    {
                        value: {elements: [
                            {number: "2"}
                        ]}
                    }
                ]},
                {values: [
                    {
                        value: {elements: [
                            {number: "3"}
                        ]}
                    },
                    {
                        value: {elements: [
                            {number: "4"}
                        ]}
                    }
                ]}
            ]
        }
    });

    testSyntax(WithQuery, {
        str: `items as (
            values
                (1, 2, 3),
                (4, 5)
        )`,
        error: /VALUES lists must all be the same length/
    });

    testSyntax(WithQuery, {
        str: `items as (
            values
                (1, 2, 3),
                (4, 5, default)
        )`,
        error: /DEFAULT is not allowed in this context/
    });
    
});
