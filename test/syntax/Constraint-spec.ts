
import Constraint from "../../lib/syntax/Constraint";
import testSyntax from "../testSyntax";

describe("Constraint", () => {

    testSyntax(Constraint, {
        str: "constraint test",
        result: {
            name: {
                word: "test",
                content: null
            }
        }
    });
    
});
