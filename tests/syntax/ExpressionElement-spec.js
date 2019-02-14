"use strict";

const ExpressionElement = require("../../lib/syntax/ExpressionElement");
const testSyntax = require("../testSyntax");

describe("ExpressionElement", () => {

    testSyntax(ExpressionElement, {
        str: "null",
        result: {
            element: {
                null: true
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "true",
        result: {
            element: {
                boolean: true
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "1",
        result: {
            element: {
                number: "1"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "b'0011'",
        result: {
            element: {
                content: "0011"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "$body$some code$body$",
        result: {
            element: {
                content: "some code"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "'string'",
        result: {
            element: {
                content: "string"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "$var",
        result: {
            element: {
                name: "var"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "numeric(14, 2)",
        result: {
            element: {
                type: "numeric(14,2)"
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "public.table.column",
        result: {
            element: {
                star: false,
                link: [
                    {
                        word: "public",
                        content: null
                    },
                    {
                        word: "table",
                        content: null
                    },
                    {
                        word: "column",
                        content: null
                    }
                ]
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "public.table.*",
        options: {availableStar: true},
        result: {
            element: {
                star: true,
                link: [
                    {
                        word: "public",
                        content: null
                    },
                    {
                        word: "table",
                        content: null
                    }
                ]
            }
        }
    });

    testSyntax(ExpressionElement, {
        str: "public.table.*",
        error: /SyntaxError/
    });

});
