
import {testSyntax} from "../testSyntax";
import {AssignVarStatement} from "../../lib/syntax/AssignVarStatement";

describe("AssignVarStatement", () => {

    testSyntax(AssignVarStatement, {
        str: "a = 1",
        shouldBe: {
            variable: {
                star: false, link: [
                    {word: "a", content: null}
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
                    {word: "new", content: null},
                    {word: "x", content: null}
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
                    {word: "old", content: null},
                    {word: "y", content: null}
                ]
            },
            assign: {elements: [
                {
                    star: false, link: [
                        {word: "new", content: null},
                        {word: "x", content: null}
                    ]
                }
            ]}
        }
    });

});
