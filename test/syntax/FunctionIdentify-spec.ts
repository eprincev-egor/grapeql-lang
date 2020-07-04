
import {testSyntax} from "../testSyntax";
import {FunctionIdentify} from "../../lib/syntax/FunctionIdentify";

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
