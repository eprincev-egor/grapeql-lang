
import UniqueConstraint from "../../lib/syntax/UniqueConstraint";
import testSyntax from "../testSyntax";

describe("UniqueConstraint", () => {
    
    testSyntax(UniqueConstraint, {
        str: "constraint test unique (id_unit, id_operation)",
        result: {
            name: {
                word: "test",
                content: null
            },
            primaryKey: [
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
    
});
