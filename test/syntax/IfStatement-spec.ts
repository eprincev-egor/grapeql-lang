
import {IfStatement} from "../../lib/syntax/IfStatement";
import testSyntax from "../testSyntax";

describe("IfStatement", () => {

    testSyntax(IfStatement, {
        str: "if true then return false; end if;",
        result: {
            if: {elements: [
                {boolean: true}
            ]},
            then: {statements: [
                {return: {elements: [
                    {boolean: false}
                ]}}
            ]},
            else: null,
            elsif: null
        }
    });

    testSyntax(IfStatement, {
        str: "if false then return 1; else return 2; end if;",
        result: {
            if: {elements: [
                {boolean: false}
            ]},
            then: {statements: [
                {return: {elements: [
                    {number: "1"}
                ]}}
            ]},
            else: {statements: [
                {return: {elements: [
                    {number: "2"}
                ]}}
            ]},
            elsif: null
        }
    });

    testSyntax(IfStatement, {
        str: `
            if a then 
                return a; 
            elsif b then 
                return b;
            elsif c then 
                return c;
            end if;
        `.trim(),
        result: {
            if: {elements: [
                {star: false, link: [
                    {word: "a", content: null}
                ]}
            ]},
            then: {statements: [
                {return: {elements: [
                    {star: false, link: [
                        {word: "a", content: null}
                    ]}
                ]}}
            ]},
            elsif: [
                {
                    elsif: {elements: [
                        {star: false, link: [
                            {word: "b", content: null}
                        ]}
                    ]},
                    then: {statements: [
                        {return: {elements: [
                            {star: false, link: [
                                {word: "b", content: null}
                            ]}
                        ]}}
                    ]}
                },
                {
                    elsif: {elements: [
                        {star: false, link: [
                            {word: "c", content: null}
                        ]}
                    ]},
                    then: {statements: [
                        {return: {elements: [
                            {star: false, link: [
                                {word: "c", content: null}
                            ]}
                        ]}}
                    ]}
                }
            ],
            else: null
        }
    });

    testSyntax(IfStatement, {
        str: `
            if a then 
                return a; 
            elsif b then 
                return b;
            else 
                return c;
            end if;
        `.trim(),
        result: {
            if: {elements: [
                {star: false, link: [
                    {word: "a", content: null}
                ]}
            ]},
            then: {statements: [
                {return: {elements: [
                    {star: false, link: [
                        {word: "a", content: null}
                    ]}
                ]}}
            ]},
            elsif: [
                {
                    elsif: {elements: [
                        {star: false, link: [
                            {word: "b", content: null}
                        ]}
                    ]},
                    then: {statements: [
                        {return: {elements: [
                            {star: false, link: [
                                {word: "b", content: null}
                            ]}
                        ]}}
                    ]}
                }
            ],
            else: {statements: [
                {return: {elements: [
                    {star: false, link: [
                        {word: "c", content: null}
                    ]}
                ]}}
            ]}
        }
    });    

});