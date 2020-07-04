
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
        result: {
            name: {word: "gtd_totals", content: null},
            for: {star: false, link: [
                {word: "orders", content: null}
            ]},
            as: null,
            cache: {
                with: null,
                columns: [
                    {
                        expression: {elements: [
                            {
                                function: {
                                    star: false,
                                    link: [
                                        {word: "string_agg", content: null}
                                    ]
                                },
                                all: null,
                                distinct: true,
                                arguments: [
                                    {elements: [
                                        {star: false, link: [
                                            {word: "gtds", content: null},
                                            {word: "doc_number", content: null}
                                        ]}
                                    ]},
                                    {elements: [
                                        {content: ", "}
                                    ]}
                                ],
                                where: null,
                                orderBy: null,
                                within: null,
                                over: null,
                                emptyOver: null
                            }
                        ]},
                        as: {word: "gtds_numbers", content: null}
                    }
                ],
                into: null,
                from: [
                    {
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
                            {word: "gtds", content: null}
                        ]}
                    }
                ],
                where: {elements: [
                    {star: false, link: [
                        {word: "gtds", content: null},
                        {word: "id_order", content: null}
                    ]},
                    {operator: "="},
                    {star: false, link: [
                        {word: "orders", content: null},
                        {word: "id", content: null}
                    ]}
                ]},
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
        result: {
            name: {word: "gtd_totals", content: null},
            for: {star: false, link: [
                {word: "orders", content: null}
            ]},
            as: {word: "my_order", content: null},
            cache: {
                with: null,
                columns: [
                    {
                        expression: {elements: [
                            {
                                function: {
                                    star: false,
                                    link: [
                                        {word: "string_agg", content: null}
                                    ]
                                },
                                all: null,
                                distinct: true,
                                arguments: [
                                    {elements: [
                                        {star: false, link: [
                                            {word: "gtds", content: null},
                                            {word: "doc_number", content: null}
                                        ]}
                                    ]},
                                    {elements: [
                                        {content: ", "}
                                    ]}
                                ],
                                where: null,
                                orderBy: null,
                                within: null,
                                over: null,
                                emptyOver: null
                            }
                        ]},
                        as: {word: "gtds_numbers", content: null}
                    },
                    {
                        expression: {elements: [
                            {
                                function: {
                                    star: false,
                                    link: [
                                        {word: "array_agg", content: null}
                                    ]
                                },
                                all: null,
                                distinct: null,
                                arguments: [
                                    {elements: [
                                        {star: false, link: [
                                            {word: "gtds", content: null},
                                            {word: "id", content: null}
                                        ]}
                                    ]}
                                ],
                                where: null,
                                orderBy: null,
                                within: null,
                                over: null,
                                emptyOver: null
                            }
                        ]},
                        as: {word: "gtds_ids", content: null}
                    }
                ],
                into: null,
                from: [
                    {
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
                            {word: "gtds", content: null}
                        ]}
                    }
                ],
                where: {elements: [
                    {star: false, link: [
                        {word: "gtds", content: null},
                        {word: "id_order", content: null}
                    ]},
                    {operator: "="},
                    {star: false, link: [
                        {word: "my_order", content: null},
                        {word: "id", content: null}
                    ]}
                ]},
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
            }
        }
    });

});
