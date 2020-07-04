
import {testSyntax} from "../testSyntax";
import {ReturnStatement} from "../../lib/syntax/ReturnStatement";

describe("ReturnStatement", () => {

    testSyntax(ReturnStatement, {
        str: "return 1",
        result: {
            return: {elements: [
                {number: "1"}
            ]}
        }
    });
    
});
