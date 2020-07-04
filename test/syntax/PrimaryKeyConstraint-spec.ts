
import {testSyntax} from "../testSyntax";
import {PrimaryKeyConstraint} from "../../lib/syntax/PrimaryKeyConstraint";

describe("PrimaryKeyConstraint", () => {
    
    testSyntax(PrimaryKeyConstraint, {
        str: "constraint test primary key (id)",
        shouldBe: {
            name: {
                word: "test"
            },
            primaryKey: [{
                word: "id"
            }]
        }
    });
    
    testSyntax(PrimaryKeyConstraint, {
        str: "primary key",
        options: {
            column: {
                word: "id"
            }
        },
        shouldBe: {
            column: {
                word: "id"
            },
            primaryKey: [{
                word: "id"
            }]
        }
    });
    
});
