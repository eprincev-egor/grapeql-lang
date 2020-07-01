
import {ElseIfStatement} from "../../lib/syntax/ElseIfStatement";
import testSyntax from "../testSyntax";

describe("ElseIfStatement", () => {

    testSyntax(ElseIfStatement, {
        str: "elsif true then return false;",
        result: {
            elsif: {elements: [
                {boolean: true}
            ]},
            then: {statements: [
                {return: {elements: [
                    {boolean: false}
                ]}}
            ]}
        }
    });
    
});
