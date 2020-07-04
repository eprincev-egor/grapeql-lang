
import {testSyntax} from "../testSyntax";
import {AssignVarStatement} from "../../lib/syntax/AssignVarStatement";

describe("AssignVarStatement", () => {

    testSyntax(AssignVarStatement, {
        str: "a = 1",
        shouldBe: {
            variable: {
                star: false, link: [
                    {word: "a"}
                ]
            },
            assign: {elements: [
                {number: "1"}
            ]}
        }
    });

    testSyntax(AssignVarStatement, {
        str: "new.x = 1",
        shouldBe: {
            variable: {
                star: false, link: [
                    {word: "new"},
                    {word: "x"}
                ]
            },
            assign: {elements: [
                {number: "1"}
            ]}
        }
    });
    
    testSyntax(AssignVarStatement, {
        str: "old.y = new.x",
        shouldBe: {
            variable: {
                star: false, link: [
                    {word: "old"},
                    {word: "y"}
                ]
            },
            assign: {elements: [
                {
                    star: false, link: [
                        {word: "new"},
                        {word: "x"}
                    ]
                }
            ]}
        }
    });

});
