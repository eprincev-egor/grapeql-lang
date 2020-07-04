
import {testSyntax} from "../testSyntax";
import {PgNull} from "../../lib/syntax/PgNull";

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
