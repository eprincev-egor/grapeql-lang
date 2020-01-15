

import SchemaTable from "../../lib/syntax/SchemaTable";
import testSyntax from "../testSyntax";

describe("SchemaTable", () => {

    testSyntax(SchemaTable, {
        str: "x",
        result: {
            schema: "public",
            table: "x"
        }
    });

    testSyntax(SchemaTable, {
        str: "x.y",
        result: {
            schema: "x",
            table: "y"
        }
    });

    testSyntax(SchemaTable, {
        str: "x.y.z",
        error: /invalid name x\.y\.z/
    });

});
