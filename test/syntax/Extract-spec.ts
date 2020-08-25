
import {testSyntax} from "../testSyntax";
import {Extract} from "../../lib/syntax/Extract";

describe("Extract", () => {

    testSyntax(Extract, {
        str: "extract(CENTURY FROM '2000-12-16 12:21:13'::TIMESTAMP)",
        shouldBe: {
            extract: "century",
            from: {elements: [
                {content: "2000-12-16 12:21:13"},
                {operator: "::"},
                {type: "timestamp"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(Century FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "century",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(CENTURY FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "century",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(DAY FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "day",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(DECADE FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "decade",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(DECADE FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "decade",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(dow FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "dow",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(doy FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "doy",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(epoch FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "epoch",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(hour FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "hour",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(microseconds FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "microsecond",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(microsecond FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "microsecond",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(millennium FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "millennium",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(milliseconds FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "millisecond",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(millisecond FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "millisecond",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(minute FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "minute",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(month FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "month",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(quarter FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "quarter",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(second FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "second",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(timezone FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "timezone",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(timezone_hour FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "timezone_hour",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(timezone_minute FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "timezone_minute",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(week FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "week",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(year FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "year",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(wrong FROM '2000-12-16 12:21:13')",
        error: /unrecognized extract field/
    });

    testSyntax(Extract, {
        str: "extract(days FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "day",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(weeks FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "week",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(hours FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "hour",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(seconds FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "second",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(minutes FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "minute",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(months FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "month",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(decades FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "decade",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(centuries FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "century",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(millenniums FROM '2000-12-16 12:21:13')",
        shouldBe: {
            extract: "millennium",
            from: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

});
