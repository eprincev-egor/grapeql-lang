"use strict";

const Extract = require("../../lib/syntax/Extract");
const testSyntax = require("../testSyntax");

describe("Extract", () => {

    testSyntax(Extract, {
        str: "extract(CENTURY FROM TIMESTAMP '2000-12-16 12:21:13')",
        result: {
            field: "century",
            type: {type: "timestamp"},
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(Century FROM TIMESTAMP '2000-12-16 12:21:13')",
        result: {
            field: "century",
            type: {type: "timestamp"},
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(CENTURY FROM '2000-12-16 12:21:13')",
        result: {
            field: "century",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(DAY FROM TIMESTAMP '2000-12-16 12:21:13')",
        result: {
            field: "day",
            type: {type: "timestamp"},
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(DECADE FROM '2000-12-16 12:21:13')",
        result: {
            field: "decade",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(DECADE FROM '2000-12-16 12:21:13')",
        result: {
            field: "decade",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(dow FROM '2000-12-16 12:21:13')",
        result: {
            field: "dow",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(doy FROM '2000-12-16 12:21:13')",
        result: {
            field: "doy",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(epoch FROM '2000-12-16 12:21:13')",
        result: {
            field: "epoch",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(hour FROM '2000-12-16 12:21:13')",
        result: {
            field: "hour",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(microseconds FROM '2000-12-16 12:21:13')",
        result: {
            field: "microseconds",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(millennium FROM '2000-12-16 12:21:13')",
        result: {
            field: "millennium",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(milliseconds FROM '2000-12-16 12:21:13')",
        result: {
            field: "milliseconds",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(minute FROM '2000-12-16 12:21:13')",
        result: {
            field: "minute",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(month FROM '2000-12-16 12:21:13')",
        result: {
            field: "month",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(quarter FROM '2000-12-16 12:21:13')",
        result: {
            field: "quarter",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(second FROM '2000-12-16 12:21:13')",
        result: {
            field: "second",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(timezone FROM '2000-12-16 12:21:13')",
        result: {
            field: "timezone",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(timezone_hour FROM '2000-12-16 12:21:13')",
        result: {
            field: "timezone_hour",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(timezone_minute FROM '2000-12-16 12:21:13')",
        result: {
            field: "timezone_minute",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(week FROM '2000-12-16 12:21:13')",
        result: {
            field: "week",
            type: null,
            source: {elements: [
                {content: "2000-12-16 12:21:13"}
            ]}
        }
    });

    testSyntax(Extract, {
        str: "extract(year FROM '2000-12-16 12:21:13')",
        result: {
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