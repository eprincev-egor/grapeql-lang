
import {testSyntax} from "../testSyntax";
import {WindowDefinition} from "../../lib/syntax/WindowDefinition";

describe("WindowDefinition", () => {

    testSyntax(WindowDefinition, {
        str: "parent_window",
        shouldBe: {
            windowDefinition: {
                word: "parent_window"
            }
        }
    });

    testSyntax(WindowDefinition, {
        str: "partition by company.name, company.id",
        shouldBe: {
            partitionBy: [
                {elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "name"}
                    ]}
                ]},
                {elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "id"}
                    ]}
                ]}
            ]
        }
    });

    testSyntax(WindowDefinition, {
        str: "order by company.name asc, company.id desc",
        shouldBe: {
            orderBy: [
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "company"},
                            {word: "name"}
                        ]}
                    ]},
                    vector: "asc"
                },
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "company"},
                            {word: "id"}
                        ]}
                    ]},
                    vector: "desc"
                }
            ]
        }
    });

    testSyntax(WindowDefinition, {
        str: "range between 1 following and 2 following",
        shouldBe: {
            range: {
                start: {
                    value: {number: "1"},
                    following: true
                },
                end: {
                    value: {number: "2"},
                    following: true
                }
            }
        }
    });

    testSyntax(WindowDefinition, {
        str: "rows between 1 preceding and 2 following",
        shouldBe: {
            rows: {
                start: {
                    value: {number: "1"},
                    preceding: true
                },
                end: {
                    value: {number: "2"},
                    following: true
                }
            }
        }
    });

    testSyntax(WindowDefinition, {
        str: "parent_window partition by company.name, company.id order by company.name desc, company.id asc rows between current row and 100 following",
        shouldBe: {
            windowDefinition: {word: "parent_window"},
            partitionBy: [
                {elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "name"}
                    ]}
                ]},
                {elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "id"}
                    ]}
                ]}
            ],
            orderBy: [
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "company"},
                            {word: "name"}
                        ]}
                    ]},
                    vector: "desc"
                },
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "company"},
                            {word: "id"}
                        ]}
                    ]},
                    vector: "asc"
                }
            ],
            rows: {
                start: {
                    currentRow: true
                },
                end: {
                    value: {number: "100"},
                    following: true
                }
            }
        }
    });

    testSyntax(WindowDefinition, {
        str: "parent_window partition by company.name, company.id order by company.name desc, company.id asc range between current row and 100 following",
        shouldBe: {
            windowDefinition: {word: "parent_window"},
            partitionBy: [
                {elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "name"}
                    ]}
                ]},
                {elements: [
                    {star: false, link: [
                        {word: "company"},
                        {word: "id"}
                    ]}
                ]}
            ],
            orderBy: [
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "company"},
                            {word: "name"}
                        ]}
                    ]},
                    vector: "desc"
                },
                {
                    expression: {elements: [
                        {star: false, link: [
                            {word: "company"},
                            {word: "id"}
                        ]}
                    ]},
                    vector: "asc"
                }
            ],
            range: {
                start: {
                    currentRow: true
                },
                end: {
                    value: {number: "100"},
                    following: true
                }
            }
        }
    });

});
