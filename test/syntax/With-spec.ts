
import {testSyntax} from "../testSyntax";
import {With} from "../../lib/syntax/With";

describe("With", () => {

    testSyntax(With, {
        str: `with items as (
            select
        )`,
        shouldBe: {
            recursive: null,
            queries: [
                {
                    name: {word: "items"},
                    columns: null,
                    select: {
                        with: null,
                        columns: null,
                        into: null,
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
        shouldBe: {
            recursive: true,
            queries: [
                {
                    name: {word: "items"},
                    columns: null,
                    select: {
                        with: null,
                        columns: null,
                        into: null,
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

    testSyntax(With, {
        str: `with
        `,
        error: /expected: WithQuery/
    });
    
});
