"use strict";

const PgNull = require("../../lib/syntax/PgNull");
const testSyntax = require("../testSyntax");

describe("PgNull", () => {

    testSyntax(PgNull, {
        str: "null",
        result: {null: true}
    });

    testSyntax(PgNull, {
        str: "NULL",
        result: {null: true}
    });

    testSyntax(PgNull, {
        str: "null ",
        result: {null: true}
    });

    testSyntax(PgNull, {
        str: "null1",
        error: /SyntaxError/
    });

});
