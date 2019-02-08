"use strict";

const ByteString = require("../../lib/syntax/ByteString");
const testSyntax = require("../testSyntax");

describe("ByteString", () => {

    testSyntax(ByteString, {
        str: "b'0011'",
        result: {
            content: "0011"
        }
    });

    testSyntax(ByteString, {
        str: "B'1'",
        result: {
            content: "1"
        }
    });

    testSyntax(ByteString, {
        str: "b'00112'",
        error: /byte string b'' must contain only 0 or 1/
    });

    testSyntax(ByteString, {
        str: "x'33'",
        result: {
            content: "00110011"
        }
    });

    testSyntax(ByteString, {
        str: "X'33'",
        result: {
            content: "00110011"
        }
    });

    testSyntax(ByteString, {
        str: "x'0L'",
        error: /byte string x'' must contain only digits or abcdef/
    });

});
