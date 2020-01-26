
import assert from "assert";
import PgNull from "../../lib/syntax/PgNull";
import Interval from "../../lib/syntax/Interval";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("Interval", () => {

    GrapeQLCoach.test(Interval, {
        str: "interval '1 day'",
        result: {
            interval: {
                content: "1 day"
            }
        }
    });

    GrapeQLCoach.test(Interval, {
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
                /invalid model or model for interval/.test(err.message)
        );
    });

});
