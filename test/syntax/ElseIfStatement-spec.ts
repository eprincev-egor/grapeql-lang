
import {testSyntax} from "../testSyntax";
import {ElseIfStatement} from "../../lib/syntax/ElseIfStatement";

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
