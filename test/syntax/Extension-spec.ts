
import Extension from "../../lib/syntax/Extension";
import testSyntax from "../testSyntax";

describe("Extension", () => {

    testSyntax(Extension, {
        str: `create extension for company (
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
            valuesRows: []
        }
    });
    
    testSyntax(Extension, {
        str: `extension for company (
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
            valuesRows: []
        }
    });

    
    testSyntax(Extension, {
        str: `extension for public.orders (
            constraint has_profit check (
                profit is not null and
                profit > 0
            )
        )`,
        result: {
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
            valuesRows: []
        }
    });


    testSyntax(Extension, {
        str: `extension for public.orders values (
            (1, 'FCL')
        )`,
        result: {
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
            ]
        }
    });
});
