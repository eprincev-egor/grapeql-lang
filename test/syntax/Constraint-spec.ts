
import Constraint from "../../lib/syntax/Constraint";
import testSyntax from "../testSyntax";

describe("Constraint", () => {

    testSyntax(Constraint, {
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
