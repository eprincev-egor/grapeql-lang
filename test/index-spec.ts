
import index from "../lib/index";
import assert from "assert";
import testSyntax from "./testSyntax";

describe("index tests", () => {
    
    it("index has GrapeQLCoach", () => {
        assert.ok( index.GrapeQLCoach );
    });

    it("testSyntax without str", () => {
        assert.throws(
            () => {
                testSyntax(index.PgNull, {
                    
                });
            },
            (err) =>
                err.message === "test.str required"
        );
    });

    it("testSyntax without result", () => {
        assert.throws(
            () => {
                testSyntax(index.PgNull, {
                    str: "null"
                });
            },
            (err) =>
                err.message === "test.result or test.error required"
        );
    });
    
});
