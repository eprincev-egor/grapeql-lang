
import CreateTable from "../../lib/syntax/CreateTable";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("CreateTable", () => {

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial primary key
        )`,
        result: {
            name: {
                word: "company",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "id",
                        content: null
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        name: null,
                        column: {
                            word: "id",
                            content: null
                        },
                        primaryKey: [{
                            word: "id",
                            content: null
                        }]
                    },
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: [],
            valuesRows: [],
            values: []
        }
    });
    
    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial primary key,
            id serial
        )`,
        error: /duplicate column name: id/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial,
            constraint company_pk primary key (id)
        )`,
        result: {
            name: {
                word: "company",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "id",
                        content: null
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                }
            ],
            constraints: [
                {
                    name: {
                        word: "company_pk",
                        content: null
                    },
                    column: null,
                    primaryKey: [{
                        word: "id",
                        content: null
                    }]
                }
            ],
            inherits: [],
            deprecated: [],
            valuesRows: [],
            values: []
        }
    });

    
    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial,
            constraint company_pk primary key (id),
            constraint company_pk unique (id)
        )`,
        error: /duplicate constraint name: company_pk/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial primary key,
            constraint company_pk primary key (id)
        )`,
        error: /duplicate primary key/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial primary key,
            name text primary key
        )`,
        error: /duplicate primary key/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial,
            constraint company_pk1 primary key (id),
            constraint company_pk2 primary key (id)
        )`,
        error: /duplicate primary key/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial primary key
        )
        inherits (parent_a, public.parent_b)`,
        result: {
            name: {
                word: "company",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "id",
                        content: null
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        name: null,
                        column: {
                            word: "id",
                            content: null
                        },
                        primaryKey: [{
                            word: "id",
                            content: null
                        }]
                    },
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                }
            ],
            constraints: [],
            inherits: [
                {star: false, link: [
                    {word: "parent_a", content: null}
                ]},
                {star: false, link: [
                    {word: "public", content: null},
                    {word: "parent_b", content: null}
                ]}
            ],
            deprecated: [],
            values: [],
            valuesRows: []
        }
    });
    
    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial primary key,
            name1 text,
            name2 text
        )
        deprecated (
            name3
        )`,
        result: {
            name: {
                word: "company",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "id",
                        content: null
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        name: null,
                        column: {
                            word: "id",
                            content: null
                        },
                        primaryKey: [{
                            word: "id",
                            content: null
                        }]
                    },
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                },
                {
                    name: {
                        word: "name1",
                        content: null
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                },
                {
                    name: {
                        word: "name2",
                        content: null
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: [
                {word: "name3", content: null}
            ],
            valuesRows: [],
            values: []
        }
    });
    
    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial primary key
        )
        inherits (system_fields)
        deprecated (
            name
        )`,
        result: {
            name: {
                word: "company",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "id",
                        content: null
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        name: null,
                        column: {
                            word: "id",
                            content: null
                        },
                        primaryKey: [{
                            word: "id",
                            content: null
                        }]
                    },
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                }
            ],
            constraints: [],
            inherits: [
                {star: false, link: [
                    {word: "system_fields", content: null}
                ]}
            ],
            deprecated: [
                {word: "name", content: null}
            ],
            valuesRows: [],
            values: []
        }
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table order_type (
            id serial primary key,
            name text unique,
            note text
        ) values (
            (1, 'FCL'),
            (default, 'FTL'),
            (3, 'LTL')
        )`,
        result: {
            name: {
                word: "order_type",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "id",
                        content: null
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        name: null,
                        column: {
                            word: "id",
                            content: null
                        },
                        primaryKey: [{
                            word: "id",
                            content: null
                        }]
                    },
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                },
                {
                    name: {
                        word: "name",
                        content: null
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: {
                        name: null,
                        column: {
                            word: "name",
                            content: null
                        },
                        unique: [{
                            word: "name",
                            content: null
                        }]
                    },
                    foreignKey: null,
                    check: null,
                    default: null
                },
                {
                    name: {
                        word: "note",
                        content: null
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: [],
            values: [
                {id: 1, name: "FCL", note: null},
                {id: 2, name: "FTL", note: null},
                {id: 3, name: "LTL", note: null}
            ],
            valuesRows: [
                {values: [
                    {value: {elements: [
                        {number: "1"}
                    ]}, default: null},

                    {value: {elements: [
                        {content: "FCL"}
                    ]}, default: null}
                ]},
                {values: [
                    {value: null, default: true},

                    {value: {elements: [
                        {content: "FTL"}
                    ]}, default: null}
                ]},
                {values: [
                    {value: {elements: [
                        {number: "3"}
                    ]}, default: null},

                    {value: {elements: [
                        {content: "LTL"}
                    ]}, default: null}
                ]}
            ]
        }
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial
        ) values (
        )`,
        error: /expected: ValuesRow/
    });
    
    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial
        ) values (
            (1, 2)
        )`,
        error: /values has more expressions that table columns/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial,
            name text
        ) values (
            (1, ''),
            (2)
        )`,
        error: /VALUES lists must all be the same length/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial,
            name text
        ) values (
            (1, greatest(1, 2))
        )`,
        error: /values for column name should be text/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial,
            name text
        ) values (
            ('text')
        )`,
        error: /values for column id should be number/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial
        ) values (
            (1.1)
        )`,
        error: /values for column id should be not float number/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial,
            name text
        ) values (
            (1, 33)
        )`,
        error: /values for column name should be text/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial,
            is_ok boolean
        ) values (
            (1, '')
        )`,
        error: /values for column is_ok should be boolean/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial
        ) values (
            (1::text)
        )`,
        error: /values for column id should be number/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id double precision
        ) values (
            (1::text)
        )`,
        error: /values for column id should be number/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            name varchar(10)
        ) values (
            (1::integer)
        )`,
        error: /values for column name should be text/
    });


    GrapeQLCoach.test(CreateTable, {
        str: `create table order_type (
            id serial
        ) values (
            (1)
        )`,
        result: {
            name: {
                word: "order_type",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "id",
                        content: null
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: [],
            values: [
                {id: 1}
            ],
            valuesRows: [
                {values: [
                    {value: {elements: [
                        {number: "1"}
                    ]}, default: null}
                ]}
            ]
        }
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table order_type (
            id serial
        ) values (
            (1::integer)
        )`,
        result: {
            name: {
                word: "order_type",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "id",
                        content: null
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: [],
            values: [
                {id: 1}
            ],
            valuesRows: [
                {values: [
                    {value: {elements: [
                        {number: "1"},
                        {operator: "::"},
                        {type: "integer"}
                    ]}, default: null}
                ]}
            ]
        }
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table order_type (
            id serial
        ) values (
            ('1'::integer)
        )`,
        result: {
            name: {
                word: "order_type",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "id",
                        content: null
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: [],
            values: [
                {id: 1}
            ],
            valuesRows: [
                {values: [
                    {value: {elements: [
                        {content: "1"},
                        {operator: "::"},
                        {type: "integer"}
                    ]}, default: null}
                ]}
            ]
        }
    });


    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial primary key,
            name text not null
        ) values (
            (default)
        )`,
        error: /need value for not null column: name/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial primary key
        ) values (
            (null)
        )`,
        error: /need value for not null column: id/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id integer primary key
        ) values (
            (default)
        )`,
        error: /need value for not null column: id/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial primary key,
            name text not null
        ) values (
            (1, default),
            (default, default)
        )`,
        error: /need value for not null column: name/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table order_type (
            id serial primary key,
            name text unique
        ) values (
            (1, null),
            (2, null)
        )`,
        result: {
            name: {
                word: "order_type",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "id",
                        content: null
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        name: null,
                        column: {
                            word: "id",
                            content: null
                        },
                        primaryKey: [{
                            word: "id",
                            content: null
                        }]
                    },
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                },
                {
                    name: {
                        word: "name",
                        content: null
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: {
                        name: null,
                        column: {
                            word: "name",
                            content: null
                        },
                        unique: [{
                            word: "name",
                            content: null
                        }]
                    },
                    foreignKey: null,
                    check: null,
                    default: null
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: [],
            values: [
                {id: 1, name: null},
                {id: 2, name: null}
            ],
            valuesRows: [
                {values: [
                    {value: {elements: [
                        {number: "1"}
                    ]}, default: null},

                    {value: {elements: [
                        {null: true}
                    ]}, default: null}
                ]},
                {values: [
                    {value: {elements: [
                        {number: "2"}
                    ]}, default: null},

                    {value: {elements: [
                        {null: true}
                    ]}, default: null}
                ]}
            ]
        }
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial primary key
        ) values (
            (1),
            (1)
        )`,
        error: /unique columns \(id\) cannot contain duplicate values: 1/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            name text unique
        ) values (
            (''),
            ($_$$_$)
        )`,
        error: /unique columns \(name\) cannot contain duplicate values/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            name text unique
        ) values (
            ('a'),
            ('b'),
            ('a')
        )`,
        error: /unique columns \(name\) cannot contain duplicate values: a/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            name text unique default 'a'
        ) values (
            (default),
            (default)
        )`,
        error: /unique columns \(name\) cannot contain duplicate values: a/
    });

    GrapeQLCoach.test(CreateTable, {
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

    GrapeQLCoach.test(CreateTable, {
        str: `create table order_type (
            id serial primary key,
            name text unique
        ) values (
            (default),
            (default)
        )`,
        result: {
            name: {
                word: "order_type",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "id",
                        content: null
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        name: null,
                        column: {
                            word: "id",
                            content: null
                        },
                        primaryKey: [{
                            word: "id",
                            content: null
                        }]
                    },
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                },
                {
                    name: {
                        word: "name",
                        content: null
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: {
                        name: null,
                        column: {
                            word: "name",
                            content: null
                        },
                        unique: [{
                            word: "name",
                            content: null
                        }]
                    },
                    foreignKey: null,
                    check: null,
                    default: null
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: [],
            values: [
                {id: 1, name: null},
                {id: 2, name: null}
            ],
            valuesRows: [
                {values: [
                    {value: null, default: true}
                ]},
                {values: [
                    {value: null, default: true}
                ]}
            ]
        }
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table order_type (
            id serial primary key,
            name text unique
        ) values (
            (default, default),
            (default, default)
        )`,
        result: {
            name: {
                word: "order_type",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "id",
                        content: null
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        name: null,
                        column: {
                            word: "id",
                            content: null
                        },
                        primaryKey: [{
                            word: "id",
                            content: null
                        }]
                    },
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                },
                {
                    name: {
                        word: "name",
                        content: null
                    },
                    type: {
                        type: "text"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: {
                        name: null,
                        column: {
                            word: "name",
                            content: null
                        },
                        unique: [{
                            word: "name",
                            content: null
                        }]
                    },
                    foreignKey: null,
                    check: null,
                    default: null
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: [],
            values: [
                {id: 1, name: null},
                {id: 2, name: null}
            ],
            valuesRows: [
                {values: [
                    {value: null, default: true},
                    {value: null, default: true}
                ]},
                {values: [
                    {value: null, default: true},
                    {value: null, default: true}
                ]}
            ]
        }
    });

    GrapeQLCoach.test(CreateTable, {
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


    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial unique
        ) values (
            (default),
            (default),
            (2)
        )`,
        error: /unique columns \(id\) cannot contain duplicate values: 2/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            name text default 'test' unique
        ) values (
            (default),
            (default)
        )`,
        error: /unique columns \(name\) cannot contain duplicate values: test/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table company (
            id serial primary key,
            name text default 'test' unique
        ) values (
            (default, default),
            (default, default)
        )`,
        error: /unique columns \(name\) cannot contain duplicate values: test/
    });

    
    GrapeQLCoach.test(CreateTable, {
        str: `create table order_type (
            id serial primary key,
            dt_create date unique default now()
        ) values (
            (default, default),
            (default, default)
        )`,
        error: /values for column dt_create should be date/
    });

    GrapeQLCoach.test(CreateTable, {
        str: `create table order_type (
            id serial primary key,
            profit numeric
        ) values (
            (default, -1::numeric),
            (default, -2::integer)
        )`,
        result: {
            name: {
                word: "order_type",
                content: null
            },
            columns: [
                {
                    name: {
                        word: "id",
                        content: null
                    },
                    type: {
                        type: "serial"
                    },
                    nulls: false,
                    primaryKey: {
                        name: null,
                        column: {
                            word: "id",
                            content: null
                        },
                        primaryKey: [{
                            word: "id",
                            content: null
                        }]
                    },
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                },
                {
                    name: {
                        word: "profit",
                        content: null
                    },
                    type: {
                        type: "numeric"
                    },
                    nulls: true,
                    primaryKey: null,
                    unique: null,
                    foreignKey: null,
                    check: null,
                    default: null
                }
            ],
            constraints: [],
            inherits: [],
            deprecated: [],
            values: [
                {id: 1, profit: -1},
                {id: 2, profit: -2}
            ],
            valuesRows: [
                {values: [
                    {value: null, default: true},
                    {value: {elements: [
                        {operator: "-"},
                        {number: "1"},
                        {operator: "::"},
                        {type: "numeric"}
                    ]}, default: null}
                ]},
                {values: [
                    {value: null, default: true},
                    {value: {elements: [
                        {operator: "-"},
                        {number: "2"},
                        {operator: "::"},
                        {type: "integer"}
                    ]}, default: null}
                ]}
            ]
        }
    });

});