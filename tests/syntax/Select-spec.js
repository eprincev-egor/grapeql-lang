"use strict";

const Select = require("../../lib/syntax/Select");
const testSyntax = require("../testSyntax");

describe("Select", () => {

    testSyntax(Select, {
        str: "select",
        result: {
            with: null,
            columns: null,
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
        }
    });

    testSyntax(Select, {
        str: "select 1, 2, 3",
        result: {
            with: null,
            columns: [
                {
                    expression: {elements: [
                        {number: "1"}
                    ]},
                    as: null
                },
                {
                    expression: {elements: [
                        {number: "2"}
                    ]},
                    as: null
                },
                {
                    expression: {elements: [
                        {number: "3"}
                    ]},
                    as: null
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
        }
    });

    testSyntax(Select, {
        str: "select 1 where false",
        result: {
            with: null,
            columns: [
                {
                    expression: {elements: [
                        {number: "1"}
                    ]},
                    as: null
                }
            ],
            from: null,
            where: {elements: [
                {boolean: false}
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
    });

    testSyntax(Select, {
        str: "select * from orders order by id",
        result: {
            with: null,
            columns: [
                {
                    expression: {elements: [
                        {star: true, link: []}
                    ]},
                    as: null
                }
            ],
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
                        {word: "orders", content: null}
                    ]}
                }
            ],
            where: null,
            groupBy: null,
            having: null,
            window: null,
            orderBy: [
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "id", content: null}
                        ]}
                    ]},
                    nulls: null,
                    using: null,
                    vector: "asc"
                }
            ],
            union: null,
            offset: null,
            offsetRow: null,
            offsetRows: null,
            limit: null,
            fetch: null
        }
    });

    testSyntax(Select, {
        str: "select sum( payments ) from orders group by orders.client",
        result: {
            with: null,
            columns: [
                {
                    expression: {elements: [
                        {
                            function: {
                                star: false,
                                link: [
                                    {word: "sum", content: null}
                                ]
                            },
                            all: null,
                            distinct: null,
                            arguments: [{elements: [
                                {star: false, link: [
                                    {word: "payments", content: null}
                                ]}
                            ]}],
                            where: null,
                            orderBy: null,
                            within: null,
                            over: null,
                            emptyOver: null
                        }
                    ]},
                    as: null
                }
            ],
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
                        {word: "orders", content: null}
                    ]}
                }
            ],
            where: null,
            groupBy: [
                {
                    cube: null,
                    expression: {elements: [
                        {star: false, link: [
                            {word: "orders", content: null},
                            {word: "client", content: null}
                        ]}
                    ]},
                    groupingSets: null,
                    isEmpty: null,
                    rollup: null
                }
            ],
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
    });

    testSyntax(Select, {
        str: `
            select 
                sum( payments )
            from orders 
            group by 
                order_date
            having 
                sum( payments ) is not null
        `,
        result: {
            with: null,
            columns: [
                {
                    expression: {elements: [
                        {
                            function: {
                                star: false,
                                link: [
                                    {word: "sum", content: null}
                                ]
                            },
                            all: null,
                            distinct: null,
                            arguments: [{elements: [
                                {star: false, link: [
                                    {word: "payments", content: null}
                                ]}
                            ]}],
                            where: null,
                            orderBy: null,
                            within: null,
                            over: null,
                            emptyOver: null
                        }
                    ]},
                    as: null
                }
            ],
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
                        {word: "orders", content: null}
                    ]}
                }
            ],
            where: null,
            groupBy: [
                {
                    cube: null,
                    expression: {elements: [
                        {star: false, link: [
                            {word: "order_date", content: null}
                        ]}
                    ]},
                    groupingSets: null,
                    isEmpty: null,
                    rollup: null
                }
            ],
            having: {elements: [
                {
                    function: {
                        star: false,
                        link: [
                            {word: "sum", content: null}
                        ]
                    },
                    all: null,
                    distinct: null,
                    arguments: [{elements: [
                        {star: false, link: [
                            {word: "payments", content: null}
                        ]}
                    ]}],
                    where: null,
                    orderBy: null,
                    within: null,
                    over: null,
                    emptyOver: null
                },
                {operator: "is not"},
                {null: true}
            ]},
            window: null,
            orderBy: null,
            union: null,
            offset: null,
            offsetRow: null,
            offsetRows: null,
            limit: null,
            fetch: null
        }
    });

});
