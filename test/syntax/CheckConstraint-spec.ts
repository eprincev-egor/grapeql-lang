
import {testSyntax} from "../testSyntax";
import {CheckConstraint} from "../../lib/syntax/CheckConstraint";

describe("CheckConstraint", () => {

    testSyntax(CheckConstraint, {
        str: "constraint test check (profit > 0)",
        shouldBe: {
            name: {
                word: "test",
                content: null
            },
            column: null,
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
                word: "profit",
                content: null
            }
        },
        shouldBe: {
            name: null,
            column: {
                word: "profit",
                content: null
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
