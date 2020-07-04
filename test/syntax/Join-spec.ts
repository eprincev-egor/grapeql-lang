
import {testSyntax} from "../testSyntax";
import {Join} from "../../lib/syntax/Join";

describe("Join", () => {

    testSyntax(Join, {
        str: "JOIN company on true",
        shouldBe: {
            type: "join",
            from: {
                joins: [],
    
                table: {star: false, link: [
                    {word: "company"}
                ]}
            },
            on: {elements: [
                {boolean: true}
            ]}
        }
    });

    testSyntax(Join, {
        str: "left join company on true",
        shouldBe: {
            type: "left join",
            from: {
                joins: [],
    
                table: {star: false, link: [
                    {word: "company"}
                ]}
            },
            on: {elements: [
                {boolean: true}
            ]}
        }
    });

    testSyntax(Join, {
        str: "right join company on true",
        shouldBe: {
            type: "right join",
            from: {
                joins: [],
    
                table: {star: false, link: [
                    {word: "company"}
                ]}
            },
            on: {elements: [
                {boolean: true}
            ]}
        }
    });

    testSyntax(Join, {
        str: "inner join company on true",
        shouldBe: {
            type: "inner join",
            from: {
                joins: [],
    
                table: {star: false, link: [
                    {word: "company"}
                ]}
            },
            on: {elements: [
                {boolean: true}
            ]}
        }
    });

    testSyntax(Join, {
        str: "full join company on true",
        shouldBe: {
            type: "full join",
            from: {
                joins: [],
    
                table: {star: false, link: [
                    {word: "company"}
                ]}
            },
            on: {elements: [
                {boolean: true}
            ]}
        }
    });

    testSyntax(Join, {
        str: "CROSS  Join company on true",
        shouldBe: {
            type: "cross join",
            from: {
                joins: [],
    
                table: {star: false, link: [
                    {word: "company"}
                ]}
            },
            on: {elements: [
                {boolean: true}
            ]}
        }
    });

    testSyntax(Join, {
        str: "full  outer  join  company on true",
        shouldBe: {
            type: "full outer join",
            from: {
                joins: [],
    
                table: {star: false, link: [
                    {word: "company"}
                ]}
            },
            on: {elements: [
                {boolean: true}
            ]}
        }
    });

    testSyntax(Join, {
        str: "left wrong join",
        error: /expected join keyword/
    });

    testSyntax(Join, {
        str: "JOIN lateral get_some_rows( company.id ) as rows on true",
        shouldBe: {
            type: "join",
            from: {
                joins: [],
                
                lateral: true,
                functionCall: {
    
                    function: {star: false, link: [
                        { word: "get_some_rows" }
                    ]},
                    arguments: [
                        {elements: [
                            {star: false, link: [
                                { word: "company" },
                                { word: "id" }
                            ]}
                        ]}
                    ]
                },
                as: {
                    word: "rows"
                }
            },
            on: {elements: [
                {boolean: true}
            ]}
        }
    });

    testSyntax(Join, {
        str: "left JOIN lateral get_some_rows( company.id ) as rows on true",
        shouldBe: {
            type: "left join",
            from: {
                joins: [],
                
                lateral: true,
                functionCall: {
    
                    function: {star: false, link: [
                        { word: "get_some_rows" }
                    ]},
                    arguments: [
                        {elements: [
                            {star: false, link: [
                                { word: "company" },
                                { word: "id" }
                            ]}
                        ]}
                    ]
                },
                as: {
                    word: "rows"
                }
            },
            on: {elements: [
                {boolean: true}
            ]}
        }
    });

    testSyntax(Join, {
        str: "inner join lateral get_some_rows( company.id ) as rows on true",
        shouldBe: {
            type: "inner join",
            from: {
                joins: [],

                lateral: true,
                functionCall: {
    
                    function: {star: false, link: [
                        { word: "get_some_rows" }
                    ]},
                    arguments: [
                        {elements: [
                            {star: false, link: [
                                { word: "company" },
                                { word: "id" }
                            ]}
                        ]}
                    ]
                },
                as: {
                    word: "rows"
                }
            },
            on: {elements: [
                {boolean: true}
            ]}
        }
    });

    testSyntax(Join, {
        str: "right join lateral get_some_rows( company.id ) as rows on true",
        error: /The combining JOIN type must be INNER or LEFT for a LATERAL reference/
    });

    
    testSyntax(Join, {
        str: "JOIN company using(id)",
        shouldBe: {
            type: "join",
            from: {
                joins: [],
    
                table: {star: false, link: [
                    {word: "company"}
                ]}
            },
            using: [
                {word: "id"}
            ]
        }
    });

    testSyntax(Join, {
        str: "JOIN company using ( key1, key2 )",
        shouldBe: {
            type: "join",
            from: {
                joins: [],
    
                table: {star: false, link: [
                    {word: "company"}
                ]}
            },
            using: [
                {word: "key1"},
                {word: "key2"}
            ]
        }
    });

    testSyntax(Join, {
        str: "left join company",
        error: /expected 'on' or 'using'/
    });
});
