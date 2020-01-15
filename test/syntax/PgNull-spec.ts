

import PgNull from "../../lib/syntax/PgNull";
import testSyntax from "../testSyntax";

describe("PgNull", () => {

    testSyntax(PgNull, {
        str: "null",
        result: {null: true}
    });

    testSyntax(PgNull, {
        str: "NULL",
        result: {null: true}
    });

    testSyntax(PgNull, {
        str: "null ",
        result: {null: true}
    });

    testSyntax(PgNull, {
        str: "null1",
        error: /SyntaxError/
    });

});
