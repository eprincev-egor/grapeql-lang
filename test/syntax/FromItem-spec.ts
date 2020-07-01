

import FromItem from "../../lib/syntax/FromItem";
import testSyntax from "../testSyntax";

describe("FromItem", () => {

    testSyntax(FromItem, {
        str: "public.company",
        result: {
            lateral: null,
            only: null,
            file: null,
            withOrdinality: null,
            functionCall: null,
            as: null,
            columns: null,
            joins: [],
            star: null,
            select: null,

            table: {star: false, link: [
                {word: "public", content: null},
                {word: "company", content: null}
            ]}
        }
    });

    testSyntax(FromItem, {
        str: "only company",
        result: {
            lateral: null,
            file: null,
            withOrdinality: null,
            functionCall: null,
            as: null,
            columns: null,
            joins: [],
            star: null,
            select: null,
            
            only: true,
            table: {star: false, link: [
                {word: "company", content: null}
            ]}
        }
    });

    testSyntax(FromItem, {
        str: "only company *",
        result: {
            lateral: null,
            file: null,
            withOrdinality: null,
            functionCall: null,
            as: null,
            columns: null,
            joins: [],
            select: null,

            star: true,
            
            only: true,
            table: {star: false, link: [
                {word: "company", content: null}
            ]}
        }
    });

    testSyntax(FromItem, {
        str: "public.company as Company",
        result: {
            lateral: null,
            only: null,
            file: null,
            withOrdinality: null,
            functionCall: null,
            columns: null,
            joins: [],
            star: null,
            select: null,
            
            as: { word: "company", content: null },
            table: {star: false, link: [
                {word: "public", content: null},
                {word: "company", content: null}
            ]}
        }
    });

    testSyntax(FromItem, {
        str: "public.company as Company ( id, inn )",
        result: {
            lateral: null,
            only: null,
            file: null,
            withOrdinality: null,
            functionCall: null,
            joins: [],
            star: null,
            select: null,

            as: { word: "company", content: null},
            table: {star: false, link: [
                {word: "public", content: null},
                {word: "company", content: null}
            ]},
            columns: [
                {word: "id", content: null},
                {word: "inn", content: null}
            ]
        }
    });

    testSyntax(FromItem, {
        str: "public.get_rows(1 + 1) as some_rows",
        result: {
            lateral: null,
            only: null,
            file: null,
            withOrdinality: null,
            table: null,
            columns: null,
            joins: [],
            star: null,
            select: null,
            
            functionCall: {
                distinct: null,
                emptyOver: null,
                orderBy: null,
                over: null,
                all: null,
                within: null,
                where: null,

                function: {star: false, link: [
                    { word: "public", content: null },
                    { word: "get_rows", content: null }
                ]},
                arguments: [
                    {elements: [
                        {number: "1"},
                        {operator: "+"},
                        {number: "1"}
                    ]}
                ]
            },
            as: {
                word: "some_rows",
                content: null
            }
        }
    });

    testSyntax(FromItem, {
        str: "lateral get_rows( company.id ) as some_rows",
        result: {
            only: null,
            file: null,
            withOrdinality: null,
            table: null,
            columns: null,
            joins: [],
            star: null,
            select: null,
            
            lateral: true,
            functionCall: {
                distinct: null,
                emptyOver: null,
                orderBy: null,
                over: null,
                all: null,
                within: null,
                where: null,

                function: {star: false, link: [
                    { word: "get_rows", content: null }
                ]},
                arguments: [
                    {elements: [
                        {star: false, link: [
                            {word: "company", content: null},
                            {word: "id", content: null}
                        ]}
                    ]}
                ]
            },
            as: {
                word: "some_rows",
                content: null
            }
        }
    });

    
    testSyntax(FromItem, {
        str: "unnest('{1,2,3}'::int[], '{4,5,6,7}'::int[]) with ordinality as t(a1, a2, num)",
        result: {
            only: null,
            file: null,
            table: null,
            joins: [],
            lateral: null,
            star: null,
            select: null,
            
            withOrdinality: true,
            functionCall: {
                distinct: null,
                emptyOver: null,
                orderBy: null,
                over: null,
                all: null,
                within: null,
                where: null,

                function: {star: false, link: [
                    { word: "unnest", content: null }
                ]},
                arguments: [
                    {elements: [
                        {content: "{1,2,3}"},
                        {operator: "::"},
                        {type: "int[]"}
                    ]},
                    {elements: [
                        {content: "{4,5,6,7}"},
                        {operator: "::"},
                        {type: "int[]"}
                    ]}
                ]
            },
            as: {
                word: "t",
                content: null
            },
            
            columns: [
                {word: "a1", content: null},
                {word: "a2", content: null},
                {word: "num", content: null}
            ]
        }
    });

    
    testSyntax(FromItem, {
        str: "file Order.sql as orders",
        result: {
            lateral: null,
            only: null,
            table: null,
            withOrdinality: null,
            functionCall: null,
            star: null,
            columns: null,
            joins: [],
            select: null,

            file: {
                relative: true,
                path: [
                    {name: ".", content: null},
                    {name: "Order.sql", content: null}
                ]
            },
            as: {
                word: "orders",
                content: null
            }
        }
    });

    testSyntax(FromItem, {
        str: "./Order.sql as orders",
        result: {
            lateral: null,
            only: null,
            table: null,
            withOrdinality: null,
            functionCall: null,
            star: null,
            select: null,
            columns: null,
            joins: [],

            file: {
                relative: true,
                path: [
                    {name: ".", content: null},
                    {name: "Order.sql", content: null}
                ]
            },
            as: {
                word: "orders",
                content: null
            }
        }
    });

    testSyntax(FromItem, {
        str: "./Order",
        result: {
            lateral: null,
            only: null,
            table: null,
            withOrdinality: null,
            functionCall: null,
            star: null,
            columns: null,
            select: null,
            joins: [],

            file: {
                relative: true,
                path: [
                    {name: ".", content: null},
                    {name: "Order", content: null}
                ]
            },
            as: null
        }
    });

    testSyntax(FromItem, {
        str: "./Order",
        result: {
            lateral: null,
            only: null,
            table: null,
            withOrdinality: null,
            functionCall: null,
            star: null,
            columns: null,
            select: null,
            joins: [],

            file: {
                relative: true,
                path: [
                    {name: ".", content: null},
                    {name: "Order", content: null}
                ]
            },
            as: null
        }
    });


    testSyntax(FromItem, {
        str: "./Order join country on true",
        result: {
            lateral: null,
            only: null,
            table: null,
            withOrdinality: null,
            functionCall: null,
            star: null,
            columns: null,
            select: null,
            joins: [
                {
                    type: "join",
                    from: {
                        lateral: null,
                        only: null,
                        file: null,
                        withOrdinality: null,
                        functionCall: null,
                        star: null,
                        as: null,
                        columns: null,
                        select: null,
                        joins: [],
    
                        table: {star: false, link: [
                            {word: "country", content: null}
                        ]}
                    },
                    on: {elements: [
                        {boolean: true}
                    ]},
                    using: null
                }
            ],

            file: {
                relative: true,
                path: [
                    {name: ".", content: null},
                    {name: "Order", content: null}
                ]
            },
            as: null
        }
    });

    
    testSyntax(FromItem, {
        str: "./Order join country on true inner join public.some on false",
        result: {
            lateral: null,
            only: null,
            table: null,
            withOrdinality: null,
            functionCall: null,
            star: null,
            columns: null,
            select: null,
            joins: [
                {
                    type: "join",
                    from: {
                        lateral: null,
                        only: null,
                        file: null,
                        withOrdinality: null,
                        functionCall: null,
                        star: null,
                        as: null,
                        columns: null,
                        select: null,
                        joins: [],
    
                        table: {star: false, link: [
                            {word: "country", content: null}
                        ]}
                    },
                    on: {elements: [
                        {boolean: true}
                    ]},
                    using: null
                },
                {
                    type: "inner join",
                    from: {
                        lateral: null,
                        only: null,
                        file: null,
                        withOrdinality: null,
                        functionCall: null,
                        select: null,
                        star: null,
                        as: null,
                        columns: null,
                        joins: [],
    
                        table: {star: false, link: [
                            {word: "public", content: null},
                            {word: "some", content: null}
                        ]}
                    },
                    on: {elements: [
                        {boolean: false}
                    ]},
                    using: null
                }
            ],

            file: {
                relative: true,
                path: [
                    {name: ".", content: null},
                    {name: "Order", content: null}
                ]
            },
            as: null
        }
    });

    testSyntax(FromItem, {
        str: "( select * from public.order ) as Orders",
        result: {
            lateral: null,
            only: null,
            file: null,
            withOrdinality: null,
            functionCall: null,
            columns: null,
            joins: [],
            star: null,
            table: null,
            
            as: {word: "orders", content: null},
            select: {
                with: null,
                columns: [
                    {
                        expression: {elements: [
                            {star: true, link: []}
                        ]},
                        as: null
                    }
                ],
                into: null,
                from: [{
                    lateral: null,
                    only: null,
                    file: null,
                    withOrdinality: null,
                    functionCall: null,
                    select: null,
                    as: null,
                    columns: null,
                    joins: [],
                    star: null,

                    table: {star: false, link: [
                        {word: "public", content: null},
                        {word: "order", content: null}
                    ]}
                }],
                where: null,
                groupBy: null,
                having: null,
                window: null,
                orderBy: null,
                union: null,
                offset: null,
                offsetRow: null,
                offsetRows: null,
                limit: null,
                fetch: null
            }
        }
    });

    testSyntax(FromItem, {
        str: "lateral ( select * from company ) as company (id, inn)",
        result: {
            only: null,
            file: null,
            withOrdinality: null,
            functionCall: null,
            joins: [],
            star: null,
            table: null,
            
            lateral: true,
            columns: [
                {word: "id", content: null},
                {word: "inn", content: null}
            ],
            as: {word: "company", content: null},
            select: {
                with: null,
                columns: [
                    {
                        expression: {elements: [
                            {star: true, link: []}
                        ]},
                        as: null
                    }
                ],
                into: null,
                from: [{
                    lateral: null,
                    only: null,
                    file: null,
                    withOrdinality: null,
                    functionCall: null,
                    select: null,
                    as: null,
                    columns: null,
                    joins: [],
                    star: null,

                    table: {star: false, link: [
                        {word: "company", content: null}
                    ]}
                }],
                where: null,
                groupBy: null,
                having: null,
                window: null,
                orderBy: null,
                union: null,
                offset: null,
                offsetRow: null,
                offsetRows: null,
                limit: null,
                fetch: null
            }
        }
    });
});
