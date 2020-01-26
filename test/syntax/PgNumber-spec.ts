
import PgNumber from "../../lib/syntax/PgNumber";
import GrapeQLCoach from "../../lib/GrapeQLCoach";

describe("PgNumber", () => {

    GrapeQLCoach.test(PgNumber, {
        str: "1",
        result: {number: "1"}
    });
    
    GrapeQLCoach.test(PgNumber, {
        str: "1234567890",
        result: {number: "1234567890"}
    });

    GrapeQLCoach.test(PgNumber, {
        str: "3.2",
        result: {number: "3.2"}
    });

    GrapeQLCoach.test(PgNumber, {
        str: "5e2",
        result: {number: "5e2"}
    });

    GrapeQLCoach.test(PgNumber, {
        str: ".001",
        result: {number: ".001"}
    });

    GrapeQLCoach.test(PgNumber, {
        str: "1.925e-3",
        result: {number: "1.925e-3"}
    });

    GrapeQLCoach.test(PgNumber, {
        str: "1.925e+3",
        result: {number: "1.925e+3"}
    });

});
