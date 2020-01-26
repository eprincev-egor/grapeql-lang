
import SelectFetch from "../../lib/syntax/SelectFetch";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("SelectFetch", () => {

    GrapeQLCoach.test(SelectFetch, {
        str: "fetch first row only",
        result: {
            first: true,
            next: null,
            row: true,
            rows: null,
            count: null
        }
    });

    GrapeQLCoach.test(SelectFetch, {
        str: "fetch next row only",
        result: {
            first: null,
            next: true,
            row: true,
            rows: null,
            count: null
        }
    });

    GrapeQLCoach.test(SelectFetch, {
        str: "fetch next 5 rows only",
        result: {
            first: null,
            next: true,
            row: null,
            rows: true,
            count: 5
        }
    });

});
