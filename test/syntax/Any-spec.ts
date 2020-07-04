
import {GrapeQLCoach} from "../../lib/GrapeQLCoach";
import {testSyntax} from "../testSyntax";
import {Any} from "../../lib/syntax/Any";
import assert from "assert";

describe("Any", () => {

    testSyntax(Any, {
        str: "any( select )",
        shouldBe: {
            type: "any",
            array: null,
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
            }
        }
    });

    testSyntax(Any, {
        str: "some( select )",
        shouldBe: {
            type: "some",
            array: null,
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
            }
        }
    });

    testSyntax(Any, {
        str: "all( select )",
        shouldBe: {
            type: "all",
            array: null,
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
            }
        }
    });

    
    testSyntax(Any, {
        str: "any( array[] )",
        shouldBe: {
            type: "any",
            array: {elements: [
                {array: []}
            ]},
            select: null
        }
    });

    testSyntax(Any, {
        str: "some( array[] )",
        shouldBe: {
            type: "some",
            array: {elements: [
                {array: []}
            ]},
            select: null
        }
    });

    testSyntax(Any, {
        str: "all( array[] )",
        shouldBe: {
            type: "all",
            array: {elements: [
                {array: []}
            ]},
            select: null
        }
    });


    it("Any.is(something wrong)", () => {
        const coach = new GrapeQLCoach("all 1");

        assert.strictEqual(
            coach.is(Any),
            false
        );
    });

});
