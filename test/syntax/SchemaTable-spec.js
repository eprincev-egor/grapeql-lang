"use strict";

const SchemaTable = require("../../lib/syntax/SchemaTable");
const testSyntax = require("../testSyntax");

describe("SchemaTable", () => {

    testSyntax(SchemaTable, {
        str: "x",
        result: {
            schema: "public",
            table: "x"
        }
    });

    testSyntax(SchemaTable, {
        str: "x.y",
        result: {
            schema: "x",
            table: "y"
        }
    });

    testSyntax(SchemaTable, {
        str: "x.y.z",
        error: /invalid name x\.y\.z/
    });

});
