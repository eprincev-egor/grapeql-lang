
import {ReturnStatement} from "../../lib/syntax/ReturnStatement";
import testSyntax from "../testSyntax";

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
