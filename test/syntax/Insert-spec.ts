
import {testSyntax} from "../testSyntax";
import {Insert} from "../../lib/syntax/Insert";

describe("Insert", () => {

    testSyntax(Insert, {
        str: "insert into orders default values",
        shouldBe: {
            table: {star: false, link: [
                {word: "orders"}
            ]},
            defaultValues: true
        }
    });
    
    testSyntax(Insert, {
        str: "insert into orders AS Order default values",
        shouldBe: {
            table: {star: false, link: [
                {word: "orders"}
            ]},
            as: {word: "order"},
            defaultValues: true
        }
    });
    
    testSyntax(Insert, {
        str: "insert into orders values (1,2), (3, 4)",
        shouldBe: {
            table: {star: false, link: [
                {word: "orders"}
            ]},
            values: [
                {values: [
                    { value: {elements: [
                        {number: "1"}
                    ]}},
                    { value: {elements: [
                        {number: "2"}
                    ]}}
                ]},
                {values: [
                    { value: {elements: [
                        {number: "3"}
                    ]}},
                    { value: {elements: [
                        {number: "4"}
                    ]}}
                ]}
            ]
        }
    });
    
    testSyntax(Insert, {
        str: "insert into orders (id_country) values (default)",
        shouldBe: {
            table: {star: false, link: [
                {word: "orders"}
            ]},
            columns: [{word: "id_country"}],
            values: [
                {values: [
                    {default: true}
                ]}
            ]
        }
    });
    
    testSyntax(Insert, {
        str: "insert into orders select 1",
        shouldBe: {
            table: {star: false, link: [
                {word: "orders"}
            ]},
            select: {
                columns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]}
                    }
                ]
            }
        }
    });


    testSyntax(Insert, {
        str: "with x1 as (select 2) insert into orders select * from x1",
        shouldBe: {
            with: {
                queries: [{
                    name: {word: "x1"},
                    select: {
                        columns: [
                            {
                                expression: {elements: [
                                    {number: "2"}
                                ]}
                            }
                        ]
                    }
                }]
            },
            table: {star: false, link: [
                {word: "orders"}
            ]},
            select: {
                columns: [
                    {
                        expression: {elements: [
                            {star: true, link: []}
                        ]}
                    }
                ],
                from: [{
                    joins: [],
    
                    table: {star: false, link: [
                        {word: "x1"}
                    ]}
                }]
            }
        }
    });

    testSyntax(Insert, {
        str: "insert into companies (id, name) values (1, 'Test') on conflict (id) do nothing",
        shouldBe: {
            table: {star: false, link: [
                {word: "companies"}
            ]},
            columns: [
                {word: "id"},
                {word: "name"}
            ],
            values: [
                {values: [
                    { value: {elements: [
                        {number: "1"}
                    ]}},
                    { value: {elements: [
                        {content: "Test"}
                    ]}}
                ]}
            ],
            onConflict: {
                target: [{
                    column: {word: "id"}
                }],
                doNothing: true
            }
        }
    });
    
    testSyntax(Insert, {
        str: "insert into companies (id, name) values (1, 'Test') on conflict (id) where id > 0 do nothing",
        shouldBe: {
            table: {star: false, link: [
                {word: "companies"}
            ]},
            columns: [
                {word: "id"},
                {word: "name"}
            ],
            values: [
                {values: [
                    { value: {elements: [
                        {number: "1"}
                    ]}},
                    { value: {elements: [
                        {content: "Test"}
                    ]}}
                ]}
            ],
            onConflict: {
                target: [{
                    column: {word: "id"}
                }],
                where: {elements: [
                    {star: false, link: [
                        {word: "id"}
                    ]},
                    {operator: ">"},
                    {number: "0"}
                ]},
                doNothing: true
            }
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
            table: {star: false, link: [
                {word: "companies"}
            ]},
            columns: [
                {word: "id"},
                {word: "name"}
            ],
            values: [
                {values: [
                    { value: {elements: [
                        {number: "1"}
                    ]}},
                    { value: {elements: [
                        {content: "Test"}
                    ]}}
                ]}
            ],
            onConflict: {
                constraint: {word: "some_constraint_name"},
                where: {elements: [
                    {star: false, link: [
                        {word: "id"}
                    ]},
                    {operator: ">"},
                    {number: "0"}
                ]},
                doNothing: true
            }
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
            table: {star: false, link: [
                {word: "companies"}
            ]},
            columns: [
                {word: "id"},
                {word: "name"}
            ],
            values: [
                {values: [
                    { value: {elements: [
                        {number: "1"}
                    ]}},
                    { value: {elements: [
                        {content: "Test"}
                    ]}}
                ]}
            ],
            onConflict: {
                target: [{
                    column: {word: "inn"}
                }],
                updateSet: [{
                    column: {word: "name"},
                    value: { value: {elements: [
                        {star: false, link: [
                            {word: "excluded"},
                            {word: "name"}
                        ]}
                    ]}}
                }]
            }
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
            table: {star: false, link: [
                {word: "companies"}
            ]},
            columns: [
                {word: "id"},
                {word: "name"}
            ],
            values: [
                {values: [
                    { value: {elements: [
                        {number: "1"}
                    ]}},
                    { value: {elements: [
                        {content: "Test"}
                    ]}}
                ]}
            ],
            onConflict: {
                target: [{
                    column: {word: "inn"}
                }],
                updateSet: [{
                    column: {word: "name"},
                    value: { value: {elements: [
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
            }
        }
    });

    testSyntax(Insert, {
        str: "insert into orders default values returning *, id, id_client as client_id",
        shouldBe: {
            table: {star: false, link: [
                {word: "orders"}
            ]},
            defaultValues: true,
            returning: {
                returningColumns: [
                    {expression: {elements: [
                        {star: true, link: []}
                    ]}},
                    {expression: {elements: [
                        {star: false, link: [
                            {word: "id"}
                        ]}
                    ]}},
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
