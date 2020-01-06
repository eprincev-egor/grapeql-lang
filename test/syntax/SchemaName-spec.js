"use strict";

const SchemaName = require("../../lib/syntax/SchemaName");
const testSyntax = require("../testSyntax");

describe("SchemaName", () => {

    testSyntax(SchemaName, {
        str: "x",
        result: {
            schema: "public",
            name: "x"
        }
    });

    testSyntax(SchemaName, {
        str: "x.y",
        result: {
            schema: "x",
            name: "y"
        }
    });

    testSyntax(SchemaName, {
        str: "x.y.z",
        error: /invalid name x\.y\.z/
    });

});
