"use strict";

const Column = require("../../lib/syntax/Column");
const testSyntax = require("../testSyntax");

describe("Column", () => {

    testSyntax(Column, {
        str: "company.id as id",
        result: {
            expression: {
                elements: [
                    {star: false, link: [
                        {word: "company", content: null},
                        {word: "id", content: null}
                    ]}
                ]
            },
            as: { word: "id", content: null }
        }
    });

    testSyntax(Column, {
        str: "null as nulL1",
        result: {
            expression: {
                elements: [
                    {null: true}
                ]
            },
            as: { word: "null1", content: null }
        }
    });

    testSyntax(Column, {
        str: "*",
        result: {
            expression: {
                elements: [
                    {star: true, link: []}
                ]
            },
            as: null
        }
    });

});