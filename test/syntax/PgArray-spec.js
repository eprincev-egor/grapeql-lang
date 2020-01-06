"use strict";

const PgArray = require("../../lib/syntax/PgArray");
const testSyntax = require("../testSyntax");

describe("PgArray", () => {

    testSyntax(PgArray, {
        str: "ARRAY[]",
        result: {array: []}
    });

    testSyntax(PgArray, {
        str: "arraY[]",
        result: {array: []}
    });

    testSyntax(PgArray, {
        str: "array[1]",
        result: {array: [
            {elements: [
                {number: "1"}
            ]}
        ]}
    });

    testSyntax(PgArray, {
        str: "array[ '' ]",
        result: {array: [
            {elements: [
                {content: ""}
            ]}
        ]}
    });

});
