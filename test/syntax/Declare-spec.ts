
import {testSyntax} from "../testSyntax";
import {Declare} from "../../lib/syntax/Declare";

describe("Declare", () => {

    testSyntax(Declare, {
        str: "declare a text, b numeric",
        shouldBe: {
            variables: [
                {
                    name: {word: "a"},
                    type: {type: "text"},
                    nulls: true
                },
                {
                    name: {word: "b"},
                    type: {type: "numeric"},
                    nulls: true
                }
            ]
        }
    });
    
});
