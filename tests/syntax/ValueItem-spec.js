"use strict";

const ValueItem = require("../../lib/syntax/ValueItem");
const testSyntax = require("../testSyntax");

describe("ValueItem", () => {

    testSyntax(ValueItem, {
        str: "default",
        result: {
            expression: null,
            default: true
        }
    });

    testSyntax(ValueItem, {
        str: "1",
        result: {
            expression: {elements: [
                {number: "1"}
            ]},
            default: null
        }
    });

});
