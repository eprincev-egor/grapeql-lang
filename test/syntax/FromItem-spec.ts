
import {testSyntax} from "../testSyntax";
import {FromItem} from "../../lib/syntax/FromItem";

describe("FromItem", () => {

    testSyntax(FromItem, {
        str: "public.company",
        shouldBe: {
            joins: [],

            table: {star: false, link: [
                {word: "public"},
                {word: "company"}
            ]}
        }
    });

    testSyntax(FromItem, {
        str: "only company",
        shouldBe: {
            joins: [],
            
            only: true,
            table: {star: false, link: [
                {word: "company"}
            ]}
        }
    });

    testSyntax(FromItem, {
        str: "only company *",
        shouldBe: {
            joins: [],

            star: true,
            
            only: true,
            table: {star: false, link: [
                {word: "company"}
            ]}
        }
    });

    testSyntax(FromItem, {
        str: "public.company as Company",
        shouldBe: {
            joins: [],
            
            as: { word: "company" },
            table: {star: false, link: [
                {word: "public"},
                {word: "company"}
            ]}
        }
    });

    testSyntax(FromItem, {
        str: "public.company as Company ( id, inn )",
        shouldBe: {
            joins: [],

            as: { word: "company"},
            table: {star: false, link: [
                {word: "public"},
                {word: "company"}
            ]},
            columns: [
                {word: "id"},
                {word: "inn"}
            ]
        }
    });

    testSyntax(FromItem, {
        str: "public.get_rows(1 + 1) as some_rows",
        shouldBe: {
            joins: [],
            
            functionCall: {

                function: {star: false, link: [
                    { word: "public" },
                    { word: "get_rows" }
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
                word: "some_rows"
            }
        }
    });

    testSyntax(FromItem, {
        str: "lateral get_rows( company.id ) as some_rows",
        shouldBe: {
            joins: [],
            
            lateral: true,
            functionCall: {

                function: {star: false, link: [
                    { word: "get_rows" }
                ]},
                arguments: [
                    {elements: [
                        {star: false, link: [
                            {word: "company"},
                            {word: "id"}
                        ]}
                    ]}
                ]
            },
            as: {
                word: "some_rows"
            }
        }
    });

    
    testSyntax(FromItem, {
        str: "unnest('{1,2,3}'::int[], '{4,5,6,7}'::int[]) with ordinality as t(a1, a2, num)",
        shouldBe: {
            joins: [],
            
            withOrdinality: true,
            functionCall: {

                function: {star: false, link: [
                    { word: "unnest" }
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
                word: "t"
            },
            
            columns: [
                {word: "a1"},
                {word: "a2"},
                {word: "num"}
            ]
        }
    });

    
    testSyntax(FromItem, {
        str: "file Order.sql as orders",
        shouldBe: {
            joins: [],

            file: {
                relative: true,
                path: [
                    {name: "."},
                    {name: "Order.sql"}
                ]
            },
            as: {
                word: "orders"
            }
        }
    });

    testSyntax(FromItem, {
        str: "./Order.sql as orders",
        shouldBe: {
            joins: [],

            file: {
                relative: true,
                path: [
                    {name: "."},
                    {name: "Order.sql"}
                ]
            },
            as: {
                word: "orders"
            }
        }
    });

    testSyntax(FromItem, {
        str: "./Order",
        shouldBe: {
            joins: [],

            file: {
                relative: true,
                path: [
                    {name: "."},
                    {name: "Order"}
                ]
            }
        }
    });

    testSyntax(FromItem, {
        str: "./Order",
        shouldBe: {
            joins: [],

            file: {
                relative: true,
                path: [
                    {name: "."},
                    {name: "Order"}
                ]
            }
        }
    });


    testSyntax(FromItem, {
        str: "./Order join country on true",
        shouldBe: {
            joins: [
                {
                    type: "join",
                    from: {
                        joins: [],
    
                        table: {star: false, link: [
                            {word: "country"}
                        ]}
                    },
                    on: {elements: [
                        {boolean: true}
                    ]}
                }
            ],

            file: {
                relative: true,
                path: [
                    {name: "."},
                    {name: "Order"}
                ]
            }
        }
    });

    
    testSyntax(FromItem, {
        str: "./Order join country on true inner join public.some on false",
        shouldBe: {
            joins: [
                {
                    type: "join",
                    from: {
                        joins: [],
    
                        table: {star: false, link: [
                            {word: "country"}
                        ]}
                    },
                    on: {elements: [
                        {boolean: true}
                    ]}
                },
                {
                    type: "inner join",
                    from: {
                        joins: [],
    
                        table: {star: false, link: [
                            {word: "public"},
                            {word: "some"}
                        ]}
                    },
                    on: {elements: [
                        {boolean: false}
                    ]}
                }
            ],

            file: {
                relative: true,
                path: [
                    {name: "."},
                    {name: "Order"}
                ]
            }
        }
    });

    testSyntax(FromItem, {
        str: "( select * from public.order ) as Orders",
        shouldBe: {
            joins: [],
            
            as: {word: "orders"},
            select: {
                columns: [
                    {
                        expression: {elements: [
                            {star: true, link: []}
                        ]}
                    }
                ],
                from: [{
                    joins: [],

                    table: {star: false, link: [
                        {word: "public"},
                        {word: "order"}
                    ]}
                }]
            }
        }
    });

    testSyntax(FromItem, {
        str: "lateral ( select * from company ) as company (id, inn)",
        shouldBe: {
            joins: [],
            
            lateral: true,
            columns: [
                {word: "id"},
                {word: "inn"}
            ],
            as: {word: "company"},
            select: {
                columns: [
                    {
                        expression: {elements: [
                            {star: true, link: []}
                        ]}
                    }
                ],
                from: [{
                    joins: [],

                    table: {star: false, link: [
                        {word: "company"}
                    ]}
                }]
            }
        }
    });
});
