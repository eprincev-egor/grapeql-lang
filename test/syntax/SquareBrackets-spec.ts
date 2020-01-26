
import SquareBrackets from "../../lib/syntax/SquareBrackets";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("SquareBrackets", () => {

    GrapeQLCoach.test(SquareBrackets, {
        str: "[1]",
        result: {
            content: {elements: [
                {number: "1"}
            ]}
        }
    });

});
