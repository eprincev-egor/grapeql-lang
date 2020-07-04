
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
            ]}
        }
    });

    testSyntax(Delete, {
        str: "delete from only orders",
        shouldBe: {
            only: true,
            star: false,
            table: {star: false, link: [
                {word: "orders"}
            ]}
        }
    });

    testSyntax(Delete, {
        str: "delete from orders *",
        shouldBe: {
            only: false,
            star: true,
            table: {star: false, link: [
                {word: "orders"}
            ]}
        }
    });

    testSyntax(Delete, {
        str: "delete from only orders *",
        shouldBe: {
            only: true,
            star: true,
            table: {star: false, link: [
                {word: "orders"}
            ]}
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
            as: {word: "order"}
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
            using: [{
                joins: [],

                table: {star: false, link: [
                    {word: "companies"}
                ]}
            }],
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
            ]}
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
                queries: [{
                    name: {word: "some_orders"},
                    select: {
                        columns: [
                            {
                                expression: {elements: [
                                    {star: true, link: []}
                                ]}
                            }
                        ],
                        from: [{
                            joins: [],
            
                            table: {star: false, link: [
                                {word: "orders"}
                            ]}
                        }]
                    }
                }]
            },
            only: false,
            star: false,
            table: {star: false, link: [
                {word: "companies"}
            ]},
            where: {elements: [
                {star: false, link: [
                    {word: "companies"},
                    {word: "id"}
                ]},

                {operator: "="},

                {elements: [{
                    columns: [
                        {
                            expression: {elements: [
                                {star: false, link: [
                                    {word: "id_client"}
                                ]}
                            ]}
                        }
                    ],
                    from: [{
                        joins: [],
        
                        table: {star: false, link: [
                            {word: "some_orders"}
                        ]}
                    }]
                }]}
            ]}
        }
    });

});
