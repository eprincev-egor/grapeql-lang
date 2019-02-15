"use strict";

const Cast = require("../../lib/syntax/Cast");
const testSyntax = require("../testSyntax");

describe("Cast", () => {

    testSyntax(Cast, {
        str: "cast(1 as numeric( 12, 12 ))",
        result: {
            dataType: {
                type: "numeric(12,12)"
            },
            expression: {
                elements: [
                    {
                        number: "1"
                    }
                ]
            }
        }
    });

    testSyntax(Cast, {
        str: "cast('nice' as bigint[][])",
        result: {
            dataType: {
                type: "bigint[][]"
            },
            expression: {
                elements: [
                    {
                        content: "nice"
                    }
                ]
            }
        }
    });

    testSyntax(Cast, {
        str: "cast( $$nice$$  AS bigint[][])",
        result: {
            dataType: {
                type: "bigint[][]"
            },
            expression: {
                elements: [
                    {
                        content: "nice"
                    }
                ]
            }
        }
    });

    testSyntax(Cast, {
        str: "cast( 2 * 3 AS bigint[][])",
        result: {
            dataType: {
                type: "bigint[][]"
            },
            expression: {
                elements: [
                    {
                        number: "2"
                    },
                    {
                        operator: "*"
                    },
                    {
                        number: "3"
                    }
                ]
            }
        }
    });
    
});
