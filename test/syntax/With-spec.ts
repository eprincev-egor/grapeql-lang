
import {testSyntax} from "../testSyntax";
import {With} from "../../lib/syntax/With";

describe("With", () => {

    testSyntax(With, {
        str: `with items as (
            select
        )`,
        shouldBe: {
            queries: [
                {
                    name: {word: "items"},
                    select: {
                    }
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
                    select: {
                    }
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
