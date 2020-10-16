import {testSyntax} from "../testSyntax";
import {Select} from "../../lib/syntax/Select";
import {GrapeQLCoach} from "../../lib/GrapeQLCoach";
import assert from "assert";

describe("Select", () => {

    testSyntax(Select, {
        str: "select",
        shouldBe: {
        }
    });

    testSyntax(Select, {
        str: "select 1, 2 into a, new.b",
        shouldBe: {
            columns: [
                {
                    expression: {elements: [
                        {number: "1"}
                    ]}
                },
                {
                    expression: {elements: [
                        {number: "2"}
                    ]}
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
            ]
        }
    });

    testSyntax(Select, {
        str: "select 1, 2, 3",
        shouldBe: {
            columns: [
                {
                    expression: {elements: [
                        {number: "1"}
                    ]}
                },
                {
                    expression: {elements: [
                        {number: "2"}
                    ]}
                },
                {
                    expression: {elements: [
                        {number: "3"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Select, {
        str: "select 1 where false",
        shouldBe: {
            columns: [
                {
                    expression: {elements: [
                        {number: "1"}
                    ]}
                }
            ],
            where: {elements: [
                {boolean: false}
            ]}
        }
    });

    testSyntax(Select, {
        str: "select * from orders order by id",
        shouldBe: {
            columns: [
                {
                    expression: {elements: [
                        {star: true, link: []}
                    ]}
                }
            ],
            from: [
                {
                    joins: [],

                    table: {star: false, link: [
                        {word: "orders"}
                    ]}
                }
            ],
            orderBy: [
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "id"}
                        ]}
                    ]},
                    vector: "asc"
                }
            ]
        }
    });

    testSyntax(Select, {
        str: "select sum( payments ) from orders group by orders.client",
        shouldBe: {
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
                            arguments: [{elements: [
                                {star: false, link: [
                                    {word: "payments"}
                                ]}
                            ]}]
                        }
                    ]}
                }
            ],
            from: [
                {
                    joins: [],

                    table: {star: false, link: [
                        {word: "orders"}
                    ]}
                }
            ],
            groupBy: [
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "orders"},
                            {word: "client"}
                        ]}
                    ]}
                }
            ]
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
                            arguments: [{elements: [
                                {star: false, link: [
                                    {word: "payments"}
                                ]}
                            ]}]
                        }
                    ]}
                }
            ],
            from: [
                {
                    joins: [],

                    table: {star: false, link: [
                        {word: "orders"}
                    ]}
                }
            ],
            groupBy: [
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "order_date"}
                        ]}
                    ]}
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
                    arguments: [{elements: [
                        {star: false, link: [
                            {word: "payments"}
                        ]}
                    ]}]
                },
                {operator: "is not"},
                {null: true}
            ]}
        }
    });

    
    testSyntax(Select, {
        str: "select * from orders offset 1",
        shouldBe: {
            columns: [
                {
                    expression: {elements: [
                        {star: true, link: []}
                    ]}
                }
            ],
            from: [
                {
                    joins: [],

                    table: {star: false, link: [
                        {word: "orders"}
                    ]}
                }
            ],
            offset: "1"
        }
    });

    testSyntax(Select, {
        str: "select * from orders offset 1 row",
        shouldBe: {
            columns: [
                {
                    expression: {elements: [
                        {star: true, link: []}
                    ]}
                }
            ],
            from: [
                {
                    joins: [],

                    table: {star: false, link: [
                        {word: "orders"}
                    ]}
                }
            ],
            offset: "1",
            offsetRow: true
        }
    });

    
    testSyntax(Select, {
        str: "select * from orders offset 10 rows",
        shouldBe: {
            columns: [
                {
                    expression: {elements: [
                        {star: true, link: []}
                    ]}
                }
            ],
            from: [
                {
                    joins: [],

                    table: {star: false, link: [
                        {word: "orders"}
                    ]}
                }
            ],
            offset: "10",
            offsetRows: true
        }
    });


    testSyntax(Select, {
        str: "select * from orders limit 1",
        shouldBe: {
            columns: [
                {
                    expression: {elements: [
                        {star: true, link: []}
                    ]}
                }
            ],
            from: [
                {
                    joins: [],

                    table: {star: false, link: [
                        {word: "orders"}
                    ]}
                }
            ],
            limit: "1"
        }
    });
    
    testSyntax(Select, {
        str: "select * from orders limit all",
        shouldBe: {
            columns: [
                {
                    expression: {elements: [
                        {star: true, link: []}
                    ]}
                }
            ],
            from: [
                {
                    joins: [],

                    table: {star: false, link: [
                        {word: "orders"}
                    ]}
                }
            ],
            limit: "all"
        }
    });
    
    testSyntax(Select, {
        str: "select * from orders offset 1 limit 1",
        shouldBe: {
            columns: [
                {
                    expression: {elements: [
                        {star: true, link: []}
                    ]}
                }
            ],
            from: [
                {
                    joins: [],

                    table: {star: false, link: [
                        {word: "orders"}
                    ]}
                }
            ],
            offset: "1",
            limit: "1"
        }
    });

    testSyntax(Select, {
        str: "select * from orders limit 1 offset 1",
        shouldBe: {
            columns: [
                {
                    expression: {elements: [
                        {star: true, link: []}
                    ]}
                }
            ],
            from: [
                {
                    joins: [],

                    table: {star: false, link: [
                        {word: "orders"}
                    ]}
                }
            ],
            offset: "1",
            limit: "1"
        }
    });

    testSyntax(Select, {
        str: "select limit 1",
        shouldBe: {
            limit: "1"
        }
    });

    testSyntax(Select, {
        str: "select * from orders fetch first row only",
        shouldBe: {
            columns: [
                {
                    expression: {elements: [
                        {star: true, link: []}
                    ]}
                }
            ],
            from: [
                {
                    joins: [],

                    table: {star: false, link: [
                        {word: "orders"}
                    ]}
                }
            ],
            fetch: {
                first: true,
                row: true
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
                        select: {
                        }
                    }
                ]
            },
            columns: [
                {
                    expression: {elements: [
                        {star: true, link: []}
                    ]}
                }
            ],
            from: [
                {
                    joins: [],

                    table: {star: false, link: [
                        {word: "x"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Select, {
        str: "select 1 union all select 2",
        shouldBe: {
            columns: [
                {
                    expression: {elements: [
                        {number: "1"}
                    ]}
                }
            ],
            union: {
                union: true,
                all: true,
                select: {
                    columns: [
                        {
                            expression: {elements: [
                                {number: "2"}
                            ]}
                        }
                    ]
                }
            }
        }
    });

    testSyntax(Select, {
        str: "select from company window x as (order by company.name), y as (order by company.id)",
        shouldBe: {
            from: [
                {
                    joins: [],

                    table: {star: false, link: [
                        {word: "company"}
                    ]}
                }
            ],
            window: [
                {
                    as: {word: "x"},
                    body: {
                        orderBy: [
                            {
                                expression: {elements: [
                                    {star: false, link: [
                                        {word: "company"},
                                        {word: "name"}
                                    ]}
                                ]},
                                vector: "asc"
                            }
                        ]
                    }
                },
                {
                    as: {word: "y"},
                    body: {
                        orderBy: [
                            {
                                expression: {elements: [
                                    {star: false, link: [
                                        {word: "company"},
                                        {word: "id"}
                                    ]}
                                ]},
                                vector: "asc"
                            }
                        ]
                    }
                }
            ]
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
            from: [
                {
                    joins: [],

                    table: {star: false, link: [
                        {word: "x"},
                        {word: "a"}
                    ]}
                },
                {
                    joins: [],

                    table: {star: false, link: [
                        {word: "y"},
                        {word: "a"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Select, {
        str: `select 
                distinct on (a, b)
                a, b, c
            from table
        `,
        shouldBe: {
            distinctOn: [
                {elements: [
                    {link: [{word: "a"}]}
                ]},
                {elements: [
                    {link: [{word: "b"}]}
                ]}
            ],
            columns: [
                {expression: {elements: [
                    {link: [{word: "a"}]}
                ]}},
                {expression: {elements: [
                    {link: [{word: "b"}]}
                ]}},
                {expression: {elements: [
                    {link: [{word: "c"}]}
                ]}}
            ],
            from: [{
                table: {link: [
                    {word: "table"}
                ]}
            }]
        }
    });

    testSyntax(Select, {
        str: `select first( union_query.name )
        from (
            select companies.name
            from companies

            union

            select companies.note
            from companies
        ) as union_query
        `,
        shouldBe: {
            from: [{
                as: {word: "union_query"},
                select: {
                    columns: [{
                        expression: {elements: [
                            {link: [
                                {word: "companies"},
                                {word: "name"}
                            ]}
                        ]}
                    }],
                    from: [{
                        table: {link: [
                            {word: "companies"}
                        ]}
                    }],
                    union: {union: true, select: {
                        columns: [{
                            expression: {elements: [
                                {link: [
                                    {word: "companies"},
                                    {word: "note"}
                                ]}
                            ]}
                        }],
                        from: [{
                            table: {link: [
                                {word: "companies"}
                            ]}
                        }]
                    }}
                }
            }]
        }
    });

    testSyntax(Select, {
        str: `select first( union_query.name )
        from (
            select companies.name
            from companies

            intersect

            select companies.note
            from companies
        ) as union_query
        `,
        shouldBe: {
            from: [{
                as: {word: "union_query"},
                select: {
                    columns: [{
                        expression: {elements: [
                            {link: [
                                {word: "companies"},
                                {word: "name"}
                            ]}
                        ]}
                    }],
                    from: [{
                        table: {link: [
                            {word: "companies"}
                        ]}
                    }],
                    union: {intersect: true, select: {
                        columns: [{
                            expression: {elements: [
                                {link: [
                                    {word: "companies"},
                                    {word: "note"}
                                ]}
                            ]}
                        }],
                        from: [{
                            table: {link: [
                                {word: "companies"}
                            ]}
                        }]
                    }}
                }
            }]
        }
    });

    testSyntax(Select, {
        str: `select first( union_query.name )
        from (
            select companies.name
            from companies

            except

            select companies.note
            from companies
        ) as union_query
        `,
        shouldBe: {
            from: [{
                as: {word: "union_query"},
                select: {
                    columns: [{
                        expression: {elements: [
                            {link: [
                                {word: "companies"},
                                {word: "name"}
                            ]}
                        ]}
                    }],
                    from: [{
                        table: {link: [
                            {word: "companies"}
                        ]}
                    }],
                    union: {except: true, select: {
                        columns: [{
                            expression: {elements: [
                                {link: [
                                    {word: "companies"},
                                    {word: "note"}
                                ]}
                            ]}
                        }],
                        from: [{
                            table: {link: [
                                {word: "companies"}
                            ]}
                        }]
                    }}
                }
            }]
        }
    });

    it("sub selects should be inside brackets", () => {
        const coach = new GrapeQLCoach("select (select 1)");
        const select = coach.parse(Select);
        const actualSQL = select.toString();

        assert.ok(
            /^\s*select\s+\(\s*select\s+1\s*\)\s*$/i.test(actualSQL),
            "actual: " + actualSQL
        );
    });

});
