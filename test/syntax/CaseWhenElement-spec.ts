
import {testSyntax} from "../testSyntax";
import {CaseWhenElement} from "../../lib/syntax/CaseWhenElement";

describe("CaseWhenElement", () => {

    testSyntax(CaseWhenElement, {
        str: "when true then 1",
        shouldBe: {
            when: {elements: [{boolean: true}]},
            then: {elements: [{number: "1"}]}
        }
    });

});
