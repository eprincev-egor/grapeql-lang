
import {testSyntax} from "../testSyntax";
import {WindowDefinition} from "../../lib/syntax/WindowDefinition";

describe("WindowDefinition", () => {

    testSyntax(WindowDefinition, {
        str: "parent_window",
        shouldBe: {
            windowDefinition: {
                word: "parent_window",
                content: null
            },
            partitionBy: null,
            orderBy: null,
            range: null,
            rows: null
        }
    });

    testSyntax(WindowDefinition, {
        str: "partition by company.name, company.id",
        shouldBe: {
            windowDefinition: null,
            partitionBy: [
                {elements: [
                    {star: false, link: [
                        {word: "company", content: null},
                        {word: "name", content: null}
                    ]}
                ]},
                {elements: [
                    {star: false, link: [
                        {word: "company", content: null},
                        {word: "id", content: null}
                    ]}
                ]}
            ],
            orderBy: null,
            range: null,
            rows: null
        }
    });

    testSyntax(WindowDefinition, {
        str: "order by company.name asc, company.id desc",
        shouldBe: {
            windowDefinition: null,
            partitionBy: null,
            orderBy: [
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "company", content: null},
                            {word: "name", content: null}
                        ]}
                    ]},
                    vector: "asc",
                    using: null,
                    nulls: null
                },
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "company", content: null},
                            {word: "id", content: null}
                        ]}
                    ]},
                    vector: "desc",
                    using: null,
                    nulls: null
                }
            ],
            range: null,
            rows: null
        }
    });

    testSyntax(WindowDefinition, {
        str: "range between 1 following and 2 following",
        shouldBe: {
            windowDefinition: null,
            partitionBy: null,
            orderBy: null,
            range: {
                start: {
                    value: {number: "1"},
                    currentRow: null,
                    unbounded: null,
                    preceding: null,
                    following: true
                },
                end: {
                    value: {number: "2"},
                    currentRow: null,
                    unbounded: null,
                    preceding: null,
                    following: true
                }
            },
            rows: null
        }
    });

    testSyntax(WindowDefinition, {
        str: "rows between 1 preceding and 2 following",
        shouldBe: {
            windowDefinition: null,
            partitionBy: null,
            orderBy: null,
            range: null,
            rows: {
                start: {
                    value: {number: "1"},
                    currentRow: null,
                    unbounded: null,
                    preceding: true,
                    following: null
                },
                end: {
                    value: {number: "2"},
                    currentRow: null,
                    unbounded: null,
                    preceding: null,
                    following: true
                }
            }
        }
    });

    testSyntax(WindowDefinition, {
        str: "parent_window partition by company.name, company.id order by company.name desc, company.id asc rows between current row and 100 following",
        shouldBe: {
            windowDefinition: {word: "parent_window", content: null},
            partitionBy: [
                {elements: [
                    {star: false, link: [
                        {word: "company", content: null},
                        {word: "name", content: null}
                    ]}
                ]},
                {elements: [
                    {star: false, link: [
                        {word: "company", content: null},
                        {word: "id", content: null}
                    ]}
                ]}
            ],
            orderBy: [
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "company", content: null},
                            {word: "name", content: null}
                        ]}
                    ]},
                    vector: "desc",
                    using: null,
                    nulls: null
                },
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "company", content: null},
                            {word: "id", content: null}
                        ]}
                    ]},
                    vector: "asc",
                    using: null,
                    nulls: null
                }
            ],
            range: null,
            rows: {
                start: {
                    value: null,
                    currentRow: true,
                    unbounded: null,
                    preceding: null,
                    following: null
                },
                end: {
                    value: {number: "100"},
                    currentRow: null,
                    unbounded: null,
                    preceding: null,
                    following: true
                }
            }
        }
    });

    testSyntax(WindowDefinition, {
        str: "parent_window partition by company.name, company.id order by company.name desc, company.id asc range between current row and 100 following",
        shouldBe: {
            windowDefinition: {word: "parent_window", content: null},
            partitionBy: [
                {elements: [
                    {star: false, link: [
                        {word: "company", content: null},
                        {word: "name", content: null}
                    ]}
                ]},
                {elements: [
                    {star: false, link: [
                        {word: "company", content: null},
                        {word: "id", content: null}
                    ]}
                ]}
            ],
            orderBy: [
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "company", content: null},
                            {word: "name", content: null}
                        ]}
                    ]},
                    vector: "desc",
                    using: null,
                    nulls: null
                },
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "company", content: null},
                            {word: "id", content: null}
                        ]}
                    ]},
                    vector: "asc",
                    using: null,
                    nulls: null
                }
            ],
            range: {
                start: {
                    value: null,
                    currentRow: true,
                    unbounded: null,
                    preceding: null,
                    following: null
                },
                end: {
                    value: {number: "100"},
                    currentRow: null,
                    unbounded: null,
                    preceding: null,
                    following: true
                }
            },
            rows: null
        }
    });

});
