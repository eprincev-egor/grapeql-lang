
import {testSyntax} from "../testSyntax";
import {Extension} from "../../lib/syntax/Extension";

describe("Extension", () => {

    testSyntax(Extension, {
        str: `create extension inn_company for company (
            inn text
        )`,
        shouldBe: {
            forTable: {
                star: false,
                link: [{
                    word: "company"
                }]
            },
            name: {
                word: "inn_company"
            },
            columns: [
                {
                    name: {
                        word: "inn"
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true
                }
            ],
            constraints: [],
            valuesRows: [],
            deprecated: false,
            deprecatedColumns: []
        }
    });
    
    testSyntax(Extension, {
        str: `extension inn_company for company (
            inn text
        )`,
        shouldBe: {
            forTable: {
                star: false,
                link: [{
                    word: "company"
                }]
            },
            name: {
                word: "inn_company"
            },
            columns: [
                {
                    name: {
                        word: "inn"
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true
                }
            ],
            constraints: [],
            valuesRows: [],
            deprecated: false,
            deprecatedColumns: []
        }
    });

    
    testSyntax(Extension, {
        str: `extension check_order for public.orders (
            constraint has_profit check (
                profit is not null and
                profit > 0
            )
        )`,
        shouldBe: {
            name: {
                word: "check_order"
            },
            forTable: {
                star: false,
                link: [{
                    word: "public"
                }, {
                    word: "orders"
                }]
            },
            columns: [],
            constraints: [{
                name: {
                    word: "has_profit"
                },
                check: {
                    elements: [
                        {star: false, link: [
                            {word: "profit"}
                        ]},
                        {operator: "is not"},
                        {null: true},
                        
                        {operator: "and"},

                        {star: false, link: [
                            {word: "profit"}
                        ]},
                        {operator: ">"},
                        {number: "0"}
                    ]
                }
            }],
            valuesRows: [],
            deprecated: false,
            deprecatedColumns: []
        }
    });


    testSyntax(Extension, {
        str: `extension orders_values for public.orders values (
            (1, 'FCL')
        )`,
        shouldBe: {
            name: {
                word: "orders_values"
            },
            forTable: {
                star: false,
                link: [{
                    word: "public"
                }, {
                    word: "orders"
                }]
            },
            columns: [],
            constraints: [],
            valuesRows: [
                {values: [
                    {value: {elements: [
                        {number: "1"}
                    ]}},

                    {value: {elements: [
                        {content: "FCL"}
                    ]}}
                ]}
            ],
            deprecated: false,
            deprecatedColumns: []
        }
    });

    testSyntax(Extension, {
        str: `deprecated extension inn_company for company (
            inn text
        )`,
        shouldBe: {
            name: {
                word: "inn_company"
            },
            forTable: {
                star: false,
                link: [{
                    word: "company"
                }]
            },
            columns: [
                {
                    name: {
                        word: "inn"
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true
                }
            ],
            constraints: [],
            valuesRows: [],
            deprecated: true,
            deprecatedColumns: []
        }
    });
    
    testSyntax(Extension, {
        str: `deprecated create extension inn_company for company (
            inn text
        )`,
        shouldBe: {
            name: {
                word: "inn_company"
            },
            forTable: {
                star: false,
                link: [{
                    word: "company"
                }]
            },
            columns: [
                {
                    name: {
                        word: "inn"
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true
                }
            ],
            constraints: [],
            valuesRows: [],
            deprecated: true,
            deprecatedColumns: []
        }
    });
    
    
    testSyntax(Extension, {
        str: `extension test for company (
            name text
        ) deprecated (
            inn
        )`,
        shouldBe: {
            forTable: {
                star: false,
                link: [{
                    word: "company"
                }]
            },
            name: {
                word: "test"
            },
            columns: [
                {
                    name: {
                        word: "name"
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true
                }
            ],
            constraints: [],
            valuesRows: [],
            deprecated: false,
            deprecatedColumns: [
                {word: "inn"}
            ]
        }
    });

    
    testSyntax(Extension, {
        str: `extension test for company (
            x numeric,
            x numeric
        )`,
        error: /duplicate column name: x/
    });

    testSyntax(Extension, {
        str: `extension test for company (
            inn1 text not null,
            inn2 text not null,
            constraint company_inn_uniq unique (inn1),
            constraint company_inn_uniq unique (inn2)
        )`,
        error: /duplicate constraint name: company_inn_uniq/
    });

    // testSyntax(Extension, {
    //     str: `extension test for company 
    //     values (
    //         (1, ''),
    //         (2)
    //     )`,
    //     error: /VALUES lists must all be the same length/
    // });

});
