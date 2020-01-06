"use strict";

const GroupByElementContent = require("../../lib/syntax/GroupByElementContent");
const testSyntax = require("../testSyntax");

describe("GroupByElementContent", () => {

    testSyntax(GroupByElementContent, {
        str: "id",
        result: {
            single: true,
            expressions: [{elements: [
                {star: false, link: [
                    {word: "id", content: null}
                ]}
            ]}]
        }
    });

    testSyntax(GroupByElementContent, {
        str: "(id, name)",
        result: {
            single: false,
            expressions: [
                {elements: [
                    {star: false, link: [
                        {word: "id", content: null}
                    ]}
                ]},
                {elements: [
                    {star: false, link: [
                        {word: "name", content: null}
                    ]}
                ]}
            ]
        }
    });
});
