
import {testSyntax} from "../testSyntax";
import {FilePathElement} from "../../lib/syntax/FilePathElement";

describe("FilePathElement", () => {

    testSyntax(FilePathElement, {
        str: "Order",
        result: {
            name: "Order",
            content: null
        }
    });

    testSyntax(FilePathElement, {
        str: "\"sOme\"",
        result: {
            name: null,
            content: "sOme"
        }
    });

    testSyntax(FilePathElement, {
        str: ")",
        error: /expected file path/
    });

});
