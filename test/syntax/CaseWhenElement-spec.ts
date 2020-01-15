

import CaseWhenElement from "../../lib/syntax/CaseWhenElement";
import testSyntax from "../testSyntax";

describe("CaseWhenElement", () => {

    testSyntax(CaseWhenElement, {
        str: "when true then 1",
        result: {
            when: {elements: [{boolean: true}]},
            then: {elements: [{number: "1"}]}
        }
    });

});
