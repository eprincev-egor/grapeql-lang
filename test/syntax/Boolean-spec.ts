
import {testSyntax} from "../testSyntax";
import {Boolean} from "../../lib/syntax/Boolean";

describe("Boolean", () => {

    testSyntax(Boolean, {
        str: "true",
        shouldBe: {
            boolean: true
        }
    });

    testSyntax(Boolean, {
        str: "false",
        shouldBe: {
            boolean: false
        }
    });

    testSyntax(Boolean, {
        str: "fAlse",
        shouldBe: {
            boolean: false
        }
    });

    testSyntax(Boolean, {
        str: "  TRUE ",
        shouldBe: {
            boolean: true
        }
    });

    testSyntax(Boolean, {
        str: "true1",
        error: /SyntaxError/
    });

});
