
import PgNull from "../../lib/syntax/PgNull";
import GrapeQLCoach from "../../lib/GrapeQLCoach";

describe("PgNull", () => {

    GrapeQLCoach.test(PgNull, {
        str: "null",
        result: {null: true}
    });

    GrapeQLCoach.test(PgNull, {
        str: "NULL",
        result: {null: true}
    });

    GrapeQLCoach.test(PgNull, {
        str: "null ",
        result: {null: true}
    });

    GrapeQLCoach.test(PgNull, {
        str: "null1",
        error: /SyntaxError/
    });

});
