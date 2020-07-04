
import {GrapeQLCoach} from "../../lib/GrapeQLCoach";
import {testSyntax} from "../testSyntax";
import assert from "assert";
import {ColumnDefinition} from "../../lib/syntax/ColumnDefinition";

describe("ColumnDefinition", () => {

    testSyntax(ColumnDefinition, {
        str: "id serial",
        shouldBe: {
            name: {
                word: "id"
            },
            type: {
                type: "serial"
            },
            nulls: true
        }
    });

    testSyntax(ColumnDefinition, {
        str: "id serial primary key",
        shouldBe: {
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
    });

    testSyntax(ColumnDefinition, {
        str: "id serial not null",
        shouldBe: {
            name: {
                word: "id"
            },
            type: {
                type: "serial"
            },
            nulls: false
        }
    });

    it("column with primary key, but toString should return string without 'not null'", () => {
        const coach = new GrapeQLCoach("id serial primary key");
        const column = coach.parse(ColumnDefinition);
        const str = column.toString();

        assert.equal(str, "id serial primary key");
    });

    testSyntax(ColumnDefinition, {
        str: "profit numeric check(profit>0)",
        shouldBe: {
            name: {
                word: "profit"
            },
            type: {
                type: "numeric"
            },
            nulls: true,
            check: {
                column: {
                    word: "profit"
                },
                check: {
                    elements: [
                        {star: false, link: [
                            {word: "profit"}
                        ]},
                        {operator: ">"},
                        {number: "0"}
                    ]
                }
            }
        }
    });


    testSyntax(ColumnDefinition, {
        str: "profit numeric not null check ( profit>0 )",
        shouldBe: {
            name: {
                word: "profit"
            },
            type: {
                type: "numeric"
            },
            nulls: false,
            check: {
                column: {
                    word: "profit"
                },
                check: {
                    elements: [
                        {star: false, link: [
                            {word: "profit"}
                        ]},
                        {operator: ">"},
                        {number: "0"}
                    ]
                }
            }
        }
    });


    testSyntax(ColumnDefinition, {
        str: "profit numeric check ( profit>0 ) not null",
        shouldBe: {
            name: {
                word: "profit"
            },
            type: {
                type: "numeric"
            },
            nulls: false,
            check: {
                column: {
                    word: "profit"
                },
                check: {
                    elements: [
                        {star: false, link: [
                            {word: "profit"}
                        ]},
                        {operator: ">"},
                        {number: "0"}
                    ]
                }
            }
        }
    });

    testSyntax(ColumnDefinition, {
        str: "profit numeric not null not null",
        error: /duplicate not null/
    });

    testSyntax(ColumnDefinition, {
        str: "profit numeric primary key primary key",
        error: /duplicate primary key/
    });

    testSyntax(ColumnDefinition, {
        str: "profit numeric check(true) check(true)",
        error: /duplicate check/
    });

    testSyntax(ColumnDefinition, {
        str: "profit numeric primary key not null",
        error: /column already defined as not null by primary key/
    });

    testSyntax(ColumnDefinition, {
        str: "profit numeric not null primary key",
        error: /column already defined as not null by primary key/
    });

    testSyntax(ColumnDefinition, {
        str: "profit numeric unique unique",
        error: /duplicate unique/
    });

    testSyntax(ColumnDefinition, {
        str: "id_company integer references company references company",
        error: /duplicate foreign key/
    });

    testSyntax(ColumnDefinition, {
        str: "name text unique",
        shouldBe: {
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
    });

    testSyntax(ColumnDefinition, {
        str: "name text unique not null",
        shouldBe: {
            name: {
                word: "name"
            },
            type: {
                type: "text"
            },
            nulls: false,
            unique: {
                column: {
                    word: "name"
                },
                unique: [{
                    word: "name"
                }]
            }
        }
    });

    testSyntax(ColumnDefinition, {
        str: "name text not null unique",
        shouldBe: {
            name: {
                word: "name"
            },
            type: {
                type: "text"
            },
            nulls: false,
            unique: {
                column: {
                    word: "name"
                },
                unique: [{
                    word: "name"
                }]
            }
        }
    });

    testSyntax(ColumnDefinition, {
        str: "id_company integer references company",
        shouldBe: {
            name: {
                word: "id_company"
            },
            type: {
                type: "integer"
            },
            nulls: true,
            foreignKey: {
                column: {
                    word: "id_company"
                },
                columns: [{
                    word: "id_company"
                }],
                referenceTable: {star: false, link: [
                    {word: "company"}
                ]}
            }
        }
    });

    testSyntax(ColumnDefinition, {
        str: "id_company integer references company (id)",
        shouldBe: {
            name: {
                word: "id_company"
            },
            type: {
                type: "integer"
            },
            nulls: true,
            foreignKey: {
                column: {
                    word: "id_company"
                },
                columns: [{
                    word: "id_company"
                }],
                referenceTable: {star: false, link: [
                    {word: "company"}
                ]},
                referenceColumns: [{
                    word: "id"
                }]
            }
        }
    });

    testSyntax(ColumnDefinition, {
        str: "profit numeric default 0",
        shouldBe: {
            name: {
                word: "profit"
            },
            type: {
                type: "numeric"
            },
            nulls: true,
            default: {
                elements: [
                    {number: "0"}
                ]
            }
        }
    });

    testSyntax(ColumnDefinition, {
        str: "profit numeric default 0 not null",
        shouldBe: {
            name: {
                word: "profit"
            },
            type: {
                type: "numeric"
            },
            nulls: false,
            default: {
                elements: [
                    {number: "0"}
                ]
            }
        }
    });

    testSyntax(ColumnDefinition, {
        str: "profit numeric not null default 0",
        shouldBe: {
            name: {
                word: "profit"
            },
            type: {
                type: "numeric"
            },
            nulls: false,
            default: {
                elements: [
                    {number: "0"}
                ]
            }
        }
    });

    testSyntax(ColumnDefinition, {
        str: "profit numeric not null default 0 unique",
        shouldBe: {
            name: {
                word: "profit"
            },
            type: {
                type: "numeric"
            },
            nulls: false,
            unique: {
                column: {
                    word: "profit"
                },
                unique: [{
                    word: "profit"
                }]
            },
            default: {
                elements: [
                    {number: "0"}
                ]
            }
        }
    });

    testSyntax(ColumnDefinition, {
        str: "id_order_type integer not null default 1 unique references order_type check (id_order_type in (1,2,3))",
        shouldBe: {
            name: {
                word: "id_order_type"
            },
            type: {
                type: "integer"
            },
            nulls: false,
            unique: {
                column: {
                    word: "id_order_type"
                },
                unique: [{
                    word: "id_order_type"
                }]
            },
            foreignKey: {
                column: {
                    word: "id_order_type"
                },
                columns: [{
                    word: "id_order_type"
                }],
                referenceTable: {star: false, link: [
                    {word: "order_type"}
                ]}
            },
            check: {
                column: {
                    word: "id_order_type"
                },
                check: {
                    elements: [
                        {star: false, link: [
                            {word: "id_order_type"}
                        ]},
                        {
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

    testSyntax(ColumnDefinition, {
        str: "id serial primary key unique",
        error: /column already defined as unique by primary key/
    });

    testSyntax(ColumnDefinition, {
        str: "id serial unique primary key",
        error: /column already defined as unique by primary key/
    });

    testSyntax(ColumnDefinition, {
        str: "id serial default 1 default 1",
        error: /duplicate default/
    });

});
