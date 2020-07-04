
import {testSyntax} from "../testSyntax";
import {Extract} from "../../lib/syntax/Extract";

describe("Extract", () => {

    testSyntax(Extract, {
        str: "extract(CENTURY FROM TIMESTAMP '2000-12-16 12:21:13')",
        shouldBe: {
            field: "century",
            type: {type: "timestamp"},
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(Century FROM TIMESTAMP '2000-12-16 12:21:13')",
        shouldBe: {
            field: "century",
            type: {type: "timestamp"},
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(CENTURY FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "century",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(DAY FROM TIMESTAMP '2000-12-16 12:21:13')",
        shouldBe: {
            field: "day",
            type: {type: "timestamp"},
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(DECADE FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "decade",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(DECADE FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "decade",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(dow FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "dow",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(doy FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "doy",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(epoch FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "epoch",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(hour FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "hour",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(microseconds FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "microseconds",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(millennium FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "millennium",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(milliseconds FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "milliseconds",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(minute FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "minute",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(month FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "month",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(quarter FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "quarter",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(second FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "second",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(timezone FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "timezone",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(timezone_hour FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "timezone_hour",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(timezone_minute FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "timezone_minute",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(week FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "week",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(year FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "year",
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(wrong FROM '2000-12-16 12:21:13')",
        error: /unrecognized extract field/
    });
});
