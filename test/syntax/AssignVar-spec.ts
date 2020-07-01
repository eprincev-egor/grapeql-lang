
import {AssignVarStatement} from "../../lib/syntax/AssignVarStatement";
import testSyntax from "../testSyntax";

describe("AssignVarStatement", () => {

    testSyntax(AssignVarStatement, {
        str: "a = 1",
        result: {
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
        result: {
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
        result: {
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
