"use strict";

const SquareBrackets = require("../../lib/syntax/SquareBrackets");
const testSyntax = require("../testSyntax");

describe("SquareBrackets", () => {

    testSyntax(SquareBrackets, {
        str: "[1]",
        result: {
            content: {elements: [
                {number: "1"}
            ]}
        }
    });

});
