
import {testSyntax} from "../testSyntax";
import {PgArgument} from "../../lib/syntax/PgArgument";

describe("PgArgument", () => {

    testSyntax(PgArgument, {
        str: "ID INTEGER",
        shouldBe: {
            name: "id",
            type: "integer"
        }
    });
    
    testSyntax(PgArgument, {
        str: "sum numeric ( 10, 3 )",
        shouldBe: {
            name: "sum",
            type: "numeric(10,3)"
        }
    });
    
    testSyntax(PgArgument, {
        str: "sum numeric",
        shouldBe: {
            name: "sum",
            type: "numeric"
        }
    });
    
    testSyntax(PgArgument, {
        str: "company_id bigint default null",
        options: {default: true},
        shouldBe: {
            name: "company_id",
            type: "bigint",
            default: "null"
        }
    });
    
    testSyntax(PgArgument, {
        str: "company_id bigint default null",
        options: {default: false},
        shouldBe: {
            name: "company_id",
            type: "bigint"
        }
    });
    
    testSyntax(PgArgument, {
        str: "company public.company",
        shouldBe: {
            name: "company",
            type: "public.company"
        }
    });
    
    testSyntax(PgArgument, {
        str: "company company",
        shouldBe: {
            name: "company",
            type: "public.company"
        }
    });
    
    testSyntax(PgArgument, {
        str: "text",
        shouldBe: {
            type: "text"
        }
    });
    
    testSyntax(PgArgument, {
        str: "timestamp without time zone",
        shouldBe: {
            type: "timestamp without time zone"
        }
    });
    
    testSyntax(PgArgument, {
        str: "double precision",
        shouldBe: {
            type: "double precision"
        }
    });
    
    testSyntax(PgArgument, {
        str: "character varying(2)",
        shouldBe: {
            type: "character varying(2)"
        }
    });
    
    testSyntax(PgArgument, {
        str: "time with time zone",
        shouldBe: {
            type: "time with time zone"
        }
    });
    
    testSyntax(PgArgument, {
        str: "date_start time with time zone",
        shouldBe: {
            name: "date_start",
            type: "time with time zone"
        }
    });
    
    testSyntax(PgArgument, {
        str: "out name text",
        shouldBe: {
            name: "name",
            type: "text",
            out: true
        }
    });
    
    testSyntax(PgArgument, {
        str: "in name text",
        shouldBe: {
            name: "name",
            type: "text",
            in: true
        }
    });
    
    testSyntax(PgArgument, {
        str: "name character varying[]",
        shouldBe: {
            name: "name",
            type: "character varying[]"
        }
    });
    
});
