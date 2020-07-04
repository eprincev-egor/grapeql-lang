
import {testSyntax} from "../testSyntax";
import {UniqueConstraint} from "../../lib/syntax/UniqueConstraint";

describe("UniqueConstraint", () => {
    
    testSyntax(UniqueConstraint, {
        str: "constraint test unique (id_unit, id_operation)",
        result: {
            name: {
                word: "test",
                content: null
            },
            column: null,
            unique: [
                {
                    word: "id_unit",
                    content: null
                },
                {
                    word: "id_operation",
                    content: null
                }
            ]
        }
    });
    
    testSyntax(UniqueConstraint, {
        str: "unique",
        options: {
            column: {
                word: "test",
                content: null
            }
        },
        result: {
            name: null,
            column: {
                word: "test",
                content: null
            },
            unique: [{
                word: "test",
                content: null
            }]
        }
    });
    
});
