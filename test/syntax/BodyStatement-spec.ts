
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
                    ]}
                }
            ]
        }
    }); 

    testSyntax(BodyStatement, {
        str: "select 1 into a;",
        shouldBe: {
            statements: [
                {
                    columns: [
                        {
                            expression: {elements: [
                                {number: "1"}
                            ]}
                        }
                    ],
                    into: [
                        {star: false, link: [
                            {word: "a"}
                        ]}
                    ]
                }
            ]
        }
    });

    testSyntax(BodyStatement, {
        str: "update companies set name = 'nice';",
        shouldBe: {
            statements: [
                {
                    only: false,
                    table: {link: [
                        {word: "companies"}
                    ], star: false},
                    star: false,
                    set: [
                        {
                            column: {word: "name"},
                            value: { value: {elements: [
                                {content: "nice"}
                            ]}}
                        }
                    ]
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
                    where: {elements: [
                        {star: false, link: [
                            {word: "id"}
                        ]},
                        {operator: "="},
                        {number: "1"}
                    ]}
                }
            ]
        }
    });
   
    testSyntax(BodyStatement, {
        str: "insert into companies (name) values ('nice');",
        shouldBe: {
            statements: [
                {
                    table: {star: false, link: [
                        {word: "companies"}
                    ]},
                    columns: [
                        {word: "name"}
                    ],
                    values: [
                        {values: [
                            { value: {elements: [
                                {content: "nice"}
                            ]}}
                        ]}
                    ]
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
