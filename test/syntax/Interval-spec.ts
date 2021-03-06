
import {testSyntax} from "../testSyntax";
import assert from "assert";
import {PgNull} from "../../lib/syntax/PgNull";
import {Interval} from "../../lib/syntax/Interval";

describe("Interval", () => {

    testSyntax(Interval, {
        str: "interval '1 day'",
        shouldBe: {
            interval: {
                content: "1 day"
            }
        }
    });

    testSyntax(Interval, {
        str: "interval $$100 hours$$",
        shouldBe: {
            interval: {
                content: "100 hours"
            }
        }
    });

    it("interval should be SingleQuotesString or DollarString", () => {
        assert.throws(
            () => {
                const wrongSyntax = new PgNull();
                
                const interval = new (Interval as any)({
                    interval: wrongSyntax
                });
            },
            (err: Error) =>
                /invalid/.test(err.message) &&
                /interval/.test(err.message)
        );
    });

});
