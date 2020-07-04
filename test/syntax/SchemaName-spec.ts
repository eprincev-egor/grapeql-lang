
import {testSyntax} from "../testSyntax";
import {SchemaName} from "../../lib/syntax/SchemaName";

describe("SchemaName", () => {

    testSyntax(SchemaName, {
        str: "x",
        shouldBe: {
            schema: "public",
            name: "x"
        }
    });

    testSyntax(SchemaName, {
        str: "x.y",
        shouldBe: {
            schema: "x",
            name: "y"
        }
    });

    testSyntax(SchemaName, {
        str: "x.y.z",
        error: /invalid name x\.y\.z/
    });

});
