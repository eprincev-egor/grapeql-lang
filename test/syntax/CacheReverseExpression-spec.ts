

import CacheReverseExpression from "../../lib/syntax/CacheReverseExpression";


describe("CacheReverseExpression", () => {

    GrapeQLCoach.test(CacheReverseExpression, {
        str: `after change orders 
        set where
            orders.id = 1
        `,
        result: {
            table: {star: false, link: [
                {word: "orders", content: null}
            ]},
            as: null,
            where: {elements: [
                {star: false, link: [
                    {word: "orders", content: null},
                    {word: "id", content: null}
                ]},
                {operator: "="},
                {number: "1"}
            ]}
        }
    });

    GrapeQLCoach.test(CacheReverseExpression, {
        str: `after change public.order as orders 
        set where
            orders.id = 1
        `,
        result: {
            table: {star: false, link: [
                {word: "public", content: null},
                {word: "order", content: null}
            ]},
            as: {word: "orders", content: null},
            where: {elements: [
                {star: false, link: [
                    {word: "orders", content: null},
                    {word: "id", content: null}
                ]},
                {operator: "="},
                {number: "1"}
            ]}
        }
    });

});
