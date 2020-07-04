
import {testSyntax} from "../testSyntax";
import {PrimaryKeyConstraint} from "../../lib/syntax/PrimaryKeyConstraint";

describe("PrimaryKeyConstraint", () => {
    
    testSyntax(PrimaryKeyConstraint, {
        str: "constraint test primary key (id)",
        shouldBe: {
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
        shouldBe: {
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
