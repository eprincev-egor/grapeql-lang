
import {Update} from "../../lib/syntax/Update";
import testSyntax from "../testSyntax";

describe("Update", () => {

    testSyntax(Update, {
        str: "update companies set name = 'nice'",
        result: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            from: null,
            where: null,
            returning: null
        }
    });

    testSyntax(Update, {
        str: "update only companies set name = 'nice'",
        result: {
            with: null,
            only: true,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            from: null,
            where: null,
            returning: null
        }
    });

    testSyntax(Update, {
        str: "update companies * set name = 'nice'",
        result: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: true,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            from: null,
            where: null,
            returning: null
        }
    });

    testSyntax(Update, {
        str: "update only companies * set name = 'nice'",
        result: {
            with: null,
            only: true,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: true,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            from: null,
            where: null,
            returning: null
        }
    });

    testSyntax(Update, {
        str: "update companies set name = 'nice', note = 'hello'",
        result: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                },
                {
                    column: {word: "note", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "hello"}
                    ]}}
                }
            ],
            from: null,
            where: null,
            returning: null
        }
    });

    testSyntax(Update, {
        str: "update companies set name = 'nice', (x, y) = ('hello', 'world')",
        result: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                },
                {
                    select: null,
                    columns: [
                        {word: "x", content: null},
                        {word: "y", content: null}
                    ],
                    values: [
                        {default: null, value: {elements: [
                            {content: "hello"}
                        ]}},
                        {default: null, value: {elements: [
                            {content: "world"}
                        ]}}
                    ],
                    column: null,
                    value: null
                }
            ],
            from: null,
            where: null,
            returning: null
        }
    });

    testSyntax(Update, {
        str: `update
        only companies * set
            name = 'nice',
            (x, y) = ('hello', 'world'),
            (inn, kpp) = (
                select v1, v2
                from requisites
                limit 1
            )
        `,
        result: {
            with: null,
            only: true,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: true,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                },
                {
                    select: null,
                    columns: [
                        {word: "x", content: null},
                        {word: "y", content: null}
                    ],
                    values: [
                        {default: null, value: {elements: [
                            {content: "hello"}
                        ]}},
                        {default: null, value: {elements: [
                            {content: "world"}
                        ]}}
                    ],
                    column: null,
                    value: null
                },
                {
                    select: {
                        with: null,
                        columns: [
                            {
                                expression: {elements: [
                                    {star: false, link: [
                                        {word: "v1", content: null}
                                    ]}
                                ]},
                                as: null
                            },
                            {
                                expression: {elements: [
                                    {star: false, link: [
                                        {word: "v2", content: null}
                                    ]}
                                ]},
                                as: null
                            }
                        ],
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
                                {word: "requisites", content: null}
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
                        limit: "1",
                        fetch: null
                    },
                    columns: [
                        {word: "inn", content: null},
                        {word: "kpp", content: null}
                    ],
                    values: null,
                    column: null,
                    value: null
                }
            ],
            from: null,
            where: null,
            returning: null
        }
    });

    testSyntax(Update, {
        str: `update companies set 
            name = 'nice'
        where
            companies.id > 100
        `,
        result: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            from: null,
            where: {elements: [
                {star: false, link: [
                    {word: "companies", content: null},
                    {word: "id", content: null}
                ]},
                {operator: ">"},
                {number: "100"}
            ]},
            returning: null
        }
    });

    testSyntax(Update, {
        str: `update public.companies as companies set 
            name = 'nice'
        where
            companies.id > 100
        `,
        result: {
            with: null,
            only: false,
            table: {link: [
                {word: "public", content: null},
                {word: "companies", content: null}
            ], star: false},
            as: {word: "companies", content: null},
            star: false,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            from: null,
            where: {elements: [
                {star: false, link: [
                    {word: "companies", content: null},
                    {word: "id", content: null}
                ]},
                {operator: ">"},
                {number: "100"}
            ]},
            returning: null
        }
    });

    testSyntax(Update, {
        str: `update companies set 
            name = 'nice'
        from orders
        where
            orders.id_client = companies.id and
            orders.need_update
        `,
        result: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
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
                    {word: "orders", content: null}
                ]}
            }],
            where: {elements: [
                {star: false, link: [
                    {word: "orders", content: null},
                    {word: "id_client", content: null}
                ]},
                {operator: "="},
                {star: false, link: [
                    {word: "companies", content: null},
                    {word: "id", content: null}
                ]},
                {operator: "and"},
                {star: false, link: [
                    {word: "orders", content: null},
                    {word: "need_update", content: null}
                ]}
            ]},
            returning: null
        }
    });

    testSyntax(Update, {
        str: `with x1 as (select 1 as id) 
        update companies set 
            name = 'nice'
        from orders
        where
            orders.id_client = companies.id and
            orders.need_update and
            orders.id_country = (select id from x1)
        `,
        result: {
            with: {
                recursive: null,
                queries: [{
                    name: {word: "x1", content: null},
                    columns: null,
                    select: {
                        with: null,
                        columns: [
                            {
                                expression: {elements: [
                                    {number: "1"}
                                ]},
                                as: {word: "id", content: null}
                            }
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
                    },
                    values: null
                }]
            },
            only: false,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
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
                    {word: "orders", content: null}
                ]}
            }],
            where: {elements: [
                {star: false, link: [
                    {word: "orders", content: null},
                    {word: "id_client", content: null}
                ]},
                {operator: "="},
                {star: false, link: [
                    {word: "companies", content: null},
                    {word: "id", content: null}
                ]},
                {operator: "and"},
                {star: false, link: [
                    {word: "orders", content: null},
                    {word: "need_update", content: null}
                ]},
                {operator: "and"},
                {star: false, link: [
                    {word: "orders", content: null},
                    {word: "id_country", content: null}
                ]},
                {operator: "="},
                {elements: [{
                    with: null,
                    columns: [
                        {
                            expression: {elements: [
                                {star: false, link: [
                                    {word: "id", content: null}
                                ]}
                            ]},
                            as: null
                        }
                    ],
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
                            {word: "x1", content: null}
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
            }]}
            ]},
            returning: null
        }
    });

    testSyntax(Update, {
        str: "update companies set name = 'nice' returning *",
        result: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            from: null,
            where: null,
            returning: {
                returningColumns: [
                    {
                        expression: {elements: [
                            {star: true, link: []}
                        ]},
                        as: null
                    }
                ]
            }
        }
    });

    testSyntax(Update, {
        str: "update companies set name = 'nice' returning id, id_client",
        result: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            from: null,
            where: null,
            returning: {
                returningColumns: [
                    {
                        expression: {elements: [
                            {star: false, link: [
                                {word: "id", content: null}
                            ]}
                        ]},
                        as: null
                    },
                    {
                        expression: {elements: [
                            {star: false, link: [
                                {word: "id_client", content: null}
                            ]}
                        ]},
                        as: null
                    }
                ]
            }
        }
    });

    testSyntax(Update, {
        str: "update companies set name = 'nice' returning *, id",
        result: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            from: null,
            where: null,
            returning: {
                returningColumns: [
                    {
                        expression: {elements: [
                            {star: true, link: []}
                        ]},
                        as: null
                    },
                    {
                        expression: {elements: [
                            {star: false, link: [
                                {word: "id", content: null}
                            ]}
                        ]},
                        as: null
                    }
                ]
            }
        }
    });

    testSyntax(Update, {
        str: "update companies set name = 'nice' returning 1 as x",
        result: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            from: null,
            where: null,
            returning: {
                returningColumns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]},
                        as: {word: "x", content: null}
                    }
                ]
            }
        }
    });

    testSyntax(Update, {
        str: "update companies set name = 'nice' where true returning 1 as x",
        result: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            from: null,
            where: {elements: [
                {boolean: true}
            ]},
            returning: {
                returningColumns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]},
                        as: {word: "x", content: null}
                    }
                ]
            }
        }
    });

});
