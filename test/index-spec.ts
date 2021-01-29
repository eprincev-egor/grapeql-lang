
import * as index from "../lib/index";
import assert from "assert";
import {testSyntax} from "./testSyntax";

describe("index tests", () => {
    
    it("index has GrapeQLCoach", () => {
        assert.ok( index.GrapeQLCoach );
    });

    it("index has all syntaxes", () => {
        const coach = new index.GrapeQLCoach("");
        
        for (const syntaxName in coach.syntax) {
            assert.ok(syntaxName in index);
        }
    });

    it("testSyntax without str", () => {
        assert.throws(
            () => {
                testSyntax(index.PgNull, {
                    
                } as any);
            },
            (err: Error) =>
                err.message === "str required"
        );
    });

    it("testSyntax without result", () => {
        assert.throws(
            () => {
                testSyntax(index.PgNull, {
                    str: "null"
                } as any);
            },
            (err: Error) =>
                err.message === "'shouldBe' or 'error' required"
        );
    });
    
});
