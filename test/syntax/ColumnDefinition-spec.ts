
import GrapeQLCoach from "../../lib/GrapeQLCoach";
import ColumnDefinition from "../../lib/syntax/ColumnDefinition";

import assert from "assert";

describe("ColumnDefinition", () => {

    GrapeQLCoach.test(ColumnDefinition, {
        str: "id serial",
        result: {
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
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "id serial primary key",
        result: {
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
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "id serial not null",
        result: {
            name: {
                word: "id",
                content: null
            },
            type: {
                type: "serial"
            },
            nulls: false,
            primaryKey: null,
            unique: null,
            foreignKey: null,
            check: null,
            default: null
        }
    });

    it("column with primary key, but toString should return string without 'not null'", () => {
        const coach = new GrapeQLCoach("id serial primary key");
        const column = coach.parse(ColumnDefinition);
        const str = column.toString();

        assert.equal(str, "id serial primary key");
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "profit numeric check(profit>0)",
        result: {
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
            check: {
                name: null,
                column: {
                    word: "profit",
                    content: null
                },
                check: {
                    elements: [
                        {star: false, link: [
                            {word: "profit", content: null}
                        ]},
                        {operator: ">"},
                        {number: "0"}
                    ]
                }
            },
            default: null
        }
    });


    GrapeQLCoach.test(ColumnDefinition, {
        str: "profit numeric not null check ( profit>0 )",
        result: {
            name: {
                word: "profit",
                content: null
            },
            type: {
                type: "numeric"
            },
            nulls: false,
            primaryKey: null,
            unique: null,
            foreignKey: null,
            check: {
                name: null,
                column: {
                    word: "profit",
                    content: null
                },
                check: {
                    elements: [
                        {star: false, link: [
                            {word: "profit", content: null}
                        ]},
                        {operator: ">"},
                        {number: "0"}
                    ]
                }
            },
            default: null
        }
    });


    GrapeQLCoach.test(ColumnDefinition, {
        str: "profit numeric check ( profit>0 ) not null",
        result: {
            name: {
                word: "profit",
                content: null
            },
            type: {
                type: "numeric"
            },
            nulls: false,
            primaryKey: null,
            unique: null,
            foreignKey: null,
            check: {
                name: null,
                column: {
                    word: "profit",
                    content: null
                },
                check: {
                    elements: [
                        {star: false, link: [
                            {word: "profit", content: null}
                        ]},
                        {operator: ">"},
                        {number: "0"}
                    ]
                }
            },
            default: null
        }
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "profit numeric not null not null",
        error: /duplicate not null/
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "profit numeric primary key primary key",
        error: /duplicate primary key/
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "profit numeric check(true) check(true)",
        error: /duplicate check/
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "profit numeric primary key not null",
        error: /column already defined as not null by primary key/
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "profit numeric not null primary key",
        error: /column already defined as not null by primary key/
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "profit numeric unique unique",
        error: /duplicate unique/
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "id_company integer references company references company",
        error: /duplicate foreign key/
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "name text unique",
        result: {
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
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "name text unique not null",
        result: {
            name: {
                word: "name",
                content: null
            },
            type: {
                type: "text"
            },
            nulls: false,
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
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "name text not null unique",
        result: {
            name: {
                word: "name",
                content: null
            },
            type: {
                type: "text"
            },
            nulls: false,
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
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "id_company integer references company",
        result: {
            name: {
                word: "id_company",
                content: null
            },
            type: {
                type: "integer"
            },
            nulls: true,
            primaryKey: null,
            unique: null,
            foreignKey: {
                name: null,
                column: {
                    word: "id_company",
                    content: null
                },
                columns: [{
                    word: "id_company", 
                    content: null
                }],
                referenceTable: {star: false, link: [
                    {word: "company", content: null}
                ]},
                referenceColumns: null,
                match: null,
                onDelete: null,
                onUpdate: null
            },
            check: null,
            default: null
        }
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "id_company integer references company (id)",
        result: {
            name: {
                word: "id_company",
                content: null
            },
            type: {
                type: "integer"
            },
            nulls: true,
            primaryKey: null,
            unique: null,
            foreignKey: {
                name: null,
                column: {
                    word: "id_company",
                    content: null
                },
                columns: [{
                    word: "id_company", 
                    content: null
                }],
                referenceTable: {star: false, link: [
                    {word: "company", content: null}
                ]},
                referenceColumns: [{
                    word: "id",
                    content: null
                }],
                match: null,
                onDelete: null,
                onUpdate: null
            },
            check: null,
            default: null
        }
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "profit numeric default 0",
        result: {
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
            default: {
                elements: [
                    {number: "0"}
                ]
            }
        }
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "profit numeric default 0 not null",
        result: {
            name: {
                word: "profit",
                content: null
            },
            type: {
                type: "numeric"
            },
            nulls: false,
            primaryKey: null,
            unique: null,
            foreignKey: null,
            check: null,
            default: {
                elements: [
                    {number: "0"}
                ]
            }
        }
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "profit numeric not null default 0",
        result: {
            name: {
                word: "profit",
                content: null
            },
            type: {
                type: "numeric"
            },
            nulls: false,
            primaryKey: null,
            unique: null,
            foreignKey: null,
            check: null,
            default: {
                elements: [
                    {number: "0"}
                ]
            }
        }
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "profit numeric not null default 0 unique",
        result: {
            name: {
                word: "profit",
                content: null
            },
            type: {
                type: "numeric"
            },
            nulls: false,
            primaryKey: null,
            unique: {
                name: null,
                column: {
                    word: "profit",
                    content: null
                },
                unique: [{
                    word: "profit",
                    content: null
                }]
            },
            foreignKey: null,
            check: null,
            default: {
                elements: [
                    {number: "0"}
                ]
            }
        }
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "id_order_type integer not null default 1 unique references order_type check (id_order_type in (1,2,3))",
        result: {
            name: {
                word: "id_order_type",
                content: null
            },
            type: {
                type: "integer"
            },
            nulls: false,
            primaryKey: null,
            unique: {
                name: null,
                column: {
                    word: "id_order_type",
                    content: null
                },
                unique: [{
                    word: "id_order_type",
                    content: null
                }]
            },
            foreignKey: {
                name: null,
                column: {
                    word: "id_order_type",
                    content: null
                },
                columns: [{
                    word: "id_order_type", 
                    content: null
                }],
                referenceTable: {star: false, link: [
                    {word: "order_type", content: null}
                ]},
                referenceColumns: null,
                match: null,
                onDelete: null,
                onUpdate: null
            },
            check: {
                name: null,
                column: {
                    word: "id_order_type",
                    content: null
                },
                check: {
                    elements: [
                        {star: false, link: [
                            {word: "id_order_type", content: null}
                        ]},
                        {
                            inSelect: null,
                            inItems: [
                                {elements: [
                                    {number: "1"}
                                ]},
                                {elements: [
                                    {number: "2"}
                                ]},
                                {elements: [
                                    {number: "3"}
                                ]}
                            ]
                        }
                    ]
                }
            },
            default: {
                elements: [
                    {number: "1"}
                ]
            }
        }
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "id serial primary key unique",
        error: /column already defined as unique by primary key/
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "id serial unique primary key",
        error: /column already defined as unique by primary key/
    });

    GrapeQLCoach.test(ColumnDefinition, {
        str: "id serial default 1 default 1",
        error: /duplicate default/
    });

});
