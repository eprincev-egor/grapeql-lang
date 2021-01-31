import {testSyntax} from "../testSyntax";
import {Position} from "../../lib/syntax/Position";

describe("Position", () => {

    testSyntax(Position, {
        str: "position('test' in 'test test')",
        shouldBe: {
            substring: {elements: [{
                content: "test"
            }]},
            in: {elements: [{
                content: "test test"
            }]}
        }
    });
});
