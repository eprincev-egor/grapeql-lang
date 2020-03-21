
import Extension from "../../lib/syntax/Extension";
import testSyntax from "../testSyntax";

describe("Extension", () => {

    testSyntax(Extension, {
        str: `create extension inn_company for company (
            inn text
        )`,
        result: {
            forTable: {
                star: false,
                link: [{
                    word: "company",
                    content: null
                }]
            },
            name: {
                word: "inn_company",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "inn",
                        content: null
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
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
        result: {
            forTable: {
                star: false,
                link: [{
                    word: "company",
                    content: null
                }]
            },
            name: {
                word: "inn_company",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "inn",
                        content: null
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
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
        result: {
            name: {
                word: "check_order",
                content: null
            },
            forTable: {
                star: false,
                link: [{
                    word: "public",
                    content: null
                }, {
                    word: "orders",
                    content: null
                }]
            },
            columns: [],
            constraints: [{
                name: {
                    word: "has_profit",
                    content: null
                },
                column: null,
                check: {
                    elements: [
                        {star: false, link: [
                            {word: "profit", content: null}
                        ]},
                        {operator: "is not"},
                        {null: true},
                        
                        {operator: "and"},

                        {star: false, link: [
                            {word: "profit", content: null}
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
        result: {
            name: {
                word: "orders_values",
                content: null
            },
            forTable: {
                star: false,
                link: [{
                    word: "public",
                    content: null
                }, {
                    word: "orders",
                    content: null
                }]
            },
            columns: [],
            constraints: [],
            valuesRows: [
                {values: [
                    {value: {elements: [
                        {number: "1"}
                    ]}, default: null},

                    {value: {elements: [
                        {content: "FCL"}
                    ]}, default: null}
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
        result: {
            name: {
                word: "inn_company",
                content: null
            },
            forTable: {
                star: false,
                link: [{
                    word: "company",
                    content: null
                }]
            },
            columns: [
                {
                    name: {
                        word: "inn",
                        content: null
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
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
        result: {
            name: {
                word: "inn_company",
                content: null
            },
            forTable: {
                star: false,
                link: [{
                    word: "company",
                    content: null
                }]
            },
            columns: [
                {
                    name: {
                        word: "inn",
                        content: null
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
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
        result: {
            forTable: {
                star: false,
                link: [{
                    word: "company",
                    content: null
                }]
            },
            name: {
                word: "test",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "name",
                        content: null
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                }
            ],
            constraints: [],
            valuesRows: [],
            deprecated: false,
            deprecatedColumns: [
                {word: "inn", content: null}
            ]
        }
    });
});
