
import {testSyntax} from "../testSyntax";
import {Constraint} from "../../lib/syntax/Constraint";

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
