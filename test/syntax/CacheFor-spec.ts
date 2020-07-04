
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
                                        {word: "string_agg"}
                                    ]
                                },
                                all: null,
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
                                ],
                                where: null,
                                orderBy: null,
                                within: null,
                                over: null,
                                emptyOver: null
                            }
                        ]},
                        as: {word: "gtds_numbers"}
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
        shouldBe: {
            name: {word: "gtd_totals"},
            for: {star: false, link: [
                {word: "orders"}
            ]},
            as: {word: "my_order"},
            cache: {
                with: null,
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
                                all: null,
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
                                ],
                                where: null,
                                orderBy: null,
                                within: null,
                                over: null,
                                emptyOver: null
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
                                all: null,
                                distinct: null,
                                arguments: [
                                    {elements: [
                                        {star: false, link: [
                                            {word: "gtds"},
                                            {word: "id"}
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
                        as: {word: "gtds_ids"}
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
