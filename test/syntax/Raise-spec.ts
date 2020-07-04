
import {testSyntax} from "../testSyntax";
import {Raise} from "../../lib/syntax/Raise";

describe("Raise", () => {

    testSyntax(Raise, {
        str: "raise Notice 'hello %', 'world'",
        result: {
            level: "notice",
            conditionName: null,
            sqlState: null,
            raise: {content: "hello %"},
            parameters: [
                {elements: [
                    {content: "world"}
                ]}
            ],
            using: []
        }
    });
    
    testSyntax(Raise, {
        str: "raise Notice $$hello %$$, 'world'",
        result: {
            level: "notice",
            conditionName: null,
            sqlState: null,
            raise: {content: "hello %"},
            parameters: [
                {elements: [
                    {content: "world"}
                ]}
            ],
            using: []
        }
    });
    
    testSyntax(Raise, {
        str: "raise debug 'hello %', 'world'",
        result: {
            level: "debug",
            conditionName: null,
            sqlState: null,
            raise: {content: "hello %"},
            parameters: [
                {elements: [
                    {content: "world"}
                ]}
            ],
            using: []
        }
    });
    
    testSyntax(Raise, {
        str: "raise log 'hello %', 'world'",
        result: {
            level: "log",
            conditionName: null,
            sqlState: null,
            raise: {content: "hello %"},
            parameters: [
                {elements: [
                    {content: "world"}
                ]}
            ],
            using: []
        }
    });
    
    testSyntax(Raise, {
        str: "raise warning 'hello %', 'world'",
        result: {
            level: "warning",
            conditionName: null,
            sqlState: null,
            raise: {content: "hello %"},
            parameters: [
                {elements: [
                    {content: "world"}
                ]}
            ],
            using: []
        }
    });
    
    testSyntax(Raise, {
        str: "raise exception 'hello %', 'world'",
        result: {
            level: "exception",
            conditionName: null,
            sqlState: null,
            raise: {content: "hello %"},
            parameters: [
                {elements: [
                    {content: "world"}
                ]}
            ],
            using: []
        }
    });
    
    
    testSyntax(Raise, {
        str: "raise log 'hello %', 'world' using hint = 'a hint', detail = 'a detail'",
        result: {
            level: "log",
            conditionName: null,
            sqlState: null,
            raise: {content: "hello %"},
            parameters: [
                {elements: [
                    {content: "world"}
                ]}
            ],
            using: [
                {
                    option: "hint",
                    expression: {elements: [
                        {content: "a hint"}
                    ]}
                },
                {
                    option: "detail",
                    expression: {elements: [
                        {content: "a detail"}
                    ]}
                }
            ]
        }
    });
    
    testSyntax(Raise, {
        str: "raise 'error'",
        result: {
            level: null,
            conditionName: null,
            sqlState: null,
            raise: {content: "error"},
            parameters: [],
            using: []
        }
    });

    testSyntax(Raise, {
        str: "raise division_BY_zero",
        result: {
            level: null,
            conditionName: "division_by_zero",
            sqlState: null,
            raise: null,
            parameters: [],
            using: []
        }
    });

    testSyntax(Raise, {
        str: "raise notice division_BY_zero",
        result: {
            level: "notice",
            conditionName: "division_by_zero",
            sqlState: null,
            raise: null,
            parameters: [],
            using: []
        }
    });

    testSyntax(Raise, {
        str: "raise debug using hint = 'a hint'",
        result: {
            level: "debug",
            conditionName: null,
            sqlState: null,
            raise: null,
            parameters: [],
            using: [{
                option: "hint",
                expression: {elements: [
                    {content: "a hint"}
                ]}
            }]
        }
    });

    testSyntax(Raise, {
        str: "raise using hint = 'a hint'",
        result: {
            level: null,
            conditionName: null,
            sqlState: null,
            raise: null,
            parameters: [],
            using: [{
                option: "hint",
                expression: {elements: [
                    {content: "a hint"}
                ]}
            }]
        }
    });

    testSyntax(Raise, {
        str: "raise sqlState '22012'",
        result: {
            level: null,
            conditionName: null,
            sqlState: {content: "22012"},
            raise: null,
            parameters: [],
            using: []
        }
    });

    testSyntax(Raise, {
        str: "raise sqlState $$22012$$",
        result: {
            level: null,
            conditionName: null,
            sqlState: {content: "22012"},
            raise: null,
            parameters: [],
            using: []
        }
    });

    testSyntax(Raise, {
        str: "raise sqlState '22012' using detail = 'a detail'",
        result: {
            level: null,
            conditionName: null,
            sqlState: {content: "22012"},
            raise: null,
            parameters: [],
            using: [{
                option: "detail",
                expression: {elements: [
                    {content: "a detail"}
                ]}
            }]
        }
    });

    testSyntax(Raise, {
        str: "raise notice sqlstate '22012' using detail = 'a detail'",
        result: {
            level: "notice",
            conditionName: null,
            sqlState: {content: "22012"},
            raise: null,
            parameters: [],
            using: [{
                option: "detail",
                expression: {elements: [
                    {content: "a detail"}
                ]}
            }]
        }
    });
});
