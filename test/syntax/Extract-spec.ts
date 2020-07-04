
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
            type: null,
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
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(DECADE FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "decade",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(dow FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "dow",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(doy FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "doy",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(epoch FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "epoch",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(hour FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "hour",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(microseconds FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "microseconds",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(millennium FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "millennium",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(milliseconds FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "milliseconds",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(minute FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "minute",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(month FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "month",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(quarter FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "quarter",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(second FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "second",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(timezone FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "timezone",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(timezone_hour FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "timezone_hour",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(timezone_minute FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "timezone_minute",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(week FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "week",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(year FROM '2000-12-16 12:21:13')",
        shouldBe: {
            field: "year",
            type: null,
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
