
import {testSyntax} from "../testSyntax";
import {Cast} from "../../lib/syntax/Cast";

describe("Cast", () => {

    testSyntax(Cast, {
        str: "cast(1 as numeric( 12, 12 ))",
        result: {
            cast: {
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
            cast: {
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
            cast: {
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
            cast: {
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
