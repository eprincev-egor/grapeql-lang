
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
});
