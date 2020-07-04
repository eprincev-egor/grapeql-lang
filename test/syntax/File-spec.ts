
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
                {name: "."},
                {name: "Order"}
            ]
        }
    });

    testSyntax(File, {
        str: "./Order",
        shouldBe: {
            relative: true,
            path: [
                {name: "."},
                {name: "Order"}
            ]
        }
    });

    testSyntax(File, {
        str: "../Order",
        shouldBe: {
            relative: true,
            path: [
                {name: ".."},
                {name: "Order"}
            ]
        }
    });

    testSyntax(File, {
        str: "file Order.sql",
        shouldBe: {
            relative: true,
            path: [
                {name: "."},
                {name: "Order.sql"}
            ]
        }
    });

    testSyntax(File, {
        str: "file \" nice \"",
        shouldBe: {
            relative: true,
            path: [
                {name: "."},
                {content: " nice ", name: null}
            ]
        }
    });

    testSyntax(File, {
        str: "file some / file on",
        shouldBe: {
            relative: true,
            path: [
                {name: "."},
                {name: "some"},
                {name: "file"}
            ]
        }
    });

    testSyntax(File, {
        str: "file /root.sql",
        shouldBe: {
            relative: false,
            path: [
                {name: "root.sql"}
            ]
        }
    });

    testSyntax(File, {
        str: "/root.sql",
        shouldBe: {
            relative: false,
            path: [
                {name: "root.sql"}
            ]
        }
    });

    testSyntax(File, {
        str: "file ./company",
        shouldBe: {
            relative: true,
            path: [
                {name: "."},
                {name: "company"}
            ]
        }
    });

    testSyntax(File, {
        str: "./Country)",
        shouldBe: {
            relative: true,
            path: [
                {name: "."},
                {name: "Country"}
            ]
        }
    });

});
