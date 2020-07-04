
import {testSyntax} from "../testSyntax";
import {PgNumber} from "../../lib/syntax/PgNumber";

describe("PgNumber", () => {

    testSyntax(PgNumber, {
        str: "1",
        shouldBe: {number: "1"}
    });
    
    testSyntax(PgNumber, {
        str: "1234567890",
        shouldBe: {number: "1234567890"}
    });

    testSyntax(PgNumber, {
        str: "3.2",
        shouldBe: {number: "3.2"}
    });

    testSyntax(PgNumber, {
        str: "5e2",
        shouldBe: {number: "5e2"}
    });

    testSyntax(PgNumber, {
        str: ".001",
        shouldBe: {number: ".001"}
    });

    testSyntax(PgNumber, {
        str: "1.925e-3",
        shouldBe: {number: "1.925e-3"}
    });

    testSyntax(PgNumber, {
        str: "1.925e+3",
        shouldBe: {number: "1.925e+3"}
    });

});
