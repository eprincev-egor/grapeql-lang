
import Constraint from "../../lib/syntax/Constraint";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("Constraint", () => {

    GrapeQLCoach.test(Constraint, {
        str: "constraint test",
        result: {
            column: null,
            name: {
                word: "test",
                content: null
            }
        }
    });
    
});
