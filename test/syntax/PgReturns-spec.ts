
import {testSyntax} from "../testSyntax";
import {PgReturns} from "../../lib/syntax/PgReturns";

describe("PgReturns", () => {

    testSyntax(PgReturns, {
        str: "numerIc( 12 )",
        shouldBe: {
            setof: null,
            table: null,
            type: "numeric(12)"
        }
    });

    testSyntax(PgReturns, {
        str: "table ( id integer , name text  )",
        shouldBe: {
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

    testSyntax(PgReturns, {
        str: "public.company",
        shouldBe: {
            setof: null,
            table: null,
            type: "public.company"
        }
    });

    testSyntax(PgReturns, {
        str: "company",
        shouldBe: {
            setof: null,
            table: null,
            type: "public.company"
        }
    });

    testSyntax(PgReturns, {
        str: "company[]",
        shouldBe: {
            setof: null,
            table: null,
            type: "public.company[]"
        }
    });

    testSyntax(PgReturns, {
        str: "setof company",
        shouldBe: {
            setof: true,
            table: null,
            type: "public.company"
        }
    });
    
});
