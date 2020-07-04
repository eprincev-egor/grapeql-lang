
import {testSyntax} from "../testSyntax";
import {Select} from "../../lib/syntax/Select";

describe("Select", () => {

    testSyntax(Select, {
        str: "select",
        result: {
            with: null,
            columns: null,
            into: null,
            from: null,
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
    });

    testSyntax(Select, {
        str: "select 1, 2 into a, new.b",
        result: {
            with: null,
            columns: [
                {
                    expression: {elements: [
                        {number: "1"}
                    ]},
                    as: null
                },
                {
                    expression: {elements: [
                        {number: "2"}
                    ]},
                    as: null
                }
            ],
            into: [
                {star: false, link: [
                    {word: "a", content: null}
                ]},
                {star: false, link: [
                    {word: "new", content: null},
                    {word: "b", content: null}
                ]}
            ],
            from: null,
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
    });

    testSyntax(Select, {
        str: "select 1, 2, 3",
        result: {
            with: null,
            columns: [
                {
                    expression: {elements: [
                        {number: "1"}
                    ]},
                    as: null
                },
                {
                    expression: {elements: [
                        {number: "2"}
                    ]},
                    as: null
                },
                {
                    expression: {elements: [
                        {number: "3"}
                    ]},
                    as: null
                }
            ],
            into: null,
            from: null,
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
    });

    testSyntax(Select, {
        str: "select 1 where false",
        result: {
            with: null,
            columns: [
                {
                    expression: {elements: [
                        {number: "1"}
                    ]},
                    as: null
                }
            ],
            into: null,
            from: null,
            where: {elements: [
                {boolean: false}
            ]},
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
    });

    testSyntax(Select, {
        str: "select * from orders order by id",
        result: {
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
            from: [
                {
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
                        {word: "orders", content: null}
                    ]}
                }
            ],
            where: null,
            groupBy: null,
            having: null,
            window: null,
            orderBy: [
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "id", content: null}
                        ]}
                    ]},
                    nulls: null,
                    using: null,
                    vector: "asc"
                }
            ],
            union: null,
            offset: null,
            offsetRow: null,
            offsetRows: null,
            limit: null,
            fetch: null
        }
    });

    testSyntax(Select, {
        str: "select sum( payments ) from orders group by orders.client",
        result: {
            with: null,
            columns: [
                {
                    expression: {elements: [
                        {
                            function: {
                                star: false,
                                link: [
                                    {word: "sum", content: null}
                                ]
                            },
                            all: null,
                            distinct: null,
                            arguments: [{elements: [
                                {star: false, link: [
                                    {word: "payments", content: null}
                                ]}
                            ]}],
                            where: null,
                            orderBy: null,
                            within: null,
                            over: null,
                            emptyOver: null
                        }
                    ]},
                    as: null
                }
            ],
            into: null,
            from: [
                {
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
                        {word: "orders", content: null}
                    ]}
                }
            ],
            where: null,
            groupBy: [
                {
                    cube: null,
                    expression: {elements: [
                        {star: false, link: [
                            {word: "orders", content: null},
                            {word: "client", content: null}
                        ]}
                    ]},
                    groupingSets: null,
                    isEmpty: null,
                    rollup: null
                }
            ],
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
    });

    testSyntax(Select, {
        str: `
            select 
                sum( payments )
            from orders 
            group by 
                order_date
            having 
                sum( payments ) is not null
        `,
        result: {
            with: null,
            columns: [
                {
                    expression: {elements: [
                        {
                            function: {
                                star: false,
                                link: [
                                    {word: "sum", content: null}
                                ]
                            },
                            all: null,
                            distinct: null,
                            arguments: [{elements: [
                                {star: false, link: [
                                    {word: "payments", content: null}
                                ]}
                            ]}],
                            where: null,
                            orderBy: null,
                            within: null,
                            over: null,
                            emptyOver: null
                        }
                    ]},
                    as: null
                }
            ],
            into: null,
            from: [
                {
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
                        {word: "orders", content: null}
                    ]}
                }
            ],
            where: null,
            groupBy: [
                {
                    cube: null,
                    expression: {elements: [
                        {star: false, link: [
                            {word: "order_date", content: null}
                        ]}
                    ]},
                    groupingSets: null,
                    isEmpty: null,
                    rollup: null
                }
            ],
            having: {elements: [
                {
                    function: {
                        star: false,
                        link: [
                            {word: "sum", content: null}
                        ]
                    },
                    all: null,
                    distinct: null,
                    arguments: [{elements: [
                        {star: false, link: [
                            {word: "payments", content: null}
                        ]}
                    ]}],
                    where: null,
                    orderBy: null,
                    within: null,
                    over: null,
                    emptyOver: null
                },
                {operator: "is not"},
                {null: true}
            ]},
            window: null,
            orderBy: null,
            union: null,
            offset: null,
            offsetRow: null,
            offsetRows: null,
            limit: null,
            fetch: null
        }
    });

    
    testSyntax(Select, {
        str: "select * from orders offset 1",
        result: {
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
            from: [
                {
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
                        {word: "orders", content: null}
                    ]}
                }
            ],
            where: null,
            groupBy: null,
            having: null,
            window: null,
            orderBy: null,
            union: null,
            offset: "1",
            offsetRow: null,
            offsetRows: null,
            limit: null,
            fetch: null
        }
    });

    testSyntax(Select, {
        str: "select * from orders offset 1 row",
        result: {
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
            from: [
                {
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
                        {word: "orders", content: null}
                    ]}
                }
            ],
            where: null,
            groupBy: null,
            having: null,
            window: null,
            orderBy: null,
            union: null,
            offset: "1",
            offsetRow: true,
            offsetRows: null,
            limit: null,
            fetch: null
        }
    });

    
    testSyntax(Select, {
        str: "select * from orders offset 10 rows",
        result: {
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
            from: [
                {
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
                        {word: "orders", content: null}
                    ]}
                }
            ],
            where: null,
            groupBy: null,
            having: null,
            window: null,
            orderBy: null,
            union: null,
            offset: "10",
            offsetRow: null,
            offsetRows: true,
            limit: null,
            fetch: null
        }
    });


    testSyntax(Select, {
        str: "select * from orders limit 1",
        result: {
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
            from: [
                {
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
                        {word: "orders", content: null}
                    ]}
                }
            ],
            where: null,
            groupBy: null,
            having: null,
            window: null,
            orderBy: null,
            union: null,
            offset: null,
            offsetRow: null,
            offsetRows: null,
            limit: "1",
            fetch: null
        }
    });
    
    testSyntax(Select, {
        str: "select * from orders limit all",
        result: {
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
            from: [
                {
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
                        {word: "orders", content: null}
                    ]}
                }
            ],
            where: null,
            groupBy: null,
            having: null,
            window: null,
            orderBy: null,
            union: null,
            offset: null,
            offsetRow: null,
            offsetRows: null,
            limit: "all",
            fetch: null
        }
    });
    
    testSyntax(Select, {
        str: "select * from orders offset 1 limit 1",
        result: {
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
            from: [
                {
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
                        {word: "orders", content: null}
                    ]}
                }
            ],
            where: null,
            groupBy: null,
            having: null,
            window: null,
            orderBy: null,
            union: null,
            offset: "1",
            offsetRow: null,
            offsetRows: null,
            limit: "1",
            fetch: null
        }
    });

    testSyntax(Select, {
        str: "select * from orders limit 1 offset 1",
        result: {
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
            from: [
                {
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
                        {word: "orders", content: null}
                    ]}
                }
            ],
            where: null,
            groupBy: null,
            having: null,
            window: null,
            orderBy: null,
            union: null,
            offset: "1",
            offsetRow: null,
            offsetRows: null,
            limit: "1",
            fetch: null
        }
    });

    testSyntax(Select, {
        str: "select limit 1",
        result: {
            with: null,
            columns: null,
            into: null,
            from: null,
            where: null,
            groupBy: null,
            having: null,
            window: null,
            orderBy: null,
            union: null,
            offset: null,
            offsetRow: null,
            offsetRows: null,
            limit: "1",
            fetch: null
        }
    });

    testSyntax(Select, {
        str: "select * from orders fetch first row only",
        result: {
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
            from: [
                {
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
                        {word: "orders", content: null}
                    ]}
                }
            ],
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
            fetch: {
                first: true,
                next: null,
                row: true,
                rows: null,
                count: null
            }
        }
    });


    testSyntax(Select, {
        str: "with recursive x as (select) select * from x",
        result: {
            with: {
                recursive: true,
                queries: [
                    {
                        name: {word: "x", content: null},
                        columns: null,
                        select: {
                            with: null,
                            columns: null,
                            into: null,
                            from: null,
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
                        },
                        values: null
                    }
                ]
            },
            columns: [
                {
                    expression: {elements: [
                        {star: true, link: []}
                    ]},
                    as: null
                }
            ],
            into: null,
            from: [
                {
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
                        {word: "x", content: null}
                    ]}
                }
            ],
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
    });

    testSyntax(Select, {
        str: "select 1 union all select 2",
        result: {
            with: null,
            columns: [
                {
                    expression: {elements: [
                        {number: "1"}
                    ]},
                    as: null
                }
            ],
            into: null,
            from: null,
            where: null,
            groupBy: null,
            having: null,
            window: null,
            orderBy: null,
            offset: null,
            offsetRow: null,
            offsetRows: null,
            limit: null,
            fetch: null,
            union: {
                union: true,
                except: null,
                intersect: null,
                all: true,
                distinct: null,
                select: {
                    with: null,
                    columns: [
                        {
                            expression: {elements: [
                                {number: "2"}
                            ]},
                            as: null
                        }
                    ],
                    into: null,
                    from: null,
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
        }
    });

    testSyntax(Select, {
        str: "select from company window x as (order by company.name), y as (order by company.id)",
        result: {
            with: null,
            columns: null,
            into: null,
            from: [
                {
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
                }
            ],
            where: null,
            groupBy: null,
            having: null,
            window: [
                {
                    as: {word: "x", content: null},
                    body: {
                        windowDefinition: null,
                        partitionBy: null,
                        orderBy: [
                            {
                                expression: {elements: [
                                    {star: false, link: [
                                        {word: "company", content: null},
                                        {word: "name", content: null}
                                    ]}
                                ]},
                                vector: "asc",
                                using: null,
                                nulls: null
                            }
                        ],
                        range: null,
                        rows: null
                    }
                },
                {
                    as: {word: "y", content: null},
                    body: {
                        windowDefinition: null,
                        partitionBy: null,
                        orderBy: [
                            {
                                expression: {elements: [
                                    {star: false, link: [
                                        {word: "company", content: null},
                                        {word: "id", content: null}
                                    ]}
                                ]},
                                vector: "asc",
                                using: null,
                                nulls: null
                            }
                        ],
                        range: null,
                        rows: null
                    }
                }
            ],
            orderBy: null,
            offset: null,
            offsetRow: null,
            offsetRows: null,
            limit: null,
            fetch: null,
            union: null
        }
    });

    testSyntax(Select, {
        str: "select from x, x",
        error: /table name "x" specified more than once/
    });

    testSyntax(Select, {
        str: "select from y as x, x",
        error: /table name "x" specified more than once/
    });

    testSyntax(Select, {
        str: "select from a as x, b as x",
        error: /table name "x" specified more than once/
    });

    testSyntax(Select, {
        str: "select from x.a, y.a",
        result: {
            with: null,
            columns: null,
            into: null,
            from: [
                {
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
                        {word: "x", content: null},
                        {word: "a", content: null}
                    ]}
                },
                {
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
                        {word: "y", content: null},
                        {word: "a", content: null}
                    ]}
                }
            ],
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
    });

});
