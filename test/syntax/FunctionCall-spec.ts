
import {testSyntax} from "../testSyntax";
import {FunctionCall} from "../../lib/syntax/FunctionCall";

describe("FunctionCall", () => {

    testSyntax(FunctionCall, {
        str: "public.get_default_currency()",
        shouldBe: {
            function: {
                star: false,
                link: [
                    {word: "public"},
                    {word: "get_default_currency"}
                ]
            },
            arguments: []
        }
    });

    testSyntax(FunctionCall, {
        str: "public.get_default_currency( 1, 2 )",
        shouldBe: {
            function: {
                star: false,
                link: [
                    {word: "public"},
                    {word: "get_default_currency"}
                ]
            },
            arguments: [
                {elements: [
                    {number: "1"}
                ]},
                {elements: [
                    {number: "2"}
                ]}
            ]
        }
    });

    testSyntax(FunctionCall, {
        str: "count( * )",
        shouldBe: {
            function: {
                star: false,
                link: [
                    {word: "count"}
                ]
            },
            arguments: [
                {elements: [
                    {
                        star: true,
                        link: []
                    }
                ]}
            ]
        }
    });

    testSyntax(FunctionCall, {
        str: "row_to_json( company.* )",
        shouldBe: {
            function: {
                star: false,
                link: [
                    {word: "row_to_json"}
                ]
            },
            arguments: [
                {elements: [
                    {
                        star: true,
                        link: [
                            {word: "company"}
                        ]
                    }
                ]}
            ]
        }
    });

    testSyntax(FunctionCall, {
        str: "array_agg( all company.id )",
        shouldBe: {
            function: {
                star: false,
                link: [
                    {word: "array_agg"}
                ]
            },
            all: true,
            arguments: [
                {elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "id"}
                    ]}
                ]}
            ]
        }
    });

    testSyntax(FunctionCall, {
        str: "array_agg( distinct company.id )",
        shouldBe: {
            function: {
                star: false,
                link: [
                    {word: "array_agg"}
                ]
            },
            distinct: true,
            arguments: [
                {elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "id"}
                    ]}
                ]}
            ]
        }
    });

    testSyntax(FunctionCall, {
        str: "array_agg( company.id ) filter (where company.name is not null )",
        shouldBe: {
            function: {
                star: false,
                link: [
                    {word: "array_agg"}
                ]
            },
            arguments: [
                {elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "id"}
                    ]}
                ]}
            ],
            where: {elements: [
                {star: false, link: [
                    {word: "company"},
                    {word: "name"}
                ]},
                {operator: "is not"},
                {null: true}
            ]}
        }
    });

    testSyntax(FunctionCall, {
        str: "array_agg( company.id order by id desc )",
        shouldBe: {
            function: {
                star: false,
                link: [
                    {word: "array_agg"}
                ]
            },
            arguments: [
                {elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "id"}
                    ]}
                ]}
            ],
            orderBy: [{
                expression: {elements: [
                    {
                        star: false,
                        link: [
                            {word: "id"}
                        ]
                    }
                ]},
                vector: "desc"
            }]
        }
    });

    testSyntax(FunctionCall, {
        str: "array_agg( company.id order by id desc ) filter (where company.name is not null )",
        shouldBe: {
            function: {
                star: false,
                link: [
                    {word: "array_agg"}
                ]
            },
            arguments: [
                {elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "id"}
                    ]}
                ]}
            ],
            where: {elements: [
                {star: false, link: [
                    {word: "company"},
                    {word: "name"}
                ]},
                {operator: "is not"},
                {null: true}
            ]},
            orderBy: [{
                expression: {elements: [
                    {
                        star: false,
                        link: [
                            {word: "id"}
                        ]
                    }
                ]},
                vector: "desc"
            }]
        }
    });

    testSyntax(FunctionCall, {
        str: "UNNEST( ARRAY[ 1, 2 ] ) WITHIN GROUP (ORDER BY val))",
        shouldBe: {
            function: {
                star: false,
                link: [
                    {word: "unnest"}
                ]
            },
            arguments: [
                {elements: [
                    {array: [
                        {elements: [
                            {number: "1"}
                        ]},
                        {elements: [
                            {number: "2"}
                        ]}
                    ]}
                ]}
            ],
            within: [{
                expression: {elements: [
                    {
                        star: false,
                        link: [
                            {word: "val"}
                        ]
                    }
                ]},
                vector: "asc"
            }]
        }
    });

    
    testSyntax(FunctionCall, {
        str: "nTile(4) OVER (ORDER BY val) AS tile",
        shouldBe: {
            function: {
                star: false,
                link: [
                    {word: "nTile"}
                ]
            },
            arguments: [
                {elements: [
                    {number: "4"}
                ]}
            ],
            over: {
                orderBy: [
                    {
                        expression: {elements: [
                            {star: false, link: [
                                {word: "val"}
                            ]}
                        ]},
                        vector: "asc"
                    }
                ]
            }
        }
    });

    testSyntax(FunctionCall, {
        str: "nTile(4) OVER () AS tile",
        shouldBe: {
            function: {
                star: false,
                link: [
                    {word: "nTile"}
                ]
            },
            arguments: [
                {elements: [
                    {number: "4"}
                ]}
            ],
            emptyOver: true
        }
    });

    
});
