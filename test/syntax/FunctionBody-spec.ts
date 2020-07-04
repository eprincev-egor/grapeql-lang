
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
        result: {
            declares: [
                {
                    variables: [
                        {
                            name: {word: "a", content: null},
                            type: {type: "integer"},
                            collate: null,
                            nulls: true,
                            default: null
                        }
                    ]
                },
                {
                    variables: [
                        {
                            name: {word: "b", content: null},
                            type: {type: "integer"},
                            collate: null,
                            nulls: true,
                            default: null
                        }
                    ]
                }
            ],
            body: {
                statements: [
                    {
                        variable: {
                            star: false, link: [
                                {word: "a", content: null}
                            ]
                        },
                        assign: {elements: [
                            {number: "10"}
                        ]}
                    },
                    {
                        variable: {
                            star: false, link: [
                                {word: "b", content: null}
                            ]
                        },
                        assign: {elements: [
                            {number: "20"}
                        ]}
                    },
                    {
                        return: {elements: [
                            {star: false, link: [
                                {word: "a", content: null}
                            ]},
                            {operator: "+"},
                            {star: false, link: [
                                {word: "b", content: null}
                            ]},
                        ]}
                    }
                ]
            }
        }
    });
    
});
