
import {testSyntax} from "../testSyntax";
import {Between} from "../../lib/syntax/Between";

describe("Between", () => {

    testSyntax(Between, {
        str: "Between 1 and 2",
        result: {
            symmetric: null,
            between: {elements: [
                {number: "1"}
            ]},
            and: {elements: [
                {number: "2"}
            ]}
        }
    });

    testSyntax(Between, {
        str: "between symmetric 1 + 1 and 2 + 2",
        result: {
            symmetric: true,
            between: {elements: [
                {number: "1"},
                {operator: "+"},
                {number: "1"}
            ]},
            and: {elements: [
                {number: "2"},
                {operator: "+"},
                {number: "2"}
            ]}
        }
    });

});
