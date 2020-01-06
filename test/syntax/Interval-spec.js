"use strict";

const assert = require("assert");
const PgNull = require("../../lib/syntax/PgNull");
const Interval = require("../../lib/syntax/Interval");
const testSyntax = require("../testSyntax");

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
                let wrongSyntax = new PgNull();
                
                new Interval({
                    interval: wrongSyntax
                });
            },
            err =>
                /invalid interval/.test(err.message)
        );
    });

});
