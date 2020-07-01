
import {Insert} from "../../lib/syntax/Insert";
import testSyntax from "../testSyntax";

describe("Insert", () => {

    testSyntax(Insert, {
        str: "insert into orders default values",
        result: {
            with: null,
            table: {star: false, link: [
                {word: "orders", content: null}
            ]},
            as: null,
            columns: null,
            defaultValues: true,
            values: null,
            select: null,
            onConflict: null,
            returning: null
        }
    });
    
    testSyntax(Insert, {
        str: "insert into orders AS Order default values",
        result: {
            with: null,
            table: {star: false, link: [
                {word: "orders", content: null}
            ]},
            as: {word: "order", content: null},
            columns: null,
            defaultValues: true,
            values: null,
            select: null,
            onConflict: null,
            returning: null
        }
    });
    
    testSyntax(Insert, {
        str: "insert into orders values (1,2), (3, 4)",
        result: {
            with: null,
            table: {star: false, link: [
                {word: "orders", content: null}
            ]},
            as: null,
            columns: null,
            defaultValues: null,
            values: [
                {values: [
                    {default: null, value: {elements: [
                        {number: "1"}
                    ]}},
                    {default: null, value: {elements: [
                        {number: "2"}
                    ]}}
                ]},
                {values: [
                    {default: null, value: {elements: [
                        {number: "3"}
                    ]}},
                    {default: null, value: {elements: [
                        {number: "4"}
                    ]}}
                ]}
            ],
            select: null,
            onConflict: null,
            returning: null
        }
    });
    
    testSyntax(Insert, {
        str: "insert into orders (id_country) values (default)",
        result: {
            with: null,
            table: {star: false, link: [
                {word: "orders", content: null}
            ]},
            as: null,
            columns: [{word: "id_country", content: null}],
            defaultValues: null,
            values: [
                {values: [
                    {default: true, value: null}
                ]}
            ],
            select: null,
            onConflict: null,
            returning: null
        }
    });
    
    testSyntax(Insert, {
        str: "insert into orders select 1",
        result: {
            with: null,
            table: {star: false, link: [
                {word: "orders", content: null}
            ]},
            as: null,
            columns: null,
            defaultValues: null,
            values: null,
            select: {
                with: null,
                columns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]},
                        as: null
                    }
                ],
                into: null,
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
            onConflict: null,
            returning: null
        }
    });


    testSyntax(Insert, {
        str: "with x1 as (select 2) insert into orders select * from x1",
        result: {
            with: {
                recursive: null,
                queries: [{
                    name: {word: "x1", content: null},
                    columns: null,
                    select: {
                        with: null,
                        columns: [
                            {
                                expression: {elements: [
                                    {number: "2"}
                                ]},
                                as: null
                            }
                        ],
                        into: null,
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
                    values: null
                }]
            },
            table: {star: false, link: [
                {word: "orders", content: null}
            ]},
            as: null,
            columns: null,
            defaultValues: null,
            values: null,
            select: {
                with: null,
                columns: [
                    {
                        expression: {elements: [
                            {star: true, link: []}
                        ]},
                        as: null
                    }
                ],
                into: null,
                from: [{
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
                        {word: "x1", content: null}
                    ]}
                }],
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
            onConflict: null,
            returning: null
        }
    });

    testSyntax(Insert, {
        str: "insert into companies (id, name) values (1, 'Test') on conflict (id) do nothing",
        result: {
            with: null,
            table: {star: false, link: [
                {word: "companies", content: null}
            ]},
            as: null,
            columns: [
                {word: "id", content: null},
                {word: "name", content: null}
            ],
            defaultValues: null,
            values: [
                {values: [
                    {default: null, value: {elements: [
                        {number: "1"}
                    ]}},
                    {default: null, value: {elements: [
                        {content: "Test"}
                    ]}}
                ]}
            ],
            select: null,
            onConflict: {
                target: [{
                    expression: null,
                    column: {word: "id", content: null}
                }],
                constraint: null,
                where: null,
                doNothing: true,
                updateSet: null,
                updateWhere: null
            },
            returning: null
        }
    });
    
    testSyntax(Insert, {
        str: "insert into companies (id, name) values (1, 'Test') on conflict (id) where id > 0 do nothing",
        result: {
            with: null,
            table: {star: false, link: [
                {word: "companies", content: null}
            ]},
            as: null,
            columns: [
                {word: "id", content: null},
                {word: "name", content: null}
            ],
            defaultValues: null,
            values: [
                {values: [
                    {default: null, value: {elements: [
                        {number: "1"}
                    ]}},
                    {default: null, value: {elements: [
                        {content: "Test"}
                    ]}}
                ]}
            ],
            select: null,
            onConflict: {
                target: [{
                    expression: null,
                    column: {word: "id", content: null}
                }],
                constraint: null,
                where: {elements: [
                    {star: false, link: [
                        {word: "id", content: null}
                    ]},
                    {operator: ">"},
                    {number: "0"}
                ]},
                doNothing: true,
                updateSet: null,
                updateWhere: null
            },
            returning: null
        }
    });
    
    testSyntax(Insert, {
        str: `insert into companies 
            (id, name) 
        values (1, 'Test') 
        on conflict 
            on constraint some_constraint_name 
            where id > 0 
        do nothing`,
        result: {
            with: null,
            table: {star: false, link: [
                {word: "companies", content: null}
            ]},
            as: null,
            columns: [
                {word: "id", content: null},
                {word: "name", content: null}
            ],
            defaultValues: null,
            values: [
                {values: [
                    {default: null, value: {elements: [
                        {number: "1"}
                    ]}},
                    {default: null, value: {elements: [
                        {content: "Test"}
                    ]}}
                ]}
            ],
            select: null,
            onConflict: {
                target: null,
                constraint: {word: "some_constraint_name", content: null},
                where: {elements: [
                    {star: false, link: [
                        {word: "id", content: null}
                    ]},
                    {operator: ">"},
                    {number: "0"}
                ]},
                doNothing: true,
                updateSet: null,
                updateWhere: null
            },
            returning: null
        }
    });
    
    testSyntax(Insert, {
        str: `insert into companies 
            (id, name) 
        values (1, 'Test') 
        on conflict (inn)
        do update set
            name = excluded.name`,
        result: {
            with: null,
            table: {star: false, link: [
                {word: "companies", content: null}
            ]},
            as: null,
            columns: [
                {word: "id", content: null},
                {word: "name", content: null}
            ],
            defaultValues: null,
            values: [
                {values: [
                    {default: null, value: {elements: [
                        {number: "1"}
                    ]}},
                    {default: null, value: {elements: [
                        {content: "Test"}
                    ]}}
                ]}
            ],
            select: null,
            onConflict: {
                target: [{
                    column: {word: "inn", content: null}, 
                    expression: null
                }],
                constraint: null,
                where: null,
                doNothing: null,
                updateSet: [{
                    columns: null,
                    values: null,
                    select: null,
                    column: {word: "name", content: null},
                    value: {default: null, value: {elements: [
                        {star: false, link: [
                            {word: "excluded", content: null},
                            {word: "name", content: null}
                        ]}
                    ]}}
                }],
                updateWhere: null
            },
            returning: null
        }
    });

    testSyntax(Insert, {
        str: `insert into companies 
            (id, name) 
        values (1, 'Test') 
        on conflict (inn)
        do update set
            name = excluded.name
        where name <> 'x'`,
        result: {
            with: null,
            table: {star: false, link: [
                {word: "companies", content: null}
            ]},
            as: null,
            columns: [
                {word: "id", content: null},
                {word: "name", content: null}
            ],
            defaultValues: null,
            values: [
                {values: [
                    {default: null, value: {elements: [
                        {number: "1"}
                    ]}},
                    {default: null, value: {elements: [
                        {content: "Test"}
                    ]}}
                ]}
            ],
            select: null,
            onConflict: {
                target: [{
                    column: {word: "inn", content: null}, 
                    expression: null
                }],
                constraint: null,
                where: null,
                doNothing: null,
                updateSet: [{
                    columns: null,
                    values: null,
                    select: null,
                    column: {word: "name", content: null},
                    value: {default: null, value: {elements: [
                        {star: false, link: [
                            {word: "excluded", content: null},
                            {word: "name", content: null}
                        ]}
                    ]}}
                }],
                updateWhere: {elements: [
                    {star: false, link: [
                        {word: "name", content: null}
                    ]},
                    {operator: "<>"},
                    {content: "x"}
                ]}
            },
            returning: null
        }
    });

    testSyntax(Insert, {
        str: "insert into orders default values returning *, id, id_client as client_id",
        result: {
            with: null,
            table: {star: false, link: [
                {word: "orders", content: null}
            ]},
            as: null,
            columns: null,
            defaultValues: true,
            values: null,
            select: null,
            onConflict: null,
            returning: {
                returningColumns: [
                    {expression: {elements: [
                        {star: true, link: []}
                    ]}, as: null},
                    {expression: {elements: [
                        {star: false, link: [
                            {word: "id", content: null}
                        ]}
                    ]}, as: null},
                    {expression: {elements: [
                        {star: false, link: [
                            {word: "id_client", content: null}
                        ]}
                    ]}, as: {word: "client_id", content: null}}
                ]
            }
        }
    });
    

});
