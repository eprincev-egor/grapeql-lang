
import PgArray from "../../lib/syntax/PgArray";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("PgArray", () => {

    GrapeQLCoach.test(PgArray, {
        str: "ARRAY[]",
        result: {array: []}
    });

    GrapeQLCoach.test(PgArray, {
        str: "arraY[]",
        result: {array: []}
    });

    GrapeQLCoach.test(PgArray, {
        str: "array[1]",
        result: {array: [
            {elements: [
                {number: "1"}
            ]}
        ]}
    });

    GrapeQLCoach.test(PgArray, {
        str: "array[ '' ]",
        result: {array: [
            {elements: [
                {content: ""}
            ]}
        ]}
    });

});
