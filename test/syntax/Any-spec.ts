
import {GrapeQLCoach} from "../../lib/GrapeQLCoach";
import {testSyntax} from "../testSyntax";
import {Any} from "../../lib/syntax/Any";
import assert from "assert";

describe("Any", () => {

    testSyntax(Any, {
        str: "any( select )",
        shouldBe: {
            type: "any",
            select: {
            }
        }
    });

    testSyntax(Any, {
        str: "some( select )",
        shouldBe: {
            type: "some",
            select: {
            }
        }
    });

    testSyntax(Any, {
        str: "all( select )",
        shouldBe: {
            type: "all",
            select: {
            }
        }
    });

    
    testSyntax(Any, {
        str: "any( array[] )",
        shouldBe: {
            type: "any",
            array: {elements: [
                {array: []}
            ]}
        }
    });

    testSyntax(Any, {
        str: "some( array[] )",
        shouldBe: {
            type: "some",
            array: {elements: [
                {array: []}
            ]}
        }
    });

    testSyntax(Any, {
        str: "all( array[] )",
        shouldBe: {
            type: "all",
            array: {elements: [
                {array: []}
            ]}
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
