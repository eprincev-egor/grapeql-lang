"use strict";

const Select = require("../../lib/syntax/Select");
const testSyntax = require("../testSyntax");

describe("Select", () => {

    testSyntax(Select, {
        str: "select",
        result: {
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
    });

    testSyntax(Select, {
        str: "select 1, 2, 3",
        result: {
            with: null,
            columns: [
                {
                    expression: {elements: [
                        {number: "1"}
                    ]},
                    as: null
                },
                {
                    expression: {elements: [
                        {number: "2"}
                    ]},
                    as: null
                },
                {
                    expression: {elements: [
                        {number: "3"}
                    ]},
                    as: null
                }
            ],
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
    });

    testSyntax(Select, {
        str: "select 1 where false",
        result: {
            with: null,
            columns: [
                {
                    expression: {elements: [
                        {number: "1"}
                    ]},
                    as: null
                }
            ],
            from: null,
            where: {elements: [
                {boolean: false}
            ]},
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
    });
});
