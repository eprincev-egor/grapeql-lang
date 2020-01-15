

import PgNumber from "../../lib/syntax/PgNumber";
import testSyntax from "../testSyntax";

describe("PgNumber", () => {

    testSyntax(PgNumber, {
        str: "1",
        result: {number: "1"}
    });
    
    testSyntax(PgNumber, {
        str: "1234567890",
        result: {number: "1234567890"}
    });

    testSyntax(PgNumber, {
        str: "3.2",
        result: {number: "3.2"}
    });

    testSyntax(PgNumber, {
        str: "5e2",
        result: {number: "5e2"}
    });

    testSyntax(PgNumber, {
        str: ".001",
        result: {number: ".001"}
    });

    testSyntax(PgNumber, {
        str: "1.925e-3",
        result: {number: "1.925e-3"}
    });

    testSyntax(PgNumber, {
        str: "1.925e+3",
        result: {number: "1.925e+3"}
    });

});
