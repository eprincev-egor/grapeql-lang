
import PgArgument from "../../lib/syntax/PgArgument";
import testSyntax from "../testSyntax";

describe("PgArgument", () => {

    testSyntax(PgArgument, {
        str: "ID INTEGER",
        result: {
            name: "id",
            type: "integer",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "sum numeric ( 10, 3 )",
        result: {
            name: "sum",
            type: "numeric(10,3)",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "sum numeric",
        result: {
            name: "sum",
            type: "numeric",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "company_id bigint default null",
        options: {default: true},
        result: {
            name: "company_id",
            type: "bigint",
            default: "null",
            out: null,
            in: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "company_id bigint default null",
        options: {default: false},
        result: {
            name: "company_id",
            type: "bigint",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "company public.company",
        result: {
            name: "company",
            type: "public.company",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "company company",
        result: {
            name: "company",
            type: "public.company",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "text",
        result: {
            name: null,
            type: "text",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "timestamp without time zone",
        result: {
            name: null,
            type: "timestamp without time zone",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "double precision",
        result: {
            name: null,
            type: "double precision",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "character varying(2)",
        result: {
            name: null,
            type: "character varying(2)",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "time with time zone",
        result: {
            name: null,
            type: "time with time zone",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "date_start time with time zone",
        result: {
            name: "date_start",
            type: "time with time zone",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "out name text",
        result: {
            name: "name",
            type: "text",
            out: true,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "in name text",
        result: {
            name: "name",
            type: "text",
            in: true,
            out: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "name character varying[]",
        result: {
            name: "name",
            type: "character varying[]",
            out: null,
            in: null,
            default: null
        }
    });
    
});
