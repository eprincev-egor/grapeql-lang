
import FunctionIdentify from "../../lib/syntax/FunctionIdentify";
import testSyntax from "../testSyntax";

describe("FunctionIdentify", () => {

    testSyntax(FunctionIdentify, {
        str: "public.func()",
        result: {
            name: "func",
            schema: "public",
            args: []
        }
    });

});
