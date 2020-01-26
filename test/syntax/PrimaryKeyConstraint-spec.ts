
import PrimaryKeyConstraint from "../../lib/syntax/PrimaryKeyConstraint";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("PrimaryKeyConstraint", () => {
    
    GrapeQLCoach.test(PrimaryKeyConstraint, {
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
    
    GrapeQLCoach.test(PrimaryKeyConstraint, {
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
