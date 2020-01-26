
import CacheFor from "../../lib/syntax/CacheFor";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("CacheReverseExpression", () => {

    GrapeQLCoach.test(CacheFor, {
        str: "cache for public.order (select 1 as some_numb)",
        result: {
            for: {star: false, link: [
                {word: "public", content: null},
                {word: "order", content: null}
            ]},
            as: null,
            cache: {
                with: null,
                columns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]},
                        as: { word: "some_numb", content: null }
                    }
                ],
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
            reverse: []
        }
    });

    GrapeQLCoach.test(CacheFor, {
        str: "cache for public.order as orders (select orders.id as some_numb)",
        result: {
            for: {star: false, link: [
                {word: "public", content: null},
                {word: "order", content: null}
            ]},
            as: {word: "orders", content: null},
            cache: {
                with: null,
                columns: [
                    {
                        expression: {elements: [
                            {star: false, link: [
                                {word: "orders", content: null},
                                {word: "id", content: null}
                            ]}
                        ]},
                        as: { word: "some_numb", content: null }
                    }
                ],
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
            reverse: []
        }
    });

    GrapeQLCoach.test(CacheFor, {
        str: `cache for company (
            select 
                count(*) as orders_count 
            from orders
            where
                orders.id_client = company.id
        )
        after change orders set where
            orders.id_client = company.id
        `,
        result: {
            for: {star: false, link: [
                {word: "company", content: null}
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
                                        {word: "count", content: null}
                                    ]
                                },
                                all: null,
                                distinct: null,
                                arguments: [
                                    {elements: [
                                        {
                                            star: true,
                                            link: []
                                        }
                                    ]}
                                ],
                                where: null,
                                orderBy: null,
                                within: null,
                                over: null,
                                emptyOver: null
                            }
                        ]},
                        as: { word: "orders_count", content: null }
                    }
                ],
                from: [
                    {
                        lateral: null,
                        only: null,
                        file: null,
                        withOrdinality: null,
                        functionCall: null,
                        as: null,
                        columns: null,
                        joins: [],
                        star: null,
                        select: null,
            
                        table: {star: false, link: [
                            {word: "orders", content: null}
                        ]}
                    }
                ],
                where: {elements: [
                    {star: false, link: [
                        {word: "orders", content: null},
                        {word: "id_client", content: null}
                    ]},
                    {operator: "="},
                    {star: false, link: [
                        {word: "company", content: null},
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
            },
            reverse: [
                {
                    table: {star: false, link: [
                        {word: "orders", content: null}
                    ]},
                    as: null,
                    where: {elements: [
                        {star: false, link: [
                            {word: "orders", content: null},
                            {word: "id_client", content: null}
                        ]},
                        {operator: "="},
                        {star: false, link: [
                            {word: "company", content: null},
                            {word: "id", content: null}
                        ]}
                    ]}
                }
            ]
        }
    });

});
