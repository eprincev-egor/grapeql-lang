
import {testSyntax} from "../testSyntax";
import {CacheFor} from "../../lib/syntax/CacheFor";

describe("CacheFor", () => {

    testSyntax(CacheFor, {
        str: `cache gtd_totals for orders (
            select 
                string_agg(distinct gtds.doc_number, ', ') as gtds_numbers
            from gtds
            where
                gtds.id_order = orders.id
        )`,
        shouldBe: {
            name: {word: "gtd_totals"},
            for: {star: false, link: [
                {word: "orders"}
            ]},
            cache: {
                columns: [
                    {
                        expression: {elements: [
                            {
                                function: {
                                    star: false,
                                    link: [
                                        {word: "string_agg"}
                                    ]
                                },
                                distinct: true,
                                arguments: [
                                    {elements: [
                                        {star: false, link: [
                                            {word: "gtds"},
                                            {word: "doc_number"}
                                        ]}
                                    ]},
                                    {elements: [
                                        {content: ", "}
                                    ]}
                                ]
                            }
                        ]},
                        as: {word: "gtds_numbers"}
                    }
                ],
                from: [
                    {
                        joins: [],
                        table: {star: false, link: [
                            {word: "gtds"}
                        ]}
                    }
                ],
                where: {elements: [
                    {star: false, link: [
                        {word: "gtds"},
                        {word: "id_order"}
                    ]},
                    {operator: "="},
                    {star: false, link: [
                        {word: "orders"},
                        {word: "id"}
                    ]}
                ]}
            }
        }
    });

    testSyntax(CacheFor, {
        str: `cache gtd_totals for orders as my_order (
            select 
                string_agg(distinct gtds.doc_number, ', ') as gtds_numbers,
                array_agg(gtds.id) as gtds_ids
            from gtds
            where
                gtds.id_order = my_order.id
        )`,
        shouldBe: {
            name: {word: "gtd_totals"},
            for: {star: false, link: [
                {word: "orders"}
            ]},
            as: {word: "my_order"},
            cache: {
                columns: [
                    {
                        expression: {elements: [
                            {
                                function: {
                                    star: false,
                                    link: [
                                        {word: "string_agg"}
                                    ]
                                },
                                distinct: true,
                                arguments: [
                                    {elements: [
                                        {star: false, link: [
                                            {word: "gtds"},
                                            {word: "doc_number"}
                                        ]}
                                    ]},
                                    {elements: [
                                        {content: ", "}
                                    ]}
                                ]
                            }
                        ]},
                        as: {word: "gtds_numbers"}
                    },
                    {
                        expression: {elements: [
                            {
                                function: {
                                    star: false,
                                    link: [
                                        {word: "array_agg"}
                                    ]
                                },
                                arguments: [
                                    {elements: [
                                        {star: false, link: [
                                            {word: "gtds"},
                                            {word: "id"}
                                        ]}
                                    ]}
                                ]
                            }
                        ]},
                        as: {word: "gtds_ids"}
                    }
                ],
                from: [
                    {
                        joins: [],
                        table: {star: false, link: [
                            {word: "gtds"}
                        ]}
                    }
                ],
                where: {elements: [
                    {star: false, link: [
                        {word: "gtds"},
                        {word: "id_order"}
                    ]},
                    {operator: "="},
                    {star: false, link: [
                        {word: "my_order"},
                        {word: "id"}
                    ]}
                ]}
            }
        }
    });

    testSyntax(CacheFor, {
        str: `cache totals for companies (
            select

              string_agg(distinct order_type.name, ', ') as orders_types_names,
              string_agg(distinct country.name, ', ') as orders_countries_names

            from orders

            left join order_type on
              order_type.id = orders.id_order_type
            
            left join countries as country on
                country.id = orders.id_country
          )
          without triggers on order_type
          without triggers on country`,
        shouldBe: {
            name: {word: "totals"},
            for: {star: false, link: [
                {word: "companies"}
            ]},
            cache: {
                columns: [
                    {
                        expression: {elements: [
                            {
                                function: {
                                    star: false,
                                    link: [
                                        {word: "string_agg"}
                                    ]
                                },
                                distinct: true,
                                arguments: [
                                    {elements: [
                                        {star: false, link: [
                                            {word: "order_type"},
                                            {word: "name"}
                                        ]}
                                    ]},
                                    {elements: [
                                        {content: ", "}
                                    ]}
                                ]
                            }
                        ]},
                        as: {word: "orders_types_names"}
                    },
                    {
                        expression: {elements: [
                            {
                                function: {
                                    star: false,
                                    link: [
                                        {word: "string_agg"}
                                    ]
                                },
                                distinct: true,
                                arguments: [
                                    {elements: [
                                        {star: false, link: [
                                            {word: "country"},
                                            {word: "name"}
                                        ]}
                                    ]},
                                    {elements: [
                                        {content: ", "}
                                    ]}
                                ]
                            }
                        ]},
                        as: {word: "orders_countries_names"}
                    }
                ],
                from: [
                    {
                        table: {star: false, link: [
                            {word: "orders"}
                        ]},
                        joins: [
                            {
                                type: "left join",
                                from: {
                                    joins: [],
                
                                    table: {star: false, link: [
                                        {word: "order_type"}
                                    ]}
                                },
                                on: {elements: [
                                    {link: [
                                        {word: "order_type"},
                                        {word: "id"}
                                    ]},
                                    {operator: "="},
                                    {link: [
                                        {word: "orders"},
                                        {word: "id_order_type"}
                                    ]}
                                ]}
                            },
                            {
                                type: "left join",
                                from: {
                                    joins: [],
                
                                    table: {star: false, link: [
                                        {word: "countries"}
                                    ]},
                                    as: {word: "country"}
                                },
                                on: {elements: [
                                    {link: [
                                        {word: "country"},
                                        {word: "id"}
                                    ]},
                                    {operator: "="},
                                    {link: [
                                        {word: "orders"},
                                        {word: "id_country"}
                                    ]}
                                ]}
                            }
                        ]
                    }
                ]
            },
            withoutTriggers: [
                {link: [
                    {word: "order_type"}
                ]},
                {link: [
                    {word: "country"}
                ]}
            ]
        }
    });

    testSyntax(CacheFor, {
        str: `cache totals for companies (
            select
              string_agg(distinct order_type.name, ', ') as orders_types_names
            from orders

            left join order_type on
              order_type.id = orders.id_order_type
          )
          without trigger on order_type`,
        shouldBe: {
            name: {word: "totals"},
            for: {star: false, link: [
                {word: "companies"}
            ]},
            cache: {
                columns: [
                    {
                        expression: {elements: [
                            {
                                function: {
                                    star: false,
                                    link: [
                                        {word: "string_agg"}
                                    ]
                                },
                                distinct: true,
                                arguments: [
                                    {elements: [
                                        {star: false, link: [
                                            {word: "order_type"},
                                            {word: "name"}
                                        ]}
                                    ]},
                                    {elements: [
                                        {content: ", "}
                                    ]}
                                ]
                            }
                        ]},
                        as: {word: "orders_types_names"}
                    }
                ],
                from: [
                    {
                        table: {star: false, link: [
                            {word: "orders"}
                        ]},
                        joins: [
                            {
                                type: "left join",
                                from: {
                                    joins: [],
                
                                    table: {star: false, link: [
                                        {word: "order_type"}
                                    ]}
                                },
                                on: {elements: [
                                    {link: [
                                        {word: "order_type"},
                                        {word: "id"}
                                    ]},
                                    {operator: "="},
                                    {link: [
                                        {word: "orders"},
                                        {word: "id_order_type"}
                                    ]}
                                ]}
                            }
                        ]
                    }
                ]
            },
            withoutTriggers: [
                {link: [
                    {word: "order_type"}
                ]}
            ]
        }
    });


    testSyntax(CacheFor, {
        str: `cache totals for companies (
                select
                    min( orders.id ) as min_order_id,
                    max( orders.id ) as max_order_id,
                    array_agg( orders.id ) as orders_ids
                from orders
                where
                    orders.id_client = companies.id
          )
          index gin on (orders_ids)
          index btree on (min_order_id, max_order_id)
          index gin on ((ARRAY[min_order_id, max_order_id]::integer[]))`,
        shouldBe: {
            name: {word: "totals"},
            for: {star: false, link: [
                {word: "companies"}
            ]},
            cache: {
                columns: [
                    {
                        expression: {elements: [
                            {
                                function: {
                                    star: false,
                                    link: [
                                        {word: "min"}
                                    ]
                                },
                                arguments: [
                                    {elements: [
                                        {star: false, link: [
                                            {word: "orders"},
                                            {word: "id"}
                                        ]}
                                    ]}
                                ]
                            }
                        ]},
                        as: {word: "min_order_id"}
                    },
                    {
                        expression: {elements: [
                            {
                                function: {
                                    star: false,
                                    link: [
                                        {word: "max"}
                                    ]
                                },
                                arguments: [
                                    {elements: [
                                        {star: false, link: [
                                            {word: "orders"},
                                            {word: "id"}
                                        ]}
                                    ]}
                                ]
                            }
                        ]},
                        as: {word: "max_order_id"}
                    },
                    {
                        expression: {elements: [
                            {
                                function: {
                                    star: false,
                                    link: [
                                        {word: "array_agg"}
                                    ]
                                },
                                arguments: [
                                    {elements: [
                                        {star: false, link: [
                                            {word: "orders"},
                                            {word: "id"}
                                        ]}
                                    ]}
                                ]
                            }
                        ]},
                        as: {word: "orders_ids"}
                    }
                ],
                from: [
                    {
                        table: {star: false, link: [
                            {word: "orders"}
                        ]}
                    }
                ],
                where: {elements: [
                    {star: false, link: [
                        {word: "orders"},
                        {word: "id_client"}
                    ]},
                    {operator: "="},
                    {star: false, link: [
                        {word: "companies"},
                        {word: "id"}
                    ]}
                ]}
            },
            indexes: [
                {
                    index: "gin",
                    on: [{word: "orders_ids"}]
                },
                {
                    index: "btree",
                    on: [{word: "min_order_id"}, {word: "max_order_id"}]
                },
                {
                    index: "gin",
                    on: [{elements: [
                        {array: [
                            {elements: [
                                {star: false, link: [
                                    {word: "min_order_id"}
                                ]}
                            ]},
                            {elements: [
                                {star: false, link: [
                                    {word: "max_order_id"}
                                ]}
                            ]}
                        ]},
                        {operator: "::"},
                        {type: "integer[]"}
                    ]}]
                }
            ]
        }
    });


    testSyntax(CacheFor, {
        str: `cache totals for companies (
                select
                    min( orders.id ) as min_order_id,
                    max( orders.id ) as max_order_id,
                    array_agg( orders.id ) as orders_ids
                from orders
                where
                    orders.id_client = companies.id
          )
          index btree on (max_order_id DESC NULLS LAST)`,
        shouldBe: {
            name: {word: "totals"},
            for: {star: false, link: [
                {word: "companies"}
            ]},
            indexes: [
                {
                    index: "btree",
                    on: [{word: "max_order_id"}]
                }
            ]
        }
    });

    testSyntax(CacheFor, {
        str: `cache totals for companies (
                select
                    min( orders.id ) as min_order_id,
                    max( orders.id ) as max_order_id,
                    array_agg( orders.id ) as orders_ids
                from orders
                where
                    orders.id_client = companies.id
          )
          index btree on (max_order_id NULLS FIRST)`,
        shouldBe: {
            name: {word: "totals"},
            for: {star: false, link: [
                {word: "companies"}
            ]},
            indexes: [
                {
                    index: "btree",
                    on: [{word: "max_order_id"}]
                }
            ]
        }
    });

    testSyntax(CacheFor, {
        str: `cache totals for companies (
                select
                    array_agg( orders.id )::json as orders_ids
                from orders
                where
                    orders.id_client = companies.id
          )
          index btree on (orders_ids jsonb_path_ops)`,
        shouldBe: {
            name: {word: "totals"},
            for: {star: false, link: [
                {word: "companies"}
            ]},
            indexes: [
                {
                    index: "btree",
                    on: [{word: "orders_ids"}]
                }
            ]
        }
    });

    testSyntax(CacheFor, {
        str: `cache totals for companies (
                select
                    last( orders.name )::json as last_order_name
                from orders
                where
                    orders.id_client = companies.id
          )
          index btree on (lower(last_order_name))`,
        shouldBe: {
            name: {word: "totals"},
            for: {star: false, link: [
                {word: "companies"}
            ]},
            indexes: [
                {
                    index: "btree",
                    on: [{elements: [
                        {
                            function: {
                                star: false,
                                link: [
                                    {word: "lower"}
                                ]
                            },
                            arguments: [
                                {elements: [
                                    {
                                        link: [
                                            {word: "last_order_name"}
                                        ]
                                    }
                                ]}
                            ]
                        }
                    ]}]
                }
            ]
        }
    });

    // SELECT distinct opc.opcname AS opclass_name
    // FROM pg_am am, pg_opclass opc
    // WHERE opc.opcmethod = am.oid
    testSyntax(CacheFor, {
        str: `cache totals for companies (
                select
                    string_agg( orders.name )::json as orders_names
                from orders
                where
                    orders.id_client = companies.id
          )
          index gist on (orders_names gist_trgm_ops)`,
        shouldBe: {
            name: {word: "totals"},
            for: {star: false, link: [
                {word: "companies"}
            ]},
            indexes: [
                {
                    index: "gist",
                    on: [{word: "orders_names"}]
                }
            ]
        }
    });

    testSyntax(CacheFor, {
        str: `cache totals for companies (
            select
                string_agg(distinct order_type.name, ', ') as orders_types_names
            from orders
          )
          without insert case on orders`,
        shouldBe: {
            name: {word: "totals"},
            for: {star: false, link: [
                {word: "companies"}
            ]},
            cache: {
                columns: [
                    {
                        expression: {elements: [
                            {
                                function: {
                                    star: false,
                                    link: [
                                        {word: "string_agg"}
                                    ]
                                },
                                distinct: true,
                                arguments: [
                                    {elements: [
                                        {star: false, link: [
                                            {word: "order_type"},
                                            {word: "name"}
                                        ]}
                                    ]},
                                    {elements: [
                                        {content: ", "}
                                    ]}
                                ]
                            }
                        ]},
                        as: {word: "orders_types_names"}
                    }
                ],
                from: [
                    {
                        table: {star: false, link: [
                            {word: "orders"}
                        ]}
                    }
                ]
            },
            withoutInsertOn: [
                {link: [
                    {word: "orders"}
                ]}
            ]
        }
    });
});
