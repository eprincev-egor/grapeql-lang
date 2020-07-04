
import {testSyntax} from "../testSyntax";
import {IfStatement} from "../../lib/syntax/IfStatement";

describe("IfStatement", () => {

    testSyntax(IfStatement, {
        str: "if true then return false; end if;",
        shouldBe: {
            if: {elements: [
                {boolean: true}
            ]},
            then: {statements: [
                {return: {elements: [
                    {boolean: false}
                ]}}
            ]}
        }
    });

    testSyntax(IfStatement, {
        str: "if false then return 1; else return 2; end if;",
        shouldBe: {
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
            ]}
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
        shouldBe: {
            if: {elements: [
                {star: false, link: [
                    {word: "a"}
                ]}
            ]},
            then: {statements: [
                {return: {elements: [
                    {star: false, link: [
                        {word: "a"}
                    ]}
                ]}}
            ]},
            elsif: [
                {
                    elsif: {elements: [
                        {star: false, link: [
                            {word: "b"}
                        ]}
                    ]},
                    then: {statements: [
                        {return: {elements: [
                            {star: false, link: [
                                {word: "b"}
                            ]}
                        ]}}
                    ]}
                },
                {
                    elsif: {elements: [
                        {star: false, link: [
                            {word: "c"}
                        ]}
                    ]},
                    then: {statements: [
                        {return: {elements: [
                            {star: false, link: [
                                {word: "c"}
                            ]}
                        ]}}
                    ]}
                }
            ]
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
        shouldBe: {
            if: {elements: [
                {star: false, link: [
                    {word: "a"}
                ]}
            ]},
            then: {statements: [
                {return: {elements: [
                    {star: false, link: [
                        {word: "a"}
                    ]}
                ]}}
            ]},
            elsif: [
                {
                    elsif: {elements: [
                        {star: false, link: [
                            {word: "b"}
                        ]}
                    ]},
                    then: {statements: [
                        {return: {elements: [
                            {star: false, link: [
                                {word: "b"}
                            ]}
                        ]}}
                    ]}
                }
            ],
            else: {statements: [
                {return: {elements: [
                    {star: false, link: [
                        {word: "c"}
                    ]}
                ]}}
            ]}
        }
    });    

});
