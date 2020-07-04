
import {testSyntax} from "../testSyntax";
import {FunctionCall} from "../../lib/syntax/FunctionCall";

describe("FunctionCall", () => {

    testSyntax(FunctionCall, {
        str: "public.get_default_currency()",
        result: {
            function: {
                star: false,
                link: [
                    {word: "public", content: null},
                    {word: "get_default_currency", content: null}
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
        result: {
            function: {
                star: false,
                link: [
                    {word: "public", content: null},
                    {word: "get_default_currency", content: null}
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
        result: {
            function: {
                star: false,
                link: [
                    {word: "count", content: null}
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
        result: {
            function: {
                star: false,
                link: [
                    {word: "row_to_json", content: null}
                ]
            },
            all: null,
            distinct: null,
            arguments: [
                {elements: [
                    {
                        star: true,
                        link: [
                            {word: "company", content: null}
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
        result: {
            function: {
                star: false,
                link: [
                    {word: "array_agg", content: null}
                ]
            },
            all: true,
            distinct: null,
            arguments: [
                {elements: [
                    {star: false, link: [
                        {word: "company", content: null},
                        {word: "id", content: null}
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
        result: {
            function: {
                star: false,
                link: [
                    {word: "array_agg", content: null}
                ]
            },
            all: null,
            distinct: true,
            arguments: [
                {elements: [
                    {star: false, link: [
                        {word: "company", content: null},
                        {word: "id", content: null}
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
        result: {
            function: {
                star: false,
                link: [
                    {word: "array_agg", content: null}
                ]
            },
            all: null,
            distinct: null,
            arguments: [
                {elements: [
                    {star: false, link: [
                        {word: "company", content: null},
                        {word: "id", content: null}
                    ]}
                ]}
            ],
            where: {elements: [
                {star: false, link: [
                    {word: "company", content: null},
                    {word: "name", content: null}
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
        result: {
            function: {
                star: false,
                link: [
                    {word: "array_agg", content: null}
                ]
            },
            all: null,
            distinct: null,
            arguments: [
                {elements: [
                    {star: false, link: [
                        {word: "company", content: null},
                        {word: "id", content: null}
                    ]}
                ]}
            ],
            where: null,
            orderBy: [{
                expression: {elements: [
                    {
                        star: false,
                        link: [
                            {word: "id", content: null}
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
        result: {
            function: {
                star: false,
                link: [
                    {word: "array_agg", content: null}
                ]
            },
            all: null,
            distinct: null,
            arguments: [
                {elements: [
                    {star: false, link: [
                        {word: "company", content: null},
                        {word: "id", content: null}
                    ]}
                ]}
            ],
            where: {elements: [
                {star: false, link: [
                    {word: "company", content: null},
                    {word: "name", content: null}
                ]},
                {operator: "is not"},
                {null: true}
            ]},
            orderBy: [{
                expression: {elements: [
                    {
                        star: false,
                        link: [
                            {word: "id", content: null}
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
        result: {
            function: {
                star: false,
                link: [
                    {word: "unnest", content: null}
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
                            {word: "val", content: null}
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
        result: {
            function: {
                star: false,
                link: [
                    {word: "ntile", content: null}
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
                                {word: "val", content: null}
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
        result: {
            function: {
                star: false,
                link: [
                    {word: "ntile", content: null}
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
