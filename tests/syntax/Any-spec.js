"use strict";

const Any = require("../../lib/syntax/Any");
const GrapeQLCoach = require("../../lib/GrapeQLCoach");
const testSyntax = require("../testSyntax");
const assert = require("assert");

describe("Any", () => {

    testSyntax(Any, {
        str: "any( select )",
        result: {
            type: "any",
            array: null,
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
            }
        }
    });

    testSyntax(Any, {
        str: "some( select )",
        result: {
            type: "some",
            array: null,
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
            }
        }
    });

    testSyntax(Any, {
        str: "all( select )",
        result: {
            type: "all",
            array: null,
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
            }
        }
    });

    
    testSyntax(Any, {
        str: "any( array[] )",
        result: {
            type: "any",
            array: {elements: [
                {array: []}
            ]},
            select: null
        }
    });

    testSyntax(Any, {
        str: "some( array[] )",
        result: {
            type: "some",
            array: {elements: [
                {array: []}
            ]},
            select: null
        }
    });

    testSyntax(Any, {
        str: "all( array[] )",
        result: {
            type: "all",
            array: {elements: [
                {array: []}
            ]},
            select: null
        }
    });


    it("Any.is(something wrong)", () => {
        let coach = new GrapeQLCoach("all 1");

        assert.strictEqual(
            coach.isAny(),
            false
        );
    });

});
