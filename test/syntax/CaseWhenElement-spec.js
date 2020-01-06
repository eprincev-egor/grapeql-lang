"use strict";

const CaseWhenElement = require("../../lib/syntax/CaseWhenElement");
const testSyntax = require("../testSyntax");

describe("CaseWhenElement", () => {

    testSyntax(CaseWhenElement, {
        str: "when true then 1",
        result: {
            when: {elements: [{boolean: true}]},
            then: {elements: [{number: "1"}]}
        }
    });

});
