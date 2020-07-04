
import {testSyntax} from "../testSyntax";
import {PgArgument} from "../../lib/syntax/PgArgument";

describe("PgArgument", () => {

    testSyntax(PgArgument, {
        str: "ID INTEGER",
        shouldBe: {
            name: "id",
            type: "integer",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "sum numeric ( 10, 3 )",
        shouldBe: {
            name: "sum",
            type: "numeric(10,3)",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "sum numeric",
        shouldBe: {
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
        shouldBe: {
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
        shouldBe: {
            name: "company_id",
            type: "bigint",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "company public.company",
        shouldBe: {
            name: "company",
            type: "public.company",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "company company",
        shouldBe: {
            name: "company",
            type: "public.company",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "text",
        shouldBe: {
            name: null,
            type: "text",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "timestamp without time zone",
        shouldBe: {
            name: null,
            type: "timestamp without time zone",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "double precision",
        shouldBe: {
            name: null,
            type: "double precision",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "character varying(2)",
        shouldBe: {
            name: null,
            type: "character varying(2)",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "time with time zone",
        shouldBe: {
            name: null,
            type: "time with time zone",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "date_start time with time zone",
        shouldBe: {
            name: "date_start",
            type: "time with time zone",
            out: null,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "out name text",
        shouldBe: {
            name: "name",
            type: "text",
            out: true,
            in: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "in name text",
        shouldBe: {
            name: "name",
            type: "text",
            in: true,
            out: null,
            default: null
        }
    });
    
    testSyntax(PgArgument, {
        str: "name character varying[]",
        shouldBe: {
            name: "name",
            type: "character varying[]",
            out: null,
            in: null,
            default: null
        }
    });
    
});
