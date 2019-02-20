"use strict";

const With = require("../../lib/syntax/With");
const testSyntax = require("../testSyntax");

describe("With", () => {

    testSyntax(With, {
        str: `with items as (
            select
        )`,
        result: {
            recursive: null,
            queries: [
                {
                    name: {word: "items", content: null},
                    columns: null,
                    select: {
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
                    },
                    values: null
                }
            ]
        }
    });

    testSyntax(With, {
        str: `with recursive items as (
            select
        )`,
        result: {
            recursive: true,
            queries: [
                {
                    name: {word: "items", content: null},
                    columns: null,
                    select: {
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
                    },
                    values: null
                }
            ]
        }
    });

    testSyntax(With, {
        str: `with
            a as (select),
            a as (select)
        `,
        error: /WITH query name "a" specified more than once/
    });

    
});
