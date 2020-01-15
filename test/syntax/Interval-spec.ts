

import assert from "assert";
import PgNull from "../../lib/syntax/PgNull";
import Interval from "../../lib/syntax/Interval";
import testSyntax from "../testSyntax";

describe("Interval", () => {

    testSyntax(Interval, {
        str: "interval '1 day'",
        result: {
            interval: {
                content: "1 day"
            }
        }
    });

    testSyntax(Interval, {
        str: "interval $$100 hours$$",
        result: {
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
            (err) =>
                /invalid interval/.test(err.message)
        );
    });

});
