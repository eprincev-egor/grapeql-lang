
import {GrapeQLCoach} from "../../lib/GrapeQLCoach";
import {testSyntax} from "../testSyntax";
import assert from "assert";
import {Expression} from "../../lib/syntax/Expression";

describe("Expression", () => {

    testSyntax(Expression, {
        str: "1+1",
        shouldBe: {
            elements: [
                {number: "1"},
                {operator: "+"},
                {number: "1"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "-1",
        shouldBe: {
            elements: [
                {operator: "-"},
                {number: "1"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "1 + 1",
        shouldBe: {
            elements: [
                {number: "1"},
                {operator: "+"},
                {number: "1"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "(1+1)",
        shouldBe: {
            elements: [
                {number: "1"},
                {operator: "+"},
                {number: "1"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "1::text::bigint-2 ",
        shouldBe: {
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
        str: "(1)::bigint",
        shouldBe: {
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
        shouldBe: {
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
        shouldBe: {
            elements: [
                {content: "test"},
                {operator: "||"},
                {content: "str"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "true-false*null+1/'test'",
        shouldBe: {
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
        str: "((('no extrude')))",
        shouldBe: {
            brackets: true,
            elements: [
                {
                    brackets: true,
                    elements: [
                        {
                            brackets: true,
                            elements: [
                                {content: "no extrude"}
                            ]
                        }
                    ]
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "(-1+2.1)*''-(('test')+8)",
        shouldBe: {
            elements: [
                {
                    brackets: true,
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
                    brackets: true,
                    elements: [
                        {
                            brackets: true,
                                elements: [
                                {content: "test"}
                            ]
                        },
                        {operator: "+"},
                        {number: "8"}
                    ]
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "order.sum + Company.total",
        shouldBe: {
            elements: [
                {star: false, link: [
                    {word: "order"},
                    {word: "sum"}
                ]},
                {operator: "+"},
                {star: false, link: [
                    {word: "company"},
                    {word: "total"}
                ]}
            ]
        }
    });

    testSyntax(Expression, {
        str: "*",
        options: {
            availableStar: true
        },
        shouldBe: {
            elements: [
                {star: true, link: []}
            ]
        }
    });

    testSyntax(Expression, {
        str: "cast(1 as numeric( 12, 12 )) * 2",
        shouldBe: {
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
        shouldBe: {
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
        shouldBe: {
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
        str: "extract( day from '2000-12-16 12:21:13'::timestamp )",
        shouldBe: {
            elements: [
                {
                    extract: "day",
                    from: {elements: [
                        {content: "2000-12-16 12:21:13"},
                        {operator: "::"},
                        {type: "timestamp"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "substring( country.id from 1 for 3 ) || ' ' || substring( company.name from 1 )",
        shouldBe: {
            elements: [
                {
                    str: {elements: [{
                        star: false,
                        link: [
                            {word: "country"},
                            {word: "id"}
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
                            {word: "company"},
                            {word: "name"}
                        ]
                    }]},
                    from: {elements: [{
                        number: "1"
                    }]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "10 * default_pay()",
        shouldBe: {
            elements: [
                {number: "10"},
                {operator: "*"},
                {
                    function: {
                        star: false,
                        link: [
                            {word: "default_pay"}
                        ]
                    },
                    arguments: []
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "10 * (get_some_arr())[1]",
        shouldBe: {
            elements: [
                {number: "10"},
                {operator: "*"},
                {brackets: true, elements: [
                    {
                        function: {
                            star: false,
                            link: [
                                {word: "get_some_arr"}
                            ]
                        },
                        arguments: []
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
        str: "(list_gtd.additional_check_doc_present_date + coalesce( list_gtd.additional_check_total_days_for_present, 0 )* INTERVAL '1 day')",
        shouldBe: {
            brackets: true,
            elements: [
                {link: [
                    {word: "list_gtd"},
                    {word: "additional_check_doc_present_date"}
                ]},
                {operator: "+"},
                {
                    function: {
                        link: [
                            {word: "coalesce"}
                        ]
                    },
                    arguments: [
                        {elements: [
                            {link: [
                                {word: "list_gtd"},
                                {word: "additional_check_total_days_for_present"}
                            ]},
                        ]},
                        {elements: [
                            {number: "0"}
                        ]}
                    ]
                },
                {operator: "*"},
                {
                    interval: {
                        content: "1 day"
                    }
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: `array_remove(
            array_append(
                contractor_linked_companies.linked_companies,
                list_user.id_list_company
            ),
            NULL
        )`,
        shouldBe: {elements: [
            {
                function: {
                    link: [
                        {word: "array_remove"}
                    ]
                },
                arguments: [
                    {elements: [
                        {
                            function: {
                                link: [
                                    {word: "array_append"}
                                ]
                            },
                            arguments: [
                                {elements: [
                                    {link: [
                                        {word: "contractor_linked_companies"},
                                        {word: "linked_companies"}
                                    ]},
                                ]},
                                {elements: [
                                    {link: [
                                        {word: "list_user"},
                                        {word: "id_list_company"}
                                    ]},
                                ]}
                            ]
                        }
                    ]},
                    {elements: [
                        {null: true}
                    ]}
                ]
            }
        ]}
    });

    testSyntax(Expression, {
        str: "id = 2 or id = -3",
        shouldBe: {
            elements: [
                {star: false, link: [
                    {word: "id"}
                ]},
                {operator: "="},
                {number: "2"},

                {operator: "or"},

                {star: false, link: [
                    {word: "id"}
                ]},
                {operator: "="},
                {operator: "-"},
                {number: "3"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "id = 2 or - -+id = 3",
        shouldBe: {
            elements: [
                {star: false, link: [
                    {word: "id"}
                ]},
                {operator: "="},
                {number: "2"},

                {operator: "or"},

                {operator: "-"},
                {operator: "-"},
                {operator: "+"},

                {star: false, link: [
                    {word: "id"}
                ]},
                {operator: "="},
                {number: "3"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "2::date::text || '120'::char(2) - -8",
        shouldBe: {
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
        shouldBe: {
            elements: [
                {brackets: true, elements: [
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

                {brackets: true, elements: [
                    {brackets: true, elements: [
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
        shouldBe: {
            elements: [
                {star: false, link: [
                    {word: "my_table"},
                    {word: "my_column_arr"}
                ]},
                {content: {elements: [
                    {number: "1"}
                ]}}
            ]
        }
    });

    testSyntax(Expression, {
        str: "(array[100, 200])[1]",
        shouldBe: {
            elements: [
                {brackets: true, elements: [
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
        shouldBe: {
            elements: [
                {brackets: true, elements: [
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
        shouldBe: {
            elements: [
                {array: []}
            ]
        }
    });

    testSyntax(Expression, {
        str: "array[1]",
        shouldBe: {
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
        shouldBe: {
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
        shouldBe: {
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
        shouldBe: {
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
        shouldBe: {
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

    testSyntax(Expression, {
        str: "company.id between 1 and 2",
        shouldBe: {
            elements: [
                {star: false, link: [
                    {word: "company"},
                    {word: "id"}
                ]},
                {
                    between: {elements: [
                        {number: "1"}
                    ]},
                    and: {elements: [
                        {number: "2"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "company.id between 1 and 2 or company.id between 5 and 6",
        shouldBe: {
            elements: [
                {star: false, link: [
                    {word: "company"},
                    {word: "id"}
                ]},
                {
                    between: {elements: [
                        {number: "1"}
                    ]},
                    and: {elements: [
                        {number: "2"}
                    ]}
                },
                {operator: "or"},
                {star: false, link: [
                    {word: "company"},
                    {word: "id"}
                ]},
                {
                    between: {elements: [
                        {number: "5"}
                    ]},
                    and: {elements: [
                        {number: "6"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "company.id between 1 and 2 > true",
        shouldBe: {
            elements: [
                {star: false, link: [
                    {word: "company"},
                    {word: "id"}
                ]},
                {
                    between: {elements: [
                        {number: "1"}
                    ]},
                    and: {elements: [
                        {number: "2"}
                    ]}
                },
                {operator: ">"},
                {boolean: true}
            ]
        }
    });

    testSyntax(Expression, {
        str: "company.id between 1 and 2 < true",
        shouldBe: {
            elements: [
                {star: false, link: [
                    {word: "company"},
                    {word: "id"}
                ]},
                {
                    between: {elements: [
                        {number: "1"}
                    ]},
                    and: {elements: [
                        {number: "2"}
                    ]}
                },
                {operator: "<"},
                {boolean: true}
            ]
        }
    });

    testSyntax(Expression, {
        str: "company.id between 1 and 2 + 3 <= true",
        shouldBe: {
            elements: [
                {star: false, link: [
                    {word: "company"},
                    {word: "id"}
                ]},
                {
                    between: {elements: [
                        {number: "1"}
                    ]},
                    and: {elements: [
                        {number: "2"},
                        {operator: "+"},
                        {number: "3"}
                    ]}
                },
                {operator: "<="},
                {boolean: true}
            ]
        }
    });

    testSyntax(Expression, {
        str: "company.id not between 1 and 2 + 3",
        shouldBe: {
            elements: [
                {star: false, link: [
                    {word: "company"},
                    {word: "id"}
                ]},
                {operator: "not"},
                {
                    between: {elements: [
                        {number: "1"}
                    ]},
                    and: {elements: [
                        {number: "2"},
                        {operator: "+"},
                        {number: "3"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "test.id between 1 + 3 and 3 + 1 > test.id between ( 8 * test.id ) and 30 - 8",
        shouldBe: {
            elements: [
                {star: false, link: [
                    {word: "test"},
                    {word: "id"}
                ]},
                {
                    between: {elements: [
                        {number: "1"},
                        {operator: "+"},
                        {number: "3"}
                    ]},
                    and: {elements: [
                        {number: "3"},
                        {operator: "+"},
                        {number: "1"}
                    ]}
                },
    
                {operator: ">"},
    
                {star: false, link: [
                    {word: "test"},
                    {word: "id"}
                ]},
                {
                    between: {elements: [
                        {number: "8"},
                        {operator: "*"},
                        {star: false, link: [
                            {word: "test"},
                            {word: "id"}
                        ]}
                    ]},
                    and: {elements: [
                        {number: "30"},
                        {operator: "-"},
                        {number: "8"}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "company.name not like '%x%'",
        shouldBe: {
            elements: [
                {star: false, link: [
                    {word: "company"},
                    {word: "name"}
                ]},
                {operator: "not"},
                {operator: "like"},
                {content: "%x%"}
            ]
        }
    });

    testSyntax(Expression, {
        str: "now_utc() - interval '1 day'",
        shouldBe: {
            elements: [
                {
                    function: {
                        star: false,
                        link: [
                            {word: "now_utc"}
                        ]
                    },
                    arguments: []
                },
                {operator: "-"},
                {
                    interval: {
                        content: "1 day"
                    }
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "exists(select) and not exists(select)",
        shouldBe: {
            elements: [
                {
                    exists: {
                    }
                },
                {operator: "and"},
                {operator: "not"},
                {
                    exists: {
                    }
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "1 = any(select) or exists(select)",
        shouldBe: {
            elements: [
                {number: "1"},
                {operator: "="},
                {
                    type: "any",
                    select: {
                    }
                },
                {operator: "or"},
                {
                    exists: {
                    }
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "id in( 1, 2 ) or id = any( ARRAY[ 1, 2 ] )",
        shouldBe: {
            elements: [
                {star: false, link: [
                    {word: "id"}
                ]},
                {
                    inItems: [
                        {elements: [
                            {number: "1"}
                        ]},
                        {elements: [
                            {number: "2"}
                        ]}
                    ]
                },
                {operator: "or"},
                {star: false, link: [
                    {word: "id"}
                ]},
                {operator: "="},
                {
                    type: "any",
                    array: {elements: [
                        {array: [
                            {elements: [
                                {number: "1"}
                            ]},
                            {elements: [
                                {number: "2"}
                            ]}
                        ]}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "id not in( 1, 2 ) or id = any( ARRAY[ 1, 2 ] )",
        shouldBe: {
            elements: [
                {star: false, link: [
                    {word: "id"}
                ]},
                {operator: "not"},
                {
                    inItems: [
                        {elements: [
                            {number: "1"}
                        ]},
                        {elements: [
                            {number: "2"}
                        ]}
                    ]
                },
                {operator: "or"},
                {star: false, link: [
                    {word: "id"}
                ]},
                {operator: "="},
                {
                    type: "any",
                    array: {elements: [
                        {array: [
                            {elements: [
                                {number: "1"}
                            ]},
                            {elements: [
                                {number: "2"}
                            ]}
                        ]}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "'' not null",
        shouldBe: {
            elements: [
                {content: ""}
            ]
        }
    });

    testSyntax(Expression, {
        str: "0 not null",
        shouldBe: {
            elements: [
                {number: "0"}
            ]
        }
    });

    it("expression.toPrimitiveValue()", () => {
        const primitiveExpressions = [
            {expressionString: "1", primitiveValue: 1},
            {expressionString: "'1'", primitiveValue: "1"},
            {expressionString: "$_$$_$", primitiveValue: ""},
            {expressionString: "null", primitiveValue: null},
            {expressionString: "true", primitiveValue: true},
            {expressionString: "false", primitiveValue: false},
            {expressionString: "-4", primitiveValue: -4},
            {expressionString: "-4::integer", primitiveValue: -4},
            {expressionString: "-4::text", primitiveValue: "-4"},
            {expressionString: "'1'::numeric", primitiveValue: 1},
            {expressionString: "1::text", primitiveValue: "1"},
            {expressionString: "1::varchar(1)", primitiveValue: "1"}
        ];
        const otherExpressions = [
            "1+1",
            "-4*2+ x",
            "y",
            "1+(select from list_company)",
            "-4::date"
        ];

        primitiveExpressions.forEach((primitiveExpression, i) => {
            const coach = new GrapeQLCoach(primitiveExpression.expressionString);
            const expression = coach.parse(Expression);

            const actualValue = expression.toPrimitiveValue();
            const expectedValue = primitiveExpression.primitiveValue;

            assert.strictEqual(
                actualValue, 
                expectedValue,
                primitiveExpression.expressionString + 
                    ": toPrimitiveValue() should be " +
                    expectedValue
            );
        });

        otherExpressions.forEach((hardExpression) => {
            const coach = new GrapeQLCoach(hardExpression);
            const expression = coach.parse(Expression);

            assert.throws(
                () => {
                    expression.toPrimitiveValue();
                },
                (err: Error) =>
                    /cannot convert to primitive value/.test(err.message)
            );
        });
    });

    it("correctly return coach position in sql: 'false then'", () => {
        const coach = new GrapeQLCoach("false then");
        const expression = coach.parse(Expression);

        assert.deepEqual(expression.toJSON(), {
            brackets: null,
            elements: [
                {boolean: false}
            ]
        });

        // if position is correct, then we can parse next word
        coach.expectWord("then");
    });

    testSyntax(Expression, {
        str: "(country.id*2)",
        options: {
            availableStar: true
        },
        shouldBe: {
            brackets: true,
            elements: [
                {star: false, link: [
                    {word: "country"},
                    {word: "id"}
                ]},
                {operator: "*"},
                {number: "2"}
            ]
        }
    });
    
    testSyntax(Expression, {
        str: `extract( epoch from
                coalesce(
                    to_sea_port_arrival_point.actual_departure_date,
                    now_utc()
                ) - from_sea_port_arrival_point.actual_date
            )`,
        options: {
            availableStar: true
        },
        shouldBe: {
            elements: [
                {
                    extract: "epoch",
                    from: {elements: [
                        {
                            function: {link: [
                                {word: "coalesce"}
                            ]},
                            arguments: [
                                {elements: [
                                    {link: [
                                        {word: "to_sea_port_arrival_point"},
                                        {word: "actual_departure_date"}
                                    ]}
                                ]},
                                {elements: [
                                    {
                                        function: {link: [
                                            {word: "now_utc"}
                                        ]},
                                        arguments: []
                                    }
                                ]}
                            ]
                        },
                        {operator: "-"},
                        {link: [
                            {word: "from_sea_port_arrival_point"},
                            {word: "actual_date"}
                        ]}
                    ]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: "'' Collate \"POSIX\"",
        shouldBe: {
            elements: [
                {content: ""},
                {collate: {content: "POSIX"}}
            ]
        }
    });

    testSyntax(Expression, {
        str: "overlay('Txxxxas' placing 'hom' from 1)",
        shouldBe: {
            elements: [
                {str: {elements: [{
                    content: "Txxxxas"
                }]},
                placing: {elements: [{
                    content: "hom"
                }]},
                from: {elements: [{
                    number: "1"
                }]}}
            ]
        }
    });

    testSyntax(Expression, {
        str: "position('test' in 'test test')",
        shouldBe: {
            elements: [
                {
                    substring: {elements: [{
                        content: "test"
                    }]},
                    in: {elements: [{
                        content: "test test"
                    }]}
                }
            ]
        }
    });

    testSyntax(Expression, {
        str: `make_interval(weeks:=1)`,
        shouldBe: {
            elements: [
                {
                    intervalArgs: [
                        {type: "weeks", value: {elements: [
                            {number: "1"}
                        ]}}
                    ]
                }
            ]
        }
    });

});
