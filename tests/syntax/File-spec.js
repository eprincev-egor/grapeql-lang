"use strict";

const File = require("../../lib/syntax/File");
const testSyntax = require("../testSyntax");

describe("File", () => {

    testSyntax(File, {
        str: "file Order",
        result: {
            path: [
                {name: ".", content: null},
                {name: "Order", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "./Order",
        result: {
            path: [
                {name: ".", content: null},
                {name: "Order", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "../Order",
        result: {
            path: [
                {name: "..", content: null},
                {name: "Order", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "file Order.sql",
        result: {
            path: [
                {name: ".", content: null},
                {name: "Order.sql", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "file \" nice \"",
        result: {
            path: [
                {name: ".", content: null},
                {content: " nice ", name: null}
            ]
        }
    });

    testSyntax(File, {
        str: "file some / file on",
        result: {
            path: [
                {name: ".", content: null},
                {name: "some", content: null},
                {name: "file", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "file /root.sql",
        result: {
            path: [
                {name: "root.sql", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "/root.sql",
        result: {
            path: [
                {name: "root.sql", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "file ./company",
        result: {
            path: [
                {name: ".", content: null},
                {name: "company", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "./Country)",
        result: {
            path: [
                {name: ".", content: null},
                {name: "Country", content: null}
            ]
        }
    });

});
