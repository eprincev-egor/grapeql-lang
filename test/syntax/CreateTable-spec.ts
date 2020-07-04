
import { GrapeQLCoach } from "../../lib/GrapeQLCoach";
import {testSyntax} from "../testSyntax";
import assert from "assert";
import {CreateTable} from "../../lib/syntax/CreateTable";

describe("CreateTable", () => {

    testSyntax(CreateTable, {
        str: `create table company (
            id serial primary key
        )`,
        shouldBe: {
            name: {
                word: "company"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        column: {
                            word: "id"
                        },
                        primaryKey: [{
                            word: "id"
                        }]
                    }
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: false,
            deprecatedColumns: [],
            valuesRows: [],
            values: []
        }
    });
    
    testSyntax(CreateTable, {
        str: `create table company (
            id serial primary key,
            id serial
        )`,
        error: /duplicate column name: id/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial,
            constraint company_pk primary key (id)
        )`,
        shouldBe: {
            name: {
                word: "company"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: true
                }
            ],
            constraints: [
                {
                    name: {
                        word: "company_pk"
                    },
                    primaryKey: [{
                        word: "id"
                    }]
                }
            ],
            inherits: [],
            deprecated: false,
            deprecatedColumns: [],
            valuesRows: [],
            values: []
        }
    });

    
    testSyntax(CreateTable, {
        str: `create table company (
            id serial,
            constraint company_pk primary key (id),
            constraint company_pk unique (id)
        )`,
        error: /duplicate constraint name: company_pk/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial primary key,
            constraint company_pk primary key (id)
        )`,
        error: /duplicate primary key/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial primary key,
            name text primary key
        )`,
        error: /duplicate primary key/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial,
            constraint company_pk1 primary key (id),
            constraint company_pk2 primary key (id)
        )`,
        error: /duplicate primary key/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial primary key
        )
        inherits (parent_a, public.parent_b)`,
        shouldBe: {
            name: {
                word: "company"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        column: {
                            word: "id"
                        },
                        primaryKey: [{
                            word: "id"
                        }]
                    }
                }
            ],
            constraints: [],
            inherits: [
                {star: false, link: [
                    {word: "parent_a"}
                ]},
                {star: false, link: [
                    {word: "public"},
                    {word: "parent_b"}
                ]}
            ],
            deprecated: false,
            deprecatedColumns: [],
            values: [],
            valuesRows: []
        }
    });
    
    testSyntax(CreateTable, {
        str: `create table company (
            id serial primary key,
            name1 text,
            name2 text
        )
        deprecated (
            name3
        )`,
        shouldBe: {
            name: {
                word: "company"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        column: {
                            word: "id"
                        },
                        primaryKey: [{
                            word: "id"
                        }]
                    }
                },
                {
                    name: {
                        word: "name1"
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true
                },
                {
                    name: {
                        word: "name2"
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: false,
            deprecatedColumns: [
                {word: "name3"}
            ],
            valuesRows: [],
            values: []
        }
    });
    
    testSyntax(CreateTable, {
        str: `create table company (
            id serial primary key
        )
        inherits (system_fields)
        deprecated (
            name
        )`,
        shouldBe: {
            name: {
                word: "company"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        column: {
                            word: "id"
                        },
                        primaryKey: [{
                            word: "id"
                        }]
                    }
                }
            ],
            constraints: [],
            inherits: [
                {star: false, link: [
                    {word: "system_fields"}
                ]}
            ],
            deprecated: false,
            deprecatedColumns: [
                {word: "name"}
            ],
            valuesRows: [],
            values: []
        }
    });

    testSyntax(CreateTable, {
        str: `create table order_type (
            id serial primary key,
            name text unique,
            note text
        ) values (
            (1, 'FCL'),
            (default, 'FTL'),
            (3, 'LTL')
        )`,
        shouldBe: {
            name: {
                word: "order_type"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        column: {
                            word: "id"
                        },
                        primaryKey: [{
                            word: "id"
                        }]
                    }
                },
                {
                    name: {
                        word: "name"
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    unique: {
                        column: {
                            word: "name"
                        },
                        unique: [{
                            word: "name"
                        }]
                    }
                },
                {
                    name: {
                        word: "note"
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: false,
            deprecatedColumns: [],
            values: [
                {id: 1, name: "FCL"},
                {id: 2, name: "FTL"},
                {id: 3, name: "LTL"}
            ],
            valuesRows: [
                {values: [
                    {value: {elements: [
                        {number: "1"}
                    ]}},

                    {value: {elements: [
                        {content: "FCL"}
                    ]}}
                ]},
                {values: [
                    { default: true},

                    {value: {elements: [
                        {content: "FTL"}
                    ]}}
                ]},
                {values: [
                    {value: {elements: [
                        {number: "3"}
                    ]}},

                    {value: {elements: [
                        {content: "LTL"}
                    ]}}
                ]}
            ]
        }
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial
        ) values (
        )`,
        error: /expected: ValuesRow/
    });
    
    testSyntax(CreateTable, {
        str: `create table company (
            id serial
        ) values (
            (1, 2)
        )`,
        error: /values has more expressions that table columns/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial,
            name text
        ) values (
            (1, ''),
            (2)
        )`,
        error: /VALUES lists must all be the same length/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial,
            name text
        ) values (
            (1, greatest(1, 2))
        )`,
        error: /values for column name should be text/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial,
            name text
        ) values (
            ('text')
        )`,
        error: /values for column id should be number/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial
        ) values (
            (1.1)
        )`,
        error: /values for column id should be not float number/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial,
            name text
        ) values (
            (1, 33)
        )`,
        error: /values for column name should be text/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial,
            is_ok boolean
        ) values (
            (1, '')
        )`,
        error: /values for column is_ok should be boolean/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial
        ) values (
            (1::text)
        )`,
        error: /values for column id should be number/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id double precision
        ) values (
            (1::text)
        )`,
        error: /values for column id should be number/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            name varchar(10)
        ) values (
            (1::integer)
        )`,
        error: /values for column name should be text/
    });


    testSyntax(CreateTable, {
        str: `create table order_type (
            id serial
        ) values (
            (1)
        )`,
        shouldBe: {
            name: {
                word: "order_type"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: true
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: false,
            deprecatedColumns: [],
            values: [
                {id: 1}
            ],
            valuesRows: [
                {values: [
                    {value: {elements: [
                        {number: "1"}
                    ]}}
                ]}
            ]
        }
    });

    testSyntax(CreateTable, {
        str: `create table order_type (
            id serial
        ) values (
            (1::integer)
        )`,
        shouldBe: {
            name: {
                word: "order_type"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: true
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: false,
            deprecatedColumns: [],
            values: [
                {id: 1}
            ],
            valuesRows: [
                {values: [
                    {value: {elements: [
                        {number: "1"},
                        {operator: "::"},
                        {type: "integer"}
                    ]}}
                ]}
            ]
        }
    });

    testSyntax(CreateTable, {
        str: `create table order_type (
            id serial
        ) values (
            ('1'::integer)
        )`,
        shouldBe: {
            name: {
                word: "order_type"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: true
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: false,
            deprecatedColumns: [],
            values: [
                {id: 1}
            ],
            valuesRows: [
                {values: [
                    {value: {elements: [
                        {content: "1"},
                        {operator: "::"},
                        {type: "integer"}
                    ]}}
                ]}
            ]
        }
    });


    testSyntax(CreateTable, {
        str: `create table company (
            id serial primary key,
            name text not null
        ) values (
            (default)
        )`,
        error: /need value for not null column: name/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial primary key
        ) values (
            (null)
        )`,
        error: /need value for not null column: id/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id integer primary key
        ) values (
            (default)
        )`,
        error: /need value for not null column: id/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial primary key,
            name text not null
        ) values (
            (1, default),
            (default, default)
        )`,
        error: /need value for not null column: name/
    });

    testSyntax(CreateTable, {
        str: `create table order_type (
            id serial primary key,
            name text unique
        ) values (
            (1, null),
            (2, null)
        )`,
        shouldBe: {
            name: {
                word: "order_type"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        column: {
                            word: "id"
                        },
                        primaryKey: [{
                            word: "id"
                        }]
                    }
                },
                {
                    name: {
                        word: "name"
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    unique: {
                        column: {
                            word: "name"
                        },
                        unique: [{
                            word: "name"
                        }]
                    }
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: false,
            deprecatedColumns: [],
            values: [
                {id: 1},
                {id: 2}
            ],
            valuesRows: [
                {values: [
                    {value: {elements: [
                        {number: "1"}
                    ]}},

                    {value: {elements: [
                        {null: true}
                    ]}}
                ]},
                {values: [
                    {value: {elements: [
                        {number: "2"}
                    ]}},

                    {value: {elements: [
                        {null: true}
                    ]}}
                ]}
            ]
        }
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial primary key
        ) values (
            (1),
            (1)
        )`,
        error: /unique columns \(id\) cannot contain duplicate values: 1/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            name text unique
        ) values (
            (''),
            ($_$$_$)
        )`,
        error: /unique columns \(name\) cannot contain duplicate values/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            name text unique
        ) values (
            ('a'),
            ('b'),
            ('a')
        )`,
        error: /unique columns \(name\) cannot contain duplicate values: a/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            name text unique default 'a'
        ) values (
            (default),
            (default)
        )`,
        error: /unique columns \(name\) cannot contain duplicate values: a/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id_order_a bigint,
            id_order_b bigint,
            constraint uniq_orders unique (id_order_a,id_order_b)
        ) values (
            (1, 2),
            (2, 1),
            (1, 2)
        )`,
        error: /unique columns \(id_order_a,id_order_b\) cannot contain duplicate values: 1,2/
    });

    testSyntax(CreateTable, {
        str: `create table order_type (
            id serial primary key,
            name text unique
        ) values (
            (default),
            (default)
        )`,
        shouldBe: {
            name: {
                word: "order_type"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        column: {
                            word: "id"
                        },
                        primaryKey: [{
                            word: "id"
                        }]
                    }
                },
                {
                    name: {
                        word: "name"
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    unique: {
                        column: {
                            word: "name"
                        },
                        unique: [{
                            word: "name"
                        }]
                    }
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: false,
            deprecatedColumns: [],
            values: [
                {id: 1},
                {id: 2}
            ],
            valuesRows: [
                {values: [
                    { default: true}
                ]},
                {values: [
                    { default: true}
                ]}
            ]
        }
    });

    testSyntax(CreateTable, {
        str: `create table order_type (
            id serial primary key,
            name text unique
        ) values (
            (default, default),
            (default, default)
        )`,
        shouldBe: {
            name: {
                word: "order_type"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        column: {
                            word: "id"
                        },
                        primaryKey: [{
                            word: "id"
                        }]
                    }
                },
                {
                    name: {
                        word: "name"
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    unique: {
                        column: {
                            word: "name"
                        },
                        unique: [{
                            word: "name"
                        }]
                    }
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: false,
            deprecatedColumns: [],
            values: [
                {id: 1},
                {id: 2}
            ],
            valuesRows: [
                {values: [
                    { default: true},
                    { default: true}
                ]},
                {values: [
                    { default: true},
                    { default: true}
                ]}
            ]
        }
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id_order_a serial,
            id_order_b serial,
            name text unique,
            constraint uniq_orders unique (id_order_a,id_order_b)
        ) values (
            (default, default, 'Test'),
            (default, default, $$Test$$)
        )`,
        error: /unique columns \(name\) cannot contain duplicate values/
    });


    testSyntax(CreateTable, {
        str: `create table company (
            id serial unique
        ) values (
            (default),
            (default),
            (2)
        )`,
        error: /unique columns \(id\) cannot contain duplicate values: 2/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            name text default 'test' unique
        ) values (
            (default),
            (default)
        )`,
        error: /unique columns \(name\) cannot contain duplicate values: test/
    });

    testSyntax(CreateTable, {
        str: `create table company (
            id serial primary key,
            name text default 'test' unique
        ) values (
            (default, default),
            (default, default)
        )`,
        error: /unique columns \(name\) cannot contain duplicate values: test/
    });

    
    testSyntax(CreateTable, {
        str: `create table order_type (
            id serial primary key,
            dt_create date unique default now()
        ) values (
            (default, default),
            (default, default)
        )`,
        error: /values for column dt_create should be date/
    });

    testSyntax(CreateTable, {
        str: `create table order_type (
            id serial primary key,
            profit numeric
        ) values (
            (default, -1::numeric),
            (default, -2::integer)
        )`,
        shouldBe: {
            name: {
                word: "order_type"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        column: {
                            word: "id"
                        },
                        primaryKey: [{
                            word: "id"
                        }]
                    }
                },
                {
                    name: {
                        word: "profit"
                    },
                    type: {
                        type: "numeric"
                    },
                    nulls: true
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: false,
            deprecatedColumns: [],
            values: [
                {id: 1, profit: -1},
                {id: 2, profit: -2}
            ],
            valuesRows: [
                {values: [
                    { default: true},
                    {value: {elements: [
                        {operator: "-"},
                        {number: "1"},
                        {operator: "::"},
                        {type: "numeric"}
                    ]}}
                ]},
                {values: [
                    { default: true},
                    {value: {elements: [
                        {operator: "-"},
                        {number: "2"},
                        {operator: "::"},
                        {type: "integer"}
                    ]}}
                ]}
            ]
        }
    });

    testSyntax(CreateTable, {
        str: `deprecated table company (
            id serial primary key
        )`,
        shouldBe: {
            deprecated: true,
            name: {
                word: "company"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        column: {
                            word: "id"
                        },
                        primaryKey: [{
                            word: "id"
                        }]
                    }
                }
            ],
            constraints: [],
            inherits: [],
            deprecatedColumns: [],
            valuesRows: [],
            values: []
        }
    });

    testSyntax(CreateTable, {
        str: `create table operation.unit (
            id serial primary key
        )`,
        shouldBe: {
            schema: {
                word: "operation"
            },
            name: {
                word: "unit"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        column: {
                            word: "id"
                        },
                        primaryKey: [{
                            word: "id"
                        }]
                    }
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: false,
            deprecatedColumns: [],
            valuesRows: [],
            values: []
        }
    });
        
    testSyntax(CreateTable, {
        str: `create/*ignore me*/table/* multi line comment */ operation.unit (
            -- inline comment
            id /* multi line comment */ serial primary key
        )`,
        shouldBe: {
            schema: {
                word: "operation"
            },
            name: {
                word: "unit"
            },
            columns: [
                {
                    name: {
                        word: "id"
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        column: {
                            word: "id"
                        },
                        primaryKey: [{
                            word: "id"
                        }]
                    }
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: false,
            deprecatedColumns: [],
            valuesRows: [],
            values: []
        }
    });
    
    
    it("CreateTable.is('deprecated extension')", () => {
        const coach = new GrapeQLCoach("deprecated extension");

        const actual = coach.is(CreateTable);
        assert.strictEqual(actual, false);
    });
});
