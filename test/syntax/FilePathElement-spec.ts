
import {testSyntax} from "../testSyntax";
import {FilePathElement} from "../../lib/syntax/FilePathElement";

describe("FilePathElement", () => {

    testSyntax(FilePathElement, {
        str: "Order",
        shouldBe: {
            name: "Order",
            content: null
        }
    });

    testSyntax(FilePathElement, {
        str: "\"sOme\"",
        shouldBe: {
            name: null,
            content: "sOme"
        }
    });

    testSyntax(FilePathElement, {
        str: ")",
        error: /expected file path/
    });

});
