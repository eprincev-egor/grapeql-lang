"use strict";

const PgArray = require("../../lib/syntax/PgArray");
const testSyntax = require("../testSyntax");

describe("PgArray", () => {

    testSyntax(PgArray, {
        str: "ARRAY[]",
        result: {items: []}
    });

    testSyntax(PgArray, {
        str: "arraY[]",
        result: {items: []}
    });

    testSyntax(PgArray, {
        str: "array[1]",
        result: {items: [
            {elements: [
                {number: "1"}
            ]}
        ]}
    });

    testSyntax(PgArray, {
        str: "array[ '' ]",
        result: {items: [
            {elements: [
                {content: ""}
            ]}
        ]}
    });

});
