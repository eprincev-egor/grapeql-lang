

import ValueItem from "../../lib/syntax/ValueItem";
import testSyntax from "../testSyntax";

describe("ValueItem", () => {

    testSyntax(ValueItem, {
        str: "default",
        result: {
            value: null,
            default: true
        }
    });

    testSyntax(ValueItem, {
        str: "1",
        result: {
            value: {elements: [
                {number: "1"}
            ]},
            default: null
        }
    });

});
