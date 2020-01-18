
import PrimaryKeyConstraint from "../../lib/syntax/PrimaryKeyConstraint";
import testSyntax from "../testSyntax";

describe("PrimaryKeyConstraint", () => {
    
    testSyntax(PrimaryKeyConstraint, {
        str: "constraint test primary key (id)",
        result: {
            name: {
                word: "test",
                content: null
            },
            primaryKey: [{
                word: "id",
                content: null
            }]
        }
    });
    
});
