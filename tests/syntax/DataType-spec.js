"use strict";

const DataType = require("../../lib/syntax/DataType");
const testSyntax = require("../testSyntax");

describe("DataType", () => {

    testSyntax(DataType, {
        str: "Timestamp",
        result: {type: "timestamp"}
    });

    testSyntax(DataType, {
        str: "numeric  ( 10 )",
        result: {type: "numeric(10)"}
    });

    testSyntax(DataType, {
        str: "numeric ( 10, 3 )",
        result: {type: "numeric(10,3)"}
    });

    testSyntax(DataType, {
        str: "bigint[ ]",
        result: {
            type: "bigint[]"
        }
    });

    testSyntax(DataType, {
        str: "bigint [ 1 ]",
        result: {
            type: "bigint[1]"
        }
    });

    testSyntax(DataType, {
        str: "char",
        error: /SyntaxError/
    });

});
