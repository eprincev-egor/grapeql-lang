
import PgReturns from "../../lib/syntax/PgReturns";
import GrapeQLCoach from "../../lib/GrapeQLCoach";

describe("PgReturns", () => {

    GrapeQLCoach.test(PgReturns, {
        str: "numerIc( 12 )",
        result: {
            setof: null,
            table: null,
            type: "numeric(12)"
        }
    });

    GrapeQLCoach.test(PgReturns, {
        str: "table ( id integer , name text  )",
        result: {
            setof: null,
            type: null,
            table: [
                {
                    name: "id",
                    type: "integer",
                    in: null,
                    out: null,
                    default: null
                },
                {
                    name: "name",
                    type: "text",
                    in: null,
                    out: null,
                    default: null
                }
            ]
        }
    });

    GrapeQLCoach.test(PgReturns, {
        str: "public.company",
        result: {
            setof: null,
            table: null,
            type: "public.company"
        }
    });

    GrapeQLCoach.test(PgReturns, {
        str: "company",
        result: {
            setof: null,
            table: null,
            type: "public.company"
        }
    });

    GrapeQLCoach.test(PgReturns, {
        str: "company[]",
        result: {
            setof: null,
            table: null,
            type: "public.company[]"
        }
    });

    GrapeQLCoach.test(PgReturns, {
        str: "setof company",
        result: {
            setof: true,
            table: null,
            type: "public.company"
        }
    });
    
});
