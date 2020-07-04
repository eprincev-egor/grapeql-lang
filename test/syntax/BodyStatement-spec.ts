
import {BodyStatement} from "../../lib/syntax/BodyStatement";
import {testSyntax} from "../testSyntax";

describe("BodyStatement", () => {

    testSyntax(BodyStatement, {
        str: "a = 1;",
        shouldBe: {
            statements: [
                {
                    variable: {
                        star: false, link: [
                            {word: "a"}
                        ]
                    },
                    assign: {elements: [
                        {number: "1"}
                    ]}
                }
            ]
        }
    });
    
    testSyntax(BodyStatement, {
        str: "a = 1; b = a;",
        shouldBe: {
            statements: [
                {
                    variable: {
                        star: false, link: [
                            {word: "a"}
                        ]
                    },
                    assign: {elements: [
                        {number: "1"}
                    ]}
                },
                {
                    variable: {
                        star: false, link: [
                            {word: "b"}
                        ]
                    },
                    assign: {elements: [
                        {star: false, link: [
                            {word: "a"}
                        ]}
                    ]}
                }
            ]
        }
    });

    testSyntax(BodyStatement, {
        str: "a = 1;return a + 10;",
        shouldBe: {
            statements: [
                {
                    variable: {
                        star: false, link: [
                            {word: "a"}
                        ]
                    },
                    assign: {elements: [
                        {number: "1"}
                    ]}
                },
                {
                    return: {elements: [
                        {star: false, link: [
                            {word: "a"}
                        ]},
                        {operator: "+"},
                        {number: "10"}
                    ]}
                }
            ]
        }
    });

    testSyntax(BodyStatement, {
        str: "if true then return 1; end if;",
        shouldBe: {
            statements: [
                {
                    if: {elements: [
                        {boolean: true}
                    ]},
                    then: {statements: [
                        {return: {elements: [
                            {number: "1"}
                        ]}}
                    ]},
                    elsif: null,
                    else: null
                }
            ]
        }
    }); 

    testSyntax(BodyStatement, {
        str: "select 1 into a;",
        shouldBe: {
            statements: [
                {
                    with: null,
                    columns: [
                        {
                            expression: {elements: [
                                {number: "1"}
                            ]},
                            as: null
                        }
                    ],
                    into: [
                        {star: false, link: [
                            {word: "a"}
                        ]}
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
            ]
        }
    });

    testSyntax(BodyStatement, {
        str: "update companies set name = 'nice';",
        shouldBe: {
            statements: [
                {
                    with: null,
                    only: false,
                    table: {link: [
                        {word: "companies"}
                    ], star: false},
                    as: null,
                    star: false,
                    set: [
                        {
                            column: {word: "name"},
                            columns: null,
                            select: null,
                            values: null,
                            value: {default: null, value: {elements: [
                                {content: "nice"}
                            ]}}
                        }
                    ],
                    from: null,
                    where: null,
                    returning: null
                }
            ]
        }
    });
   
    
    testSyntax(BodyStatement, {
        str: "delete from companies where id = 1;",
        shouldBe: {
            statements: [
                {
                    only: false,
                    star: false,
                    table: {star: false, link: [
                        {word: "companies"}
                    ]},
                    as: null,
                    using: null,
                    with: null,
                    where: {elements: [
                        {star: false, link: [
                            {word: "id"}
                        ]},
                        {operator: "="},
                        {number: "1"}
                    ]},
                    returning: null
                }
            ]
        }
    });
   
    testSyntax(BodyStatement, {
        str: "insert into companies (name) values ('nice');",
        shouldBe: {
            statements: [
                {
                    with: null,
                    table: {star: false, link: [
                        {word: "companies"}
                    ]},
                    as: null,
                    columns: [
                        {word: "name"}
                    ],
                    defaultValues: null,
                    values: [
                        {values: [
                            {default: null, value: {elements: [
                                {content: "nice"}
                            ]}}
                        ]}
                    ],
                    select: null,
                    onConflict: null,
                    returning: null
                }
            ]
        }
    });

    testSyntax(BodyStatement, {
        str: `
            a = 1;
            raise notice 'hello %', a;
        `.trim(),
        shouldBe: {
            statements: [
                {
                    variable: {
                        star: false, link: [
                            {word: "a"}
                        ]
                    },
                    assign: {elements: [
                        {number: "1"}
                    ]}
                },
                {
                    level: "notice",
                    conditionName: null,
                    sqlState: null,
                    raise: {content: "hello %"},
                    parameters: [
                        {elements: [
                            {star: false, link: [
                                {word: "a"}
                            ]}
                        ]}
                    ],
                    using: []
                }
            ]
        }
    });   
});
