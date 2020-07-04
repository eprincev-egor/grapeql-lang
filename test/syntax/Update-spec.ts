
import {testSyntax} from "../testSyntax";
import {Update} from "../../lib/syntax/Update";

describe("Update", () => {

    testSyntax(Update, {
        str: "update companies set name = 'nice'",
        shouldBe: {
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            star: false,
            set: [
                {
                    column: {word: "name"},
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ]
        }
    });

    testSyntax(Update, {
        str: "update only companies set name = 'nice'",
        shouldBe: {
            only: true,
            table: {link: [
                {word: "companies"}
            ], star: false},
            star: false,
            set: [
                {
                    column: {word: "name"},
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ]
        }
    });

    testSyntax(Update, {
        str: "update companies * set name = 'nice'",
        shouldBe: {
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            star: true,
            set: [
                {
                    column: {word: "name"},
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ]
        }
    });

    testSyntax(Update, {
        str: "update only companies * set name = 'nice'",
        shouldBe: {
            only: true,
            table: {link: [
                {word: "companies"}
            ], star: false},
            star: true,
            set: [
                {
                    column: {word: "name"},
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ]
        }
    });

    testSyntax(Update, {
        str: "update companies set name = 'nice', note = 'hello'",
        shouldBe: {
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            star: false,
            set: [
                {
                    column: {word: "name"},
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                },
                {
                    column: {word: "note"},
                    value: { value: {elements: [
                        {content: "hello"}
                    ]}}
                }
            ]
        }
    });

    testSyntax(Update, {
        str: "update companies set name = 'nice', (x, y) = ('hello', 'world')",
        shouldBe: {
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            star: false,
            set: [
                {
                    column: {word: "name"},
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                },
                {
                    columns: [
                        {word: "x"},
                        {word: "y"}
                    ],
                    values: [
                        { value: {elements: [
                            {content: "hello"}
                        ]}},
                        { value: {elements: [
                            {content: "world"}
                        ]}}
                    ]
                }
            ]
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
            only: true,
            table: {link: [
                {word: "companies"}
            ], star: false},
            star: true,
            set: [
                {
                    column: {word: "name"},
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                },
                {
                    columns: [
                        {word: "x"},
                        {word: "y"}
                    ],
                    values: [
                        { value: {elements: [
                            {content: "hello"}
                        ]}},
                        { value: {elements: [
                            {content: "world"}
                        ]}}
                    ]
                },
                {
                    select: {
                        columns: [
                            {
                                expression: {elements: [
                                    {star: false, link: [
                                        {word: "v1"}
                                    ]}
                                ]}
                            },
                            {
                                expression: {elements: [
                                    {star: false, link: [
                                        {word: "v2"}
                                    ]}
                                ]}
                            }
                        ],
                        from: [{
                            joins: [],
        
                            table: {star: false, link: [
                                {word: "requisites"}
                            ]}
                        }],
                        limit: "1"
                    },
                    columns: [
                        {word: "inn"},
                        {word: "kpp"}
                    ]
                }
            ]
        }
    });

    testSyntax(Update, {
        str: `update companies set 
            name = 'nice'
        where
            companies.id > 100
        `,
        shouldBe: {
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            star: false,
            set: [
                {
                    column: {word: "name"},
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            where: {elements: [
                {star: false, link: [
                    {word: "companies"},
                    {word: "id"}
                ]},
                {operator: ">"},
                {number: "100"}
            ]}
        }
    });

    testSyntax(Update, {
        str: `update public.companies as companies set 
            name = 'nice'
        where
            companies.id > 100
        `,
        shouldBe: {
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
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            where: {elements: [
                {star: false, link: [
                    {word: "companies"},
                    {word: "id"}
                ]},
                {operator: ">"},
                {number: "100"}
            ]}
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
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            star: false,
            set: [
                {
                    column: {word: "name"},
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            from: [{
                joins: [],

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
            ]}
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
                queries: [{
                    name: {word: "x1"},
                    select: {
                        columns: [
                            {
                                expression: {elements: [
                                    {number: "1"}
                                ]},
                                as: {word: "id"}
                            }
                        ]
                    }
                }]
            },
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            star: false,
            set: [
                {
                    column: {word: "name"},
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            from: [{
                joins: [],

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
                    columns: [
                        {
                            expression: {elements: [
                                {star: false, link: [
                                    {word: "id"}
                                ]}
                            ]}
                        }
                    ],
                    from: [{
                        joins: [],
        
                        table: {star: false, link: [
                            {word: "x1"}
                        ]}
                    }]
            }]}
            ]}
        }
    });

    testSyntax(Update, {
        str: "update companies set name = 'nice' returning *",
        shouldBe: {
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            star: false,
            set: [
                {
                    column: {word: "name"},
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            returning: {
                returningColumns: [
                    {
                        expression: {elements: [
                            {star: true, link: []}
                        ]}
                    }
                ]
            }
        }
    });

    testSyntax(Update, {
        str: "update companies set name = 'nice' returning id, id_client",
        shouldBe: {
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            star: false,
            set: [
                {
                    column: {word: "name"},
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            returning: {
                returningColumns: [
                    {
                        expression: {elements: [
                            {star: false, link: [
                                {word: "id"}
                            ]}
                        ]}
                    },
                    {
                        expression: {elements: [
                            {star: false, link: [
                                {word: "id_client"}
                            ]}
                        ]}
                    }
                ]
            }
        }
    });

    testSyntax(Update, {
        str: "update companies set name = 'nice' returning *, id",
        shouldBe: {
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            star: false,
            set: [
                {
                    column: {word: "name"},
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            returning: {
                returningColumns: [
                    {
                        expression: {elements: [
                            {star: true, link: []}
                        ]}
                    },
                    {
                        expression: {elements: [
                            {star: false, link: [
                                {word: "id"}
                            ]}
                        ]}
                    }
                ]
            }
        }
    });

    testSyntax(Update, {
        str: "update companies set name = 'nice' returning 1 as x",
        shouldBe: {
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            star: false,
            set: [
                {
                    column: {word: "name"},
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
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
            only: false,
            table: {link: [
                {word: "companies"}
            ], star: false},
            star: false,
            set: [
                {
                    column: {word: "name"},
                    value: { value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
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
