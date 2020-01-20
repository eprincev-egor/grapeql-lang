
import CreateTable from "../../lib/syntax/CreateTable";
import testSyntax from "../testSyntax";

describe("CreateTable", () => {

    testSyntax(CreateTable, {
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
            inherits: []
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
            inherits: []
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
            ]
        }
    });
    
});
