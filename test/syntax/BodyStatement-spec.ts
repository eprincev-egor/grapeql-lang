
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
                            {word: "a", content: null}
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
                            {word: "a", content: null}
                        ]
                    },
                    assign: {elements: [
                        {number: "1"}
                    ]}
                },
                {
                    variable: {
                        star: false, link: [
                            {word: "b", content: null}
                        ]
                    },
                    assign: {elements: [
                        {star: false, link: [
                            {word: "a", content: null}
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
                            {word: "a", content: null}
                        ]
                    },
                    assign: {elements: [
                        {number: "1"}
                    ]}
                },
                {
                    return: {elements: [
                        {star: false, link: [
                            {word: "a", content: null}
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
                            {word: "a", content: null}
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
                        {word: "companies", content: null}
                    ], star: false},
                    as: null,
                    star: false,
                    set: [
                        {
                            column: {word: "name", content: null},
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
                        {word: "companies", content: null}
                    ]},
                    as: null,
                    using: null,
                    with: null,
                    where: {elements: [
                        {star: false, link: [
                            {word: "id", content: null}
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
                        {word: "companies", content: null}
                    ]},
                    as: null,
                    columns: [
                        {word: "name", content: null}
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
                            {word: "a", content: null}
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
                                {word: "a", content: null}
                            ]}
                        ]}
                    ],
                    using: []
                }
            ]
        }
    });   
});
