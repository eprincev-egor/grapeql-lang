
import {testSyntax} from "../testSyntax";
import {UniqueConstraint} from "../../lib/syntax/UniqueConstraint";

describe("UniqueConstraint", () => {
    
    testSyntax(UniqueConstraint, {
        str: "constraint test unique (id_unit, id_operation)",
        shouldBe: {
            name: {
                word: "test"
            },
            unique: [
                {
                    word: "id_unit"
                },
                {
                    word: "id_operation"
                }
            ]
        }
    });
    
    testSyntax(UniqueConstraint, {
        str: "unique",
        options: {
            column: {
                word: "test"
            }
        },
        shouldBe: {
            column: {
                word: "test"
            },
            unique: [{
                word: "test"
            }]
        }
    });
    
});
