
import {testSyntax} from "../testSyntax";
import {Delete} from "../../lib/syntax/Delete";

describe("Delete", () => {

    testSyntax(Delete, {
        str: "delete from companies",
        shouldBe: {
            only: false,
            star: false,
            table: {star: false, link: [
                {word: "companies"}
            ]},
            as: null,
            using: null,
            with: null,
            where: null,
            returning: null
        }
    });

    testSyntax(Delete, {
        str: "delete from only orders",
        shouldBe: {
            only: true,
            star: false,
            table: {star: false, link: [
                {word: "orders"}
            ]},
            as: null,
            using: null,
            with: null,
            where: null,
            returning: null
        }
    });

    testSyntax(Delete, {
        str: "delete from orders *",
        shouldBe: {
            only: false,
            star: true,
            table: {star: false, link: [
                {word: "orders"}
            ]},
            as: null,
            using: null,
            with: null,
            where: null,
            returning: null
        }
    });

    testSyntax(Delete, {
        str: "delete from only orders *",
        shouldBe: {
            only: true,
            star: true,
            table: {star: false, link: [
                {word: "orders"}
            ]},
            as: null,
            using: null,
            with: null,
            where: null,
            returning: null
        }
    });

    testSyntax(Delete, {
        str: "delete from only orders * as Order",
        shouldBe: {
            only: true,
            star: true,
            table: {star: false, link: [
                {word: "orders"}
            ]},
            as: {word: "order"},
            using: null,
            with: null,
            where: null,
            returning: null
        }
    });

    testSyntax(Delete, {
        str: `delete from orders
        using companies
        where
            orders.id_client = companies.id and
            companies.name ilike '%ooo%'
        `,
        shouldBe: {
            only: false,
            star: false,
            table: {star: false, link: [
                {word: "orders"}
            ]},
            as: null,
            using: [{
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
                    {word: "companies"}
                ]}
            }],
            with: null,
            where: {elements: [
                {star: false, link: [
                    {word: "orders"},
                    {word: "id_client"}
                ]},
                {operator: "="},
                {star: false, link: [
                    {word: "companies"},
                    {word: "id"}
                ]},

                {operator: "and"},

                {star: false, link: [
                    {word: "companies"},
                    {word: "name"}
                ]},
                {operator: "ilike"},
                {content: "%ooo%"}
            ]},
            returning: null
        }
    });

    testSyntax(Delete, {
        str: `with
        some_orders as (select * from orders)

        delete from companies
        where
            companies.id = (select id_client from some_orders)
        `,
        shouldBe: {
            with: {
                recursive: null,
                queries: [{
                    name: {word: "some_orders"},
                    columns: null,
                    select: {
                        with: null,
                        columns: [
                            {
                                expression: {elements: [
                                    {star: true, link: []}
                                ]},
                                as: null
                            }
                        ],
                        into: null,
                        from: [{
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
                                {word: "orders"}
                            ]}
                        }],
                        where: null,
                        groupBy: null,
                        having: null,
                        window: null,
                        orderBy: null,
                        union: null,
                        offset: null,
                        offsetRow: null,
                        offsetRows: null,
                        limit: null,
                        fetch: null
                    },
                    values: null
                }]
            },
            only: false,
            star: false,
            table: {star: false, link: [
                {word: "companies"}
            ]},
            as: null,
            using: null,
            where: {elements: [
                {star: false, link: [
                    {word: "companies"},
                    {word: "id"}
                ]},

                {operator: "="},

                {elements: [{
                    with: null,
                    columns: [
                        {
                            expression: {elements: [
                                {star: false, link: [
                                    {word: "id_client"}
                                ]}
                            ]},
                            as: null
                        }
                    ],
                    into: null,
                    from: [{
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
                            {word: "some_orders"}
                        ]}
                    }],
                    where: null,
                    groupBy: null,
                    having: null,
                    window: null,
                    orderBy: null,
                    union: null,
                    offset: null,
                    offsetRow: null,
                    offsetRows: null,
                    limit: null,
                    fetch: null
                }]}
            ]},
            returning: null
        }
    });

});
