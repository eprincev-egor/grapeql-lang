
import {testSyntax} from "../testSyntax";
import {Declare} from "../../lib/syntax/Declare";

describe("Declare", () => {

    testSyntax(Declare, {
        str: "declare a text, b numeric",
        result: {
            variables: [
                {
                    name: {word: "a", content: null},
                    type: {type: "text"},
                    collate: null,
                    nulls: true,
                    default: null
                },
                {
                    name: {word: "b", content: null},
                    type: {type: "numeric"},
                    collate: null,
                    nulls: true,
                    default: null
                }
            ]
        }
    });
    
});
