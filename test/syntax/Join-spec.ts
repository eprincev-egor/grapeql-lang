

import Join from "../../lib/syntax/Join";
import testSyntax from "../testSyntax";

describe("Join", () => {

    testSyntax(Join, {
        str: "JOIN company on true",
        result: {
            type: "join",
            from: {
                lateral: null,
                only: null,
                file: null,
                withOrdinality: null,
                functionCall: null,
                star: null,
                as: null,
                columns: null,
                select: null,
                joins: [],
    
                table: {star: false, link: [
                    {word: "company", content: null}
                ]}
            },
            on: {elements: [
                {boolean: true}
            ]},
            using: null
        }
    });

    testSyntax(Join, {
        str: "left join company on true",
        result: {
            type: "left join",
            from: {
                lateral: null,
                only: null,
                file: null,
                withOrdinality: null,
                functionCall: null,
                star: null,
                as: null,
                columns: null,
                select: null,
                joins: [],
    
                table: {star: false, link: [
                    {word: "company", content: null}
                ]}
            },
            on: {elements: [
                {boolean: true}
            ]},
            using: null
        }
    });

    testSyntax(Join, {
        str: "right join company on true",
        result: {
            type: "right join",
            from: {
                lateral: null,
                only: null,
                file: null,
                withOrdinality: null,
                functionCall: null,
                select: null,
                star: null,
                as: null,
                columns: null,
                joins: [],
    
                table: {star: false, link: [
                    {word: "company", content: null}
                ]}
            },
            on: {elements: [
                {boolean: true}
            ]},
            using: null
        }
    });

    testSyntax(Join, {
        str: "inner join company on true",
        result: {
            type: "inner join",
            from: {
                lateral: null,
                only: null,
                file: null,
                withOrdinality: null,
                functionCall: null,
                select: null,
                star: null,
                as: null,
                columns: null,
                joins: [],
    
                table: {star: false, link: [
                    {word: "company", content: null}
                ]}
            },
            on: {elements: [
                {boolean: true}
            ]},
            using: null
        }
    });

    testSyntax(Join, {
        str: "full join company on true",
        result: {
            type: "full join",
            from: {
                lateral: null,
                only: null,
                file: null,
                withOrdinality: null,
                functionCall: null,
                select: null,
                star: null,
                as: null,
                columns: null,
                joins: [],
    
                table: {star: false, link: [
                    {word: "company", content: null}
                ]}
            },
            on: {elements: [
                {boolean: true}
            ]},
            using: null
        }
    });

    testSyntax(Join, {
        str: "CROSS  Join company on true",
        result: {
            type: "cross join",
            from: {
                lateral: null,
                only: null,
                file: null,
                withOrdinality: null,
                functionCall: null,
                select: null,
                star: null,
                as: null,
                columns: null,
                joins: [],
    
                table: {star: false, link: [
                    {word: "company", content: null}
                ]}
            },
            on: {elements: [
                {boolean: true}
            ]},
            using: null
        }
    });

    testSyntax(Join, {
        str: "full  outer  join  company on true",
        result: {
            type: "full outer join",
            from: {
                lateral: null,
                only: null,
                file: null,
                withOrdinality: null,
                functionCall: null,
                select: null,
                star: null,
                as: null,
                columns: null,
                joins: [],
    
                table: {star: false, link: [
                    {word: "company", content: null}
                ]}
            },
            on: {elements: [
                {boolean: true}
            ]},
            using: null
        }
    });

    testSyntax(Join, {
        str: "left wrong join",
        error: /expected join keyword/
    });

    testSyntax(Join, {
        str: "JOIN lateral get_some_rows( company.id ) as rows on true",
        result: {
            type: "join",
            from: {
                only: null,
                file: null,
                table: null,
                joins: [],
                withOrdinality: null,
                star: null,
                select: null,
                
                lateral: true,
                functionCall: {
                    distinct: null,
                    emptyOver: null,
                    orderBy: null,
                    over: null,
                    all: null,
                    within: null,
                    where: null,
    
                    function: {star: false, link: [
                        { word: "get_some_rows", content: null }
                    ]},
                    arguments: [
                        {elements: [
                            {star: false, link: [
                                { word: "company", content: null },
                                { word: "id", content: null }
                            ]}
                        ]}
                    ]
                },
                as: {
                    word: "rows",
                    content: null
                },
                
                columns: null
            },
            on: {elements: [
                {boolean: true}
            ]},
            using: null
        }
    });

    testSyntax(Join, {
        str: "left JOIN lateral get_some_rows( company.id ) as rows on true",
        result: {
            type: "left join",
            from: {
                only: null,
                file: null,
                table: null,
                joins: [],
                withOrdinality: null,
                star: null,
                select: null,
                
                lateral: true,
                functionCall: {
                    distinct: null,
                    emptyOver: null,
                    orderBy: null,
                    over: null,
                    all: null,
                    within: null,
                    where: null,
    
                    function: {star: false, link: [
                        { word: "get_some_rows", content: null }
                    ]},
                    arguments: [
                        {elements: [
                            {star: false, link: [
                                { word: "company", content: null },
                                { word: "id", content: null }
                            ]}
                        ]}
                    ]
                },
                as: {
                    word: "rows",
                    content: null
                },
                
                columns: null
            },
            on: {elements: [
                {boolean: true}
            ]},
            using: null
        }
    });

    testSyntax(Join, {
        str: "inner join lateral get_some_rows( company.id ) as rows on true",
        result: {
            type: "inner join",
            from: {
                only: null,
                file: null,
                table: null,
                joins: [],
                withOrdinality: null,
                star: null,
                select: null,

                lateral: true,
                functionCall: {
                    distinct: null,
                    emptyOver: null,
                    orderBy: null,
                    over: null,
                    all: null,
                    within: null,
                    where: null,
    
                    function: {star: false, link: [
                        { word: "get_some_rows", content: null }
                    ]},
                    arguments: [
                        {elements: [
                            {star: false, link: [
                                { word: "company", content: null },
                                { word: "id", content: null }
                            ]}
                        ]}
                    ]
                },
                as: {
                    word: "rows",
                    content: null
                },
                
                columns: null
            },
            on: {elements: [
                {boolean: true}
            ]},
            using: null
        }
    });

    testSyntax(Join, {
        str: "right join lateral get_some_rows( company.id ) as rows on true",
        error: /The combining JOIN type must be INNER or LEFT for a LATERAL reference/
    });

    
    testSyntax(Join, {
        str: "JOIN company using(id)",
        result: {
            type: "join",
            from: {
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
                    {word: "company", content: null}
                ]}
            },
            on: null,
            using: [
                {word: "id", content: null}
            ]
        }
    });

    testSyntax(Join, {
        str: "JOIN company using ( key1, key2 )",
        result: {
            type: "join",
            from: {
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
                    {word: "company", content: null}
                ]}
            },
            on: null,
            using: [
                {word: "key1", content: null},
                {word: "key2", content: null}
            ]
        }
    });

    testSyntax(Join, {
        str: "left join company",
        error: /expected 'on' or 'using'/
    });
});
