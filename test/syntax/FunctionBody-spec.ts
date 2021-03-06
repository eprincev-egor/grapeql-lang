
import {testSyntax} from "../testSyntax";
import {FunctionBody} from "../../lib/syntax/FunctionBody";

describe("FunctionBody", () => {

    testSyntax(FunctionBody, {
        str: `
            declare a integer;
            declare b integer;
            begin
                a = 10;
                b = 20;
                return a + b;
            end
        `.trim(),
        shouldBe: {
            declares: [
                {
                    variables: [
                        {
                            name: {word: "a"},
                            type: {type: "integer"},
                            nulls: true
                        }
                    ]
                },
                {
                    variables: [
                        {
                            name: {word: "b"},
                            type: {type: "integer"},
                            nulls: true
                        }
                    ]
                }
            ],
            body: {
                statements: [
                    {
                        variable: {
                            star: false, link: [
                                {word: "a"}
                            ]
                        },
                        assign: {elements: [
                            {number: "10"}
                        ]}
                    },
                    {
                        variable: {
                            star: false, link: [
                                {word: "b"}
                            ]
                        },
                        assign: {elements: [
                            {number: "20"}
                        ]}
                    },
                    {
                        return: {elements: [
                            {star: false, link: [
                                {word: "a"}
                            ]},
                            {operator: "+"},
                            {star: false, link: [
                                {word: "b"}
                            ]},
                        ]}
                    }
                ]
            }
        }
    });
    
});
