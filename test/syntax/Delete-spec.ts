
import {Delete} from "../../lib/syntax/Delete";
import testSyntax from "../testSyntax";

describe("Delete", () => {

    testSyntax(Delete, {
        str: "delete from companies",
        result: {
            only: false,
            star: false,
            table: {star: false, link: [
                {word: "companies", content: null}
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
        result: {
            only: true,
            star: false,
            table: {star: false, link: [
                {word: "orders", content: null}
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
        result: {
            only: false,
            star: true,
            table: {star: false, link: [
                {word: "orders", content: null}
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
        result: {
            only: true,
            star: true,
            table: {star: false, link: [
                {word: "orders", content: null}
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
        result: {
            only: true,
            star: true,
            table: {star: false, link: [
                {word: "orders", content: null}
            ]},
            as: {word: "order", content: null},
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
        result: {
            only: false,
            star: false,
            table: {star: false, link: [
                {word: "orders", content: null}
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
                    {word: "companies", content: null}
                ]}
            }],
            with: null,
            where: {elements: [
                {star: false, link: [
                    {word: "orders", content: null},
                    {word: "id_client", content: null}
                ]},
                {operator: "="},
                {star: false, link: [
                    {word: "companies", content: null},
                    {word: "id", content: null}
                ]},

                {operator: "and"},

                {star: false, link: [
                    {word: "companies", content: null},
                    {word: "name", content: null}
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
        result: {
            with: {
                recursive: null,
                queries: [{
                    name: {word: "some_orders", content: null},
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
                                {word: "orders", content: null}
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
                {word: "companies", content: null}
            ]},
            as: null,
            using: null,
            where: {elements: [
                {star: false, link: [
                    {word: "companies", content: null},
                    {word: "id", content: null}
                ]},

                {operator: "="},

                {elements: [{
                    with: null,
                    columns: [
                        {
                            expression: {elements: [
                                {star: false, link: [
                                    {word: "id_client", content: null}
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
                            {word: "some_orders", content: null}
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
