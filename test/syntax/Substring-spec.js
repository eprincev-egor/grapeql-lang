"use strict";

const Substring = require("../../lib/syntax/Substring");
const testSyntax = require("../testSyntax");

describe("Substring", () => {

    testSyntax(Substring, {
        str: "substring('test' from 1)",
        result: {
            str: {elements: [{
                content: "test"
            }]},
            from: {elements: [{
                number: "1"
            }]},
            for: null
        }
    });

    testSyntax(Substring, {
        str: "substring('test' for 2)",
        result: {
            str: {elements: [{
                content: "test"
            }]},
            for: {elements: [{
                number: "2"
            }]},
            from: null
        }
    });

    testSyntax(Substring, {
        str: "substring('123456' from 2 for 3)",
        result: {
            str: {elements: [{
                content: "123456"
            }]},
            from: {elements: [{
                number: "2"
            }]},
            for: {elements: [{
                number: "3"
            }]}
        }
    });

});