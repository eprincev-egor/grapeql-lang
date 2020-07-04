
import {testSyntax} from "../testSyntax";
import {CheckConstraint} from "../../lib/syntax/CheckConstraint";

describe("CheckConstraint", () => {

    testSyntax(CheckConstraint, {
        str: "constraint test check (profit > 0)",
        shouldBe: {
            name: {
                word: "test"
            },
            check: {
                elements: [
                    {star: false, link: [
                        {word: "profit"}
                    ]},
                    {operator: ">"},
                    {number: "0"}
                ]
            }
        }
    });
    
    testSyntax(CheckConstraint, {
        str: "check (profit > 0)",
        options: {
            column: {
                word: "profit"
            }
        },
        shouldBe: {
            column: {
                word: "profit"
            },
            check: {
                elements: [
                    {star: false, link: [
                        {word: "profit"}
                    ]},
                    {operator: ">"},
                    {number: "0"}
                ]
            }
        }
    });
    
});
