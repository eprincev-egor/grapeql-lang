

import SchemaName from "../../lib/syntax/SchemaName";
import testSyntax from "../testSyntax";

describe("SchemaName", () => {

    testSyntax(SchemaName, {
        str: "x",
        result: {
            schema: "public",
            name: "x"
        }
    });

    testSyntax(SchemaName, {
        str: "x.y",
        result: {
            schema: "x",
            name: "y"
        }
    });

    testSyntax(SchemaName, {
        str: "x.y.z",
        error: /invalid name x\.y\.z/
    });

});
