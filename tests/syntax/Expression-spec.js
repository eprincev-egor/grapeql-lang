"use strict";

const Expression = require("../../lib/syntax/Expression");
const testSyntax = require("../testSyntax");

describe("Expression", () => {

    testSyntax(Expression, {
        str: "1+1",
        result: {
            elements: [
                {number: "1"},
                {operator: "+"},
                {number: "1"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "-1",
        result: {
            elements: [
                {operator: "-"},
                {number: "1"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "1 + 1",
        result: {
            elements: [
                {number: "1"},
                {operator: "+"},
                {number: "1"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "(1+1)",
        result: {
            elements: [
                {number: "1"},
                {operator: "+"},
                {number: "1"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "1::text::bigint-2 ",
        result: {
            elements: [
                {number: "1"},
                {operator: "::"},
                {type: "text"},
                {operator: "::"},
                {type: "bigint"},
                {operator: "-"},
                {number: "2"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "1::1",
        error: /unknown data type/
    });

    testSyntax(Expression, {
        str: "(1)::bigint",
        result: {
            elements: [
                {
                    elements: [
                        {number: "1"}
                    ]
                },
                {operator: "::"},
                {type: "bigint"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "$user::bigint % 4",
        result: {
            elements: [
                {name: "user"},
                {operator: "::"},
                {type: "bigint"},
                {operator: "%"},
                {number: "4"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "$$test$$ || E'str'",
        result: {
            elements: [
                {content: "test"},
                {operator: "||"},
                {content: "str"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "true-false*null+1/'test'",
        result: {
            elements: [
                {boolean: true},
                {operator: "-"},
                {boolean: false},
                {operator: "*"},
                {null: true},
                {operator: "+"},
                {number: "1"},
                {operator: "/"},
                {content: "test"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "((('extrude')))",
        result: {
            elements: [
                {content: "extrude"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "(-1+2.1)*''-(('test')+8)",
        result: {
            elements: [
                {
                    elements: [
                        {operator: "-"},
                        {number: "1"},
                        {operator: "+"},
                        {number: "2.1"}
                    ]
                },
                {operator: "*"},
                {content: ""},
                {operator: "-"},
                {
                    elements: [
                        {elements: [
                            {content: "test"}
                        ]},
                        {operator: "+"},
                        {number: "8"}
                    ]
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "order.sum + Company.total",
        result: {
            elements: [
                {star: false, link: [
                    {word: "order", content: null},
                    {word: "sum", content: null}
                ]},
                {operator: "+"},
                {star: false, link: [
                    {word: "company", content: null},
                    {word: "total", content: null}
                ]}
            ]
        }
    });

    testSyntax(Expression, {
        str: "*",
        options: {
            availableStar: true
        },
        result: {
            elements: [
                {star: true, link: []}
            ]
        }
    });

    testSyntax(Expression, {
        str: "cast(1 as numeric( 12, 12 )) * 2",
        result: {
            elements: [
                {
                    cast: {
                        type: "numeric(12,12)"
                    },
                    expression: {
                        elements: [
                            {
                                number: "1"
                            }
                        ]
                    }
                },
                {operator: "*"},
                {number: "2"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "array[1]",
        result: {
            elements: [{array: [
                {elements: [
                    {number: "1"}
                ]}
            ]}]
        }
    });

    testSyntax(Expression, {
        str: "1::::bigint",
        error: /expected type/
    });

    testSyntax(Expression, {
        str: "1 + case when true then 1 else 0 end",
        result: {
            elements: [
                {number: "1"},
                {operator: "+"},
                {
                    case: [
                        {
                            when: {elements: [
                                {boolean: true}
                            ]},
                            then: {elements: [
                                {number: "1"}
                            ]}
                        }
                    ],
                    else: {elements: [
                        {number: "0"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "extract( day from timestamp '2000-12-16 12:21:13' )",
        result: {
            elements: [
                {
                    field: "day",
                    type: {type: "timestamp"},
                    source: {elements: [
                        {content: "2000-12-16 12:21:13"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "substring( country.id from 1 for 3 ) || ' ' || substring( company.name from 1 )",
        result: {
            elements: [
                {
                    str: {elements: [{
                        star: false,
                        link: [
                            {word: "country", content: null},
                            {word: "id", content: null}
                        ]
                    }]},
                    from: {elements: [{
                        number: "1"
                    }]},
                    for: {elements: [{
                        number: "3"
                    }]}
                },
                {operator: "||"},
                {content: " "},
                {operator: "||"},
                {
                    str: {elements: [{
                        star: false,
                        link: [
                            {word: "company", content: null},
                            {word: "name", content: null}
                        ]
                    }]},
                    from: {elements: [{
                        number: "1"
                    }]},
                    for: null
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "10 * default_pay()",
        result: {
            elements: [
                {number: "10"},
                {operator: "*"},
                {
                    function: {
                        star: false,
                        link: [
                            {word: "default_pay", content: null}
                        ]
                    },
                    all: null,
                    distinct: null,
                    arguments: [],
                    where: null,
                    orderBy: null,
                    within: null,
                    over: null,
                    emptyOver: null
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "10 * (get_some_arr())[1]",
        result: {
            elements: [
                {number: "10"},
                {operator: "*"},
                {elements: [
                    {
                        function: {
                            star: false,
                            link: [
                                {word: "get_some_arr", content: null}
                            ]
                        },
                        all: null,
                        distinct: null,
                        arguments: [],
                        where: null,
                        orderBy: null,
                        within: null,
                        over: null,
                        emptyOver: null
                    }
                ]},
                {
                    content: {elements: [
                        {number: "1"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "id = 2 or id = -3",
        result: {
            elements: [
                {star: false, link: [
                    {word: "id", content: null}
                ]},
                {operator: "="},
                {number: "2"},

                {operator: "or"},

                {star: false, link: [
                    {word: "id", content: null}
                ]},
                {operator: "="},
                {operator: "-"},
                {number: "3"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "id = 2 or - -+id = 3",
        result: {
            elements: [
                {star: false, link: [
                    {word: "id", content: null}
                ]},
                {operator: "="},
                {number: "2"},

                {operator: "or"},

                {operator: "-"},
                {operator: "-"},
                {operator: "+"},

                {star: false, link: [
                    {word: "id", content: null}
                ]},
                {operator: "="},
                {number: "3"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "2::date::text || '120'::char(2) - -8",
        result: {
            elements: [
                {number: "2"},
                {operator: "::"},
                {type: "date"},
                {operator: "::"},
                {type: "text"},

                {operator: "||"},

                {content: "120"},
                {operator: "::"},
                {type: "char(2)"},

                {operator: "-"},

                {operator: "-"},
                {number: "8"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "(-1 + 2.1) * '0'::numeric - ( ('-2')::bigint + 8)",
        result: {
            elements: [
                {elements: [
                    {operator: "-"},
                    {number: "1"},
                    {operator: "+"},
                    {number: "2.1"}
                ]},

                {operator: "*"},

                {content: "0"},
                {operator: "::"},
                {type: "numeric"},

                {operator: "-"},

                {elements: [
                    {elements: [
                        {content: "-2"}
                    ]},


                    {operator: "::"},
                    {type: "bigint"},
                    {operator: "+"},
                    {number: "8"}
                ]}
            ]
        }
    });


    testSyntax(Expression, {
        str: "my_table.my_column_arr[1]",
        result: {
            elements: [
                {star: false, link: [
                    {word: "my_table", content: null},
                    {word: "my_column_arr", content: null}
                ]},
                {content: {elements: [
                    {number: "1"}
                ]}}
            ]
        }
    });

    testSyntax(Expression, {
        str: "(array[100, 200])[1]",
        result: {
            elements: [
                {elements: [
                    {array: [
                        {elements: [
                            {number: "100"}
                        ]},
                        {elements: [
                            {number: "200"}
                        ]}
                    ]}
                ]},
                {
                    content: {elements: [
                        {number: "1"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "(array[100, 200]::bigint[])[1]",
        result: {
            elements: [
                {elements: [
                    {array: [
                        {elements: [
                            {number: "100"}
                        ]},
                        {elements: [
                            {number: "200"}
                        ]}
                    ]},
                    {operator: "::"},
                    {type: "bigint[]"}
                ]},
                {
                    content: {elements: [
                        {number: "1"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "array[]",
        result: {
            elements: [
                {array: []}
            ]
        }
    });

    testSyntax(Expression, {
        str: "array[1]",
        result: {
            elements: [
                {array: [
                    {
                        elements: [
                            {number: "1"}
                        ]
                    }
                ]}
            ]
        }
    });

    testSyntax(Expression, {
        str: "array[true, false]",
        result: {
            elements: [
                {array: [
                    {
                        elements: [
                            {boolean: true}
                        ]
                    },
                    {
                        elements: [
                            {boolean: false}
                        ]
                    }
                ]}
            ]
        }
    });

    testSyntax(Expression, {
        str: "array[1]::bigint[]",
        result: {
            elements: [
                {array: [
                    {
                        elements: [
                            {number: "1"}
                        ]
                    }
                ]},
                {operator: "::"},
                {type: "bigint[]"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "array[null]::bigint[]",
        result: {
            elements: [
                {array: [
                    {
                        elements: [
                            {null: true}
                        ]
                    }
                ]},
                {operator: "::"},
                {type: "bigint[]"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "array[null]::numeric(10, 2)[]",
        result: {
            elements: [
                {array: [
                    {
                        elements: [
                            {null: true}
                        ]
                    }
                ]},
                {operator: "::"},
                {type: "numeric(10,2)[]"}
            ]
        }
    });

});
