
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
            all: null,
            distinct: null,
            arguments: [],
            where: null,
            orderBy: null,
            within: null,
            over: null,
            emptyOver: null
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
            all: null,
            distinct: null,
            arguments: [
                {elements: [
                    {number: "1"}
                ]},
                {elements: [
                    {number: "2"}
                ]}
            ],
            where: null,
            orderBy: null,
            within: null,
            over: null,
            emptyOver: null
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
            all: null,
            distinct: null,
            arguments: [
                {elements: [
                    {
                        star: true,
                        link: []
                    }
                ]}
            ],
            where: null,
            orderBy: null,
            within: null,
            over: null,
            emptyOver: null
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
            all: null,
            distinct: null,
            arguments: [
                {elements: [
                    {
                        star: true,
                        link: [
                            {word: "company"}
                        ]
                    }
                ]}
            ],
            where: null,
            orderBy: null,
            within: null,
            over: null,
            emptyOver: null
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
            distinct: null,
            arguments: [
                {elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "id"}
                    ]}
                ]}
            ],
            where: null,
            orderBy: null,
            within: null,
            over: null,
            emptyOver: null
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
            all: null,
            distinct: true,
            arguments: [
                {elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "id"}
                    ]}
                ]}
            ],
            where: null,
            orderBy: null,
            within: null,
            over: null,
            emptyOver: null
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
            all: null,
            distinct: null,
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
            orderBy: null,
            within: null,
            over: null,
            emptyOver: null
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
            all: null,
            distinct: null,
            arguments: [
                {elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "id"}
                    ]}
                ]}
            ],
            where: null,
            orderBy: [{
                expression: {elements: [
                    {
                        star: false,
                        link: [
                            {word: "id"}
                        ]
                    }
                ]},
                vector: "desc",
                using: null,
                nulls: null
            }],
            within: null,
            over: null,
            emptyOver: null
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
            all: null,
            distinct: null,
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
                vector: "desc",
                using: null,
                nulls: null
            }],
            within: null,
            over: null,
            emptyOver: null
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
            all: null,
            distinct: null,
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
            where: null,
            orderBy: null,
            within: [{
                expression: {elements: [
                    {
                        star: false,
                        link: [
                            {word: "val"}
                        ]
                    }
                ]},
                vector: "asc",
                using: null,
                nulls: null
            }],
            over: null,
            emptyOver: null
        }
    });

    
    testSyntax(FunctionCall, {
        str: "ntile(4) OVER (ORDER BY val) AS tile",
        shouldBe: {
            function: {
                star: false,
                link: [
                    {word: "ntile"}
                ]
            },
            distinct: null,
            all: null,
            arguments: [
                {elements: [
                    {number: "4"}
                ]}
            ],
            where: null,
            orderBy: null,
            within: null,
            over: {
                windowDefinition: null,
                partitionBy: null,
                orderBy: [
                    {
                        expression: {elements: [
                            {star: false, link: [
                                {word: "val"}
                            ]}
                        ]},
                        vector: "asc",
                        using: null,
                        nulls: null
                    }
                ],
                range: null,
                rows: null
            },
            emptyOver: null
        }
    });

    testSyntax(FunctionCall, {
        str: "ntile(4) OVER () AS tile",
        shouldBe: {
            function: {
                star: false,
                link: [
                    {word: "ntile"}
                ]
            },
            distinct: null,
            all: null,
            arguments: [
                {elements: [
                    {number: "4"}
                ]}
            ],
            where: null,
            orderBy: null,
            within: null,
            over: null,
            emptyOver: true
        }
    });

    
});
