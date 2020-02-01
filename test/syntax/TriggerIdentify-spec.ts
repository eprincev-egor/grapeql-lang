
import TriggerIdentify from "../../lib/syntax/TriggerIdentify";
import testSyntax from "../testSyntax";

describe("TriggerIdentify", () => {

    testSyntax(TriggerIdentify, {
        str: "some_trigger on public.company",
        result: {
            name: "some_trigger",
            schema: "public",
            table: "company"
        }
    });

});
