
import {testSyntax} from "../testSyntax";
import {PgReturns} from "../../lib/syntax/PgReturns";

describe("PgReturns", () => {

    testSyntax(PgReturns, {
        str: "numerIc( 12 )",
        shouldBe: {
            type: "numeric(12)"
        }
    });

    testSyntax(PgReturns, {
        str: "table ( id integer , name text  )",
        shouldBe: {
            table: [
                {
                    name: "id",
                    type: "integer"
                },
                {
                    name: "name",
                    type: "text"
                }
            ]
        }
    });

    testSyntax(PgReturns, {
        str: "public.company",
        shouldBe: {
            type: "public.company"
        }
    });

    testSyntax(PgReturns, {
        str: "company",
        shouldBe: {
            type: "public.company"
        }
    });

    testSyntax(PgReturns, {
        str: "company[]",
        shouldBe: {
            type: "public.company[]"
        }
    });

    testSyntax(PgReturns, {
        str: "setof company",
        shouldBe: {
            setof: true,
            type: "public.company"
        }
    });
    
});
