
import {testSyntax} from "../testSyntax";
import {PgArray} from "../../lib/syntax/PgArray";

describe("PgArray", () => {

    testSyntax(PgArray, {
        str: "ARRAY[]",
        shouldBe: {array: []}
    });

    testSyntax(PgArray, {
        str: "arraY[]",
        shouldBe: {array: []}
    });

    testSyntax(PgArray, {
        str: "array[1]",
        shouldBe: {array: [
            {elements: [
                {number: "1"}
            ]}
        ]}
    });

    testSyntax(PgArray, {
        str: "array[ '' ]",
        shouldBe: {array: [
            {elements: [
                {content: ""}
            ]}
        ]}
    });

});
