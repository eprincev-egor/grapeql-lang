

import File from "../../lib/syntax/File";
import testSyntax from "../testSyntax";

describe("File", () => {

    testSyntax(File, {
        str: "file )",
        error: /expected file path/
    });

    testSyntax(File, {
        str: ")",
        error: /expected word: file/
    });

    testSyntax(File, {
        str: "file Order",
        result: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "Order", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "./Order",
        result: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "Order", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "../Order",
        result: {
            relative: true,
            path: [
                {name: "..", content: null},
                {name: "Order", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "file Order.sql",
        result: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "Order.sql", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "file \" nice \"",
        result: {
            relative: true,
            path: [
                {name: ".", content: null},
                {content: " nice ", name: null}
            ]
        }
    });

    testSyntax(File, {
        str: "file some / file on",
        result: {
            relative: true,
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
            relative: false,
            path: [
                {name: "root.sql", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "/root.sql",
        result: {
            relative: false,
            path: [
                {name: "root.sql", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "file ./company",
        result: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "company", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "./Country)",
        result: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "Country", content: null}
            ]
        }
    });

});
