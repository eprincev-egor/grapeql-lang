"use strict";

const SelectFetch = require("../../lib/syntax/SelectFetch");
const testSyntax = require("../testSyntax");

describe("SelectFetch", () => {

    testSyntax(SelectFetch, {
        str: "fetch first row only",
        result: {
            first: true,
            next: null,
            row: true,
            rows: null,
            count: null
        }
    });

    testSyntax(SelectFetch, {
        str: "fetch next row only",
        result: {
            first: null,
            next: true,
            row: true,
            rows: null,
            count: null
        }
    });

    testSyntax(SelectFetch, {
        str: "fetch next 5 rows only",
        result: {
            first: null,
            next: true,
            row: null,
            rows: true,
            count: 5
        }
    });

});