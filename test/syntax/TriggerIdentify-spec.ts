
import TriggerIdentify from "../../lib/syntax/TriggerIdentify";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("TriggerIdentify", () => {

    GrapeQLCoach.test(TriggerIdentify, {
        str: "some_trigger on public.company",
        result: {
            name: "some_trigger",
            schema: "public",
            table: "company"
        }
    });

});
