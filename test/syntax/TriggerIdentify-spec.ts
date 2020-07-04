
import {testSyntax} from "../testSyntax";
import {TriggerIdentify} from "../../lib/syntax/TriggerIdentify";

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
