
import {testSyntax} from "../testSyntax";
import {FunctionIdentify} from "../../lib/syntax/FunctionIdentify";

describe("FunctionIdentify", () => {

    testSyntax(FunctionIdentify, {
        str: "public.func()",
        shouldBe: {
            name: "func",
            schema: "public",
            args: []
        }
    });

});
