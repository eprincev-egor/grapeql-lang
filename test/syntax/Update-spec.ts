
import {testSyntax} from "../testSyntax";
import {Update} from "../../lib/syntax/Update";

describe("Update", () => {

    testSyntax(Update, {
        str: "update companies set name = 'nice'",
        shouldBe: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name"},
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
        shouldBe: {
            with: null,
            only: true,
            table: {link: [
                {word: "companies"}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name"},
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
        shouldBe: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            as: null,
            star: true,
            set: [
                {
                    column: {word: "name"},
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
        shouldBe: {
            with: null,
            only: true,
            table: {link: [
                {word: "companies"}
            ], star: false},
            as: null,
            star: true,
            set: [
                {
                    column: {word: "name"},
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
        shouldBe: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name"},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                },
                {
                    column: {word: "note"},
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
        shouldBe: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name"},
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
                        {word: "x"},
                        {word: "y"}
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
        shouldBe: {
            with: null,
            only: true,
            table: {link: [
                {word: "companies"}
            ], star: false},
            as: null,
            star: true,
            set: [
                {
                    column: {word: "name"},
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
                        {word: "x"},
                        {word: "y"}
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
                                        {word: "v1"}
                                    ]}
                                ]},
                                as: null
                            },
                            {
                                expression: {elements: [
                                    {star: false, link: [
                                        {word: "v2"}
                                    ]}
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
                                {word: "requisites"}
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
                        {word: "inn"},
                        {word: "kpp"}
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
        shouldBe: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name"},
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
                    {word: "companies"},
                    {word: "id"}
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
        shouldBe: {
            with: null,
            only: false,
            table: {link: [
                {word: "public"},
                {word: "companies"}
            ], star: false},
            as: {word: "companies"},
            star: false,
            set: [
                {
                    column: {word: "name"},
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
                    {word: "companies"},
                    {word: "id"}
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
        shouldBe: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name"},
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
                    {word: "orders"}
                ]}
            }],
            where: {elements: [
                {star: false, link: [
                    {word: "orders"},
                    {word: "id_client"}
                ]},
                {operator: "="},
                {star: false, link: [
                    {word: "companies"},
                    {word: "id"}
                ]},
                {operator: "and"},
                {star: false, link: [
                    {word: "orders"},
                    {word: "need_update"}
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
        shouldBe: {
            with: {
                recursive: null,
                queries: [{
                    name: {word: "x1"},
                    columns: null,
                    select: {
                        with: null,
                        columns: [
                            {
                                expression: {elements: [
                                    {number: "1"}
                                ]},
                                as: {word: "id"}
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
                    },
                    values: null
                }]
            },
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name"},
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
                    {word: "orders"}
                ]}
            }],
            where: {elements: [
                {star: false, link: [
                    {word: "orders"},
                    {word: "id_client"}
                ]},
                {operator: "="},
                {star: false, link: [
                    {word: "companies"},
                    {word: "id"}
                ]},
                {operator: "and"},
                {star: false, link: [
                    {word: "orders"},
                    {word: "need_update"}
                ]},
                {operator: "and"},
                {star: false, link: [
                    {word: "orders"},
                    {word: "id_country"}
                ]},
                {operator: "="},
                {elements: [{
                    with: null,
                    columns: [
                        {
                            expression: {elements: [
                                {star: false, link: [
                                    {word: "id"}
                                ]}
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
                            {word: "x1"}
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
        shouldBe: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name"},
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
        shouldBe: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name"},
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
                                {word: "id"}
                            ]}
                        ]},
                        as: null
                    },
                    {
                        expression: {elements: [
                            {star: false, link: [
                                {word: "id_client"}
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
        shouldBe: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name"},
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
                                {word: "id"}
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
        shouldBe: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name"},
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
                        as: {word: "x"}
                    }
                ]
            }
        }
    });

    testSyntax(Update, {
        str: "update companies set name = 'nice' where true returning 1 as x",
        shouldBe: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name"},
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
                        as: {word: "x"}
                    }
                ]
            }
        }
    });

});
