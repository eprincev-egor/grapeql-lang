
import {testSyntax} from "../testSyntax";
import {GroupByElementContent} from "../../lib/syntax/GroupByElementContent";

describe("GroupByElementContent", () => {

    testSyntax(GroupByElementContent, {
        str: "id",
        shouldBe: {
            single: true,
            expressions: [{elements: [
                {star: false, link: [
                    {word: "id"}
                ]}
            ]}]
        }
    });

    testSyntax(GroupByElementContent, {
        str: "(id, name)",
        shouldBe: {
            single: false,
            expressions: [
                {elements: [
                    {star: false, link: [
                        {word: "id"}
                    ]}
                ]},
                {elements: [
                    {star: false, link: [
                        {word: "name"}
                    ]}
                ]}
            ]
        }
    });
});
