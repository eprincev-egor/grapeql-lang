
import CheckConstraint from "../../lib/syntax/CheckConstraint";
import testSyntax from "../testSyntax";

describe("CheckConstraint", () => {

    testSyntax(CheckConstraint, {
        str: "constraint test check (profit > 0)",
        result: {
            name: {
                word: "test",
                content: null
            },
            column: null,
            check: {
                elements: [
                    {star: false, link: [
                        {word: "profit", content: null}
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
        result: {
            name: null,
            column: {
                word: "profit",
                content: null
            },
            check: {
                elements: [
                    {star: false, link: [
                        {word: "profit", content: null}
                    ]},
                    {operator: ">"},
                    {number: "0"}
                ]
            }
        }
    });
    
});
