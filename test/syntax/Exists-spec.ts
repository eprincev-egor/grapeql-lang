
import {testSyntax} from "../testSyntax";
import {Exists} from "../../lib/syntax/Exists";

describe("Exists", () => {

    testSyntax(Exists, {
        str: "exists( select )",
        shouldBe: {
            exists: {
            }
        }
    });

});
