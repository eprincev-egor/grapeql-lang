"use strict";

const index = require("../lib/index");
const assert = require("assert");
const testSyntax = require("./testSyntax");

describe("index tests", () => {
    
    it("index has GrapeQLCoach", () => {
        assert.ok( index.GrapeQLCoach );
    });

    it("testSyntax without str", () => {
        assert.throws(
            () => {
                testSyntax(index.GrapeQLCoach.PgNull, {
                    
                });
            },
            err =>
                err.message == "test.str required"
        );
    });

    it("testSyntax without result", () => {
        assert.throws(
            () => {
                testSyntax(index.GrapeQLCoach.PgNull, {
                    str: "null"
                });
            },
            err =>
                err.message == "test.result or test.error required"
        );
    });
    
});