
import CaseWhenElement from "../../lib/syntax/CaseWhenElement";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("CaseWhenElement", () => {

    GrapeQLCoach.test(CaseWhenElement, {
        str: "when true then 1",
        result: {
            when: {elements: [{boolean: true}]},
            then: {elements: [{number: "1"}]}
        }
    });

});
