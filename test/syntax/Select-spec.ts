
import {testSyntax} from "../testSyntax";
import {Select} from "../../lib/syntax/Select";

describe("Select", () => {

    testSyntax(Select, {
        str: "select",
        shouldBe: {
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
        shouldBe: {
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
                    {word: "a"}
                ]},
                {star: false, link: [
                    {word: "new"},
                    {word: "b"}
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
        shouldBe: {
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
        shouldBe: {
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
        shouldBe: {
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
                        {word: "orders"}
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
                            {word: "id"}
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
        shouldBe: {
            with: null,
            columns: [
                {
                    expression: {elements: [
                        {
                            function: {
                                star: false,
                                link: [
                                    {word: "sum"}
                                ]
                            },
                            all: null,
                            distinct: null,
                            arguments: [{elements: [
                                {star: false, link: [
                                    {word: "payments"}
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
                        {word: "orders"}
                    ]}
                }
            ],
            where: null,
            groupBy: [
                {
                    cube: null,
                    expression: {elements: [
                        {star: false, link: [
                            {word: "orders"},
                            {word: "client"}
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
        shouldBe: {
            with: null,
            columns: [
                {
                    expression: {elements: [
                        {
                            function: {
                                star: false,
                                link: [
                                    {word: "sum"}
                                ]
                            },
                            all: null,
                            distinct: null,
                            arguments: [{elements: [
                                {star: false, link: [
                                    {word: "payments"}
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
                        {word: "orders"}
                    ]}
                }
            ],
            where: null,
            groupBy: [
                {
                    cube: null,
                    expression: {elements: [
                        {star: false, link: [
                            {word: "order_date"}
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
                            {word: "sum"}
                        ]
                    },
                    all: null,
                    distinct: null,
                    arguments: [{elements: [
                        {star: false, link: [
                            {word: "payments"}
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
        shouldBe: {
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
                        {word: "orders"}
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
        shouldBe: {
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
                        {word: "orders"}
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
        shouldBe: {
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
                        {word: "orders"}
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
        shouldBe: {
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
                        {word: "orders"}
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
        shouldBe: {
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
                        {word: "orders"}
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
        shouldBe: {
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
                        {word: "orders"}
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
        shouldBe: {
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
                        {word: "orders"}
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
        shouldBe: {
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
        shouldBe: {
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
                        {word: "orders"}
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
        shouldBe: {
            with: {
                recursive: true,
                queries: [
                    {
                        name: {word: "x"},
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
                        {word: "x"}
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
        shouldBe: {
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
        shouldBe: {
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
                        {word: "company"}
                    ]}
                }
            ],
            where: null,
            groupBy: null,
            having: null,
            window: [
                {
                    as: {word: "x"},
                    body: {
                        windowDefinition: null,
                        partitionBy: null,
                        orderBy: [
                            {
                                expression: {elements: [
                                    {star: false, link: [
                                        {word: "company"},
                                        {word: "name"}
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
                    as: {word: "y"},
                    body: {
                        windowDefinition: null,
                        partitionBy: null,
                        orderBy: [
                            {
                                expression: {elements: [
                                    {star: false, link: [
                                        {word: "company"},
                                        {word: "id"}
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
        shouldBe: {
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
                        {word: "x"},
                        {word: "a"}
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
                        {word: "y"},
                        {word: "a"}
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
