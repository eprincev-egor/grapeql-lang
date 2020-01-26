
import WithQuery from "../../lib/syntax/WithQuery";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("WithQuery", () => {

    GrapeQLCoach.test(WithQuery, {
        str: `items as (
            select
        )`,
        result: {
            name: {word: "items", content: null},
            columns: null,
            select: {
                with: null,
                columns: null,
                from: null,
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
        }
    });

    GrapeQLCoach.test(WithQuery, {
        str: `items as (
            values
                (1, 2),
                (3, 4)
        )`,
        result: {
            name: {word: "items", content: null},
            columns: null,
            select: null,
            values: [
                {values: [
                    {
                        default: null,
                        value: {elements: [
                            {number: "1"}
                        ]}
                    },
                    {
                        default: null,
                        value: {elements: [
                            {number: "2"}
                        ]}
                    }
                ]},
                {values: [
                    {
                        default: null,
                        value: {elements: [
                            {number: "3"}
                        ]}
                    },
                    {
                        default: null,
                        value: {elements: [
                            {number: "4"}
                        ]}
                    }
                ]}
            ]
        }
    });
    
    GrapeQLCoach.test(WithQuery, {
        str: `items (id, code) as (
            values
                (1, 2),
                (3, 4)
        )`,
        result: {
            name: {word: "items", content: null},
            columns: [
                {word: "id", content: null},
                {word: "code", content: null}
            ],
            select: null,
            values: [
                {values: [
                    {
                        default: null,
                        value: {elements: [
                            {number: "1"}
                        ]}
                    },
                    {
                        default: null,
                        value: {elements: [
                            {number: "2"}
                        ]}
                    }
                ]},
                {values: [
                    {
                        default: null,
                        value: {elements: [
                            {number: "3"}
                        ]}
                    },
                    {
                        default: null,
                        value: {elements: [
                            {number: "4"}
                        ]}
                    }
                ]}
            ]
        }
    });

    GrapeQLCoach.test(WithQuery, {
        str: `items as (
            values
                (1, 2, 3),
                (4, 5)
        )`,
        error: /VALUES lists must all be the same length/
    });

    GrapeQLCoach.test(WithQuery, {
        str: `items as (
            values
                (1, 2, 3),
                (4, 5, default)
        )`,
        error: /DEFAULT is not allowed in this context/
    });
    
});
