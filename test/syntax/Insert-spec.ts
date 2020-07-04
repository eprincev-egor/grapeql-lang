
import {testSyntax} from "../testSyntax";
import {Insert} from "../../lib/syntax/Insert";

describe("Insert", () => {

    testSyntax(Insert, {
        str: "insert into orders default values",
        shouldBe: {
            with: null,
            table: {star: false, link: [
                {word: "orders"}
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
        shouldBe: {
            with: null,
            table: {star: false, link: [
                {word: "orders"}
            ]},
            as: {word: "order"},
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
        shouldBe: {
            with: null,
            table: {star: false, link: [
                {word: "orders"}
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
        shouldBe: {
            with: null,
            table: {star: false, link: [
                {word: "orders"}
            ]},
            as: null,
            columns: [{word: "id_country"}],
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
        shouldBe: {
            with: null,
            table: {star: false, link: [
                {word: "orders"}
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
        shouldBe: {
            with: {
                recursive: null,
                queries: [{
                    name: {word: "x1"},
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
                {word: "orders"}
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
                        {word: "x1"}
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
        shouldBe: {
            with: null,
            table: {star: false, link: [
                {word: "companies"}
            ]},
            as: null,
            columns: [
                {word: "id"},
                {word: "name"}
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
                    column: {word: "id"}
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
        shouldBe: {
            with: null,
            table: {star: false, link: [
                {word: "companies"}
            ]},
            as: null,
            columns: [
                {word: "id"},
                {word: "name"}
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
                    column: {word: "id"}
                }],
                constraint: null,
                where: {elements: [
                    {star: false, link: [
                        {word: "id"}
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
        shouldBe: {
            with: null,
            table: {star: false, link: [
                {word: "companies"}
            ]},
            as: null,
            columns: [
                {word: "id"},
                {word: "name"}
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
                constraint: {word: "some_constraint_name"},
                where: {elements: [
                    {star: false, link: [
                        {word: "id"}
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
        shouldBe: {
            with: null,
            table: {star: false, link: [
                {word: "companies"}
            ]},
            as: null,
            columns: [
                {word: "id"},
                {word: "name"}
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
                    column: {word: "inn"}, 
                    expression: null
                }],
                constraint: null,
                where: null,
                doNothing: null,
                updateSet: [{
                    columns: null,
                    values: null,
                    select: null,
                    column: {word: "name"},
                    value: {default: null, value: {elements: [
                        {star: false, link: [
                            {word: "excluded"},
                            {word: "name"}
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
        shouldBe: {
            with: null,
            table: {star: false, link: [
                {word: "companies"}
            ]},
            as: null,
            columns: [
                {word: "id"},
                {word: "name"}
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
                    column: {word: "inn"}, 
                    expression: null
                }],
                constraint: null,
                where: null,
                doNothing: null,
                updateSet: [{
                    columns: null,
                    values: null,
                    select: null,
                    column: {word: "name"},
                    value: {default: null, value: {elements: [
                        {star: false, link: [
                            {word: "excluded"},
                            {word: "name"}
                        ]}
                    ]}}
                }],
                updateWhere: {elements: [
                    {star: false, link: [
                        {word: "name"}
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
        shouldBe: {
            with: null,
            table: {star: false, link: [
                {word: "orders"}
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
                            {word: "id"}
                        ]}
                    ]}, as: null},
                    {expression: {elements: [
                        {star: false, link: [
                            {word: "id_client"}
                        ]}
                    ]}, as: {word: "client_id"}}
                ]
            }
        }
    });
    

});
