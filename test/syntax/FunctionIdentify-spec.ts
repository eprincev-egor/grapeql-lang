
import FunctionIdentify from "../../lib/syntax/FunctionIdentify";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("FunctionIdentify", () => {

    GrapeQLCoach.test(FunctionIdentify, {
        str: "public.func()",
        result: {
            name: "func",
            schema: "public",
            args: []
        }
    });

});
