
import {testSyntax} from "../testSyntax";
import {File} from "../../lib/syntax/File";

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
        shouldBe: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "Order", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "./Order",
        shouldBe: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "Order", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "../Order",
        shouldBe: {
            relative: true,
            path: [
                {name: "..", content: null},
                {name: "Order", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "file Order.sql",
        shouldBe: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "Order.sql", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "file \" nice \"",
        shouldBe: {
            relative: true,
            path: [
                {name: ".", content: null},
                {content: " nice ", name: null}
            ]
        }
    });

    testSyntax(File, {
        str: "file some / file on",
        shouldBe: {
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
        shouldBe: {
            relative: false,
            path: [
                {name: "root.sql", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "/root.sql",
        shouldBe: {
            relative: false,
            path: [
                {name: "root.sql", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "file ./company",
        shouldBe: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "company", content: null}
            ]
        }
    });

    testSyntax(File, {
        str: "./Country)",
        shouldBe: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "Country", content: null}
            ]
        }
    });

});
