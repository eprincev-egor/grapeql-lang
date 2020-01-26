
import ValueItem from "../../lib/syntax/ValueItem";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("ValueItem", () => {

    GrapeQLCoach.test(ValueItem, {
        str: "default",
        result: {
            value: null,
            default: true
        }
    });

    GrapeQLCoach.test(ValueItem, {
        str: "1",
        result: {
            value: {elements: [
                {number: "1"}
            ]},
            default: null
        }
    });

});
