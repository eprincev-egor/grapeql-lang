
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
            column: null,
            primaryKey: [{
                word: "id",
                content: null
            }]
        }
    });
    
    testSyntax(PrimaryKeyConstraint, {
        str: "primary key",
        options: {
            column: {
                word: "id",
                content: null
            }
        },
        result: {
            name: null,
            column: {
                word: "id",
                content: null
            },
            primaryKey: [{
                word: "id",
                content: null
            }]
        }
    });
    
});
