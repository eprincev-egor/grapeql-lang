
import GrapeQLCoach from "../../lib/GrapeQLCoach";
import ColumnDefinition from "../../lib/syntax/ColumnDefinition";
import testSyntax from "../testSyntax";
import assert from "assert";

describe("ColumnDefinition", () => {

    testSyntax(ColumnDefinition, {
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

    testSyntax(ColumnDefinition, {
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

    testSyntax(ColumnDefinition, {
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

    testSyntax(ColumnDefinition, {
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



});
