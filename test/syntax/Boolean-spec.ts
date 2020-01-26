

import Boolean from "../../lib/syntax/Boolean";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("Boolean", () => {

    GrapeQLCoach.test(Boolean, {
        str: "true",
        result: {
            boolean: true
        }
    });

    GrapeQLCoach.test(Boolean, {
        str: "false",
        result: {
            boolean: false
        }
    });

    GrapeQLCoach.test(Boolean, {
        str: "fAlse",
        result: {
            boolean: false
        }
    });

    GrapeQLCoach.test(Boolean, {
        str: "  TRUE ",
        result: {
            boolean: true
        }
    });

    GrapeQLCoach.test(Boolean, {
        str: "true1",
        error: /SyntaxError/
    });

});
