// https://database.guide/how-make_interval-works-in-postgresql/
// https://postgrespro.ru/docs/postgresql/9.6/functions-datetime
import {testSyntax} from "../testSyntax";
import {MakeInterval} from "../../lib/syntax/MakeInterval";

describe("MakeInterval", () => {

    testSyntax(MakeInterval, {
        str: "make_interval(weeks => 2, days => 3)",
        shouldBe: {
            intervalArgs: [
                {type: "weeks", value: {elements: [
                    {number: "2"}
                ]}},
                {type: "days", value: {elements: [
                    {number: "3"}
                ]}}
            ]
        }
    });

    testSyntax(MakeInterval, {
        str: "make_interval(1, 2, 3, 4, 5, 6, 7)",
        shouldBe: {
            intervalArgs: [
                {type: "number", value: {elements: [
                    {number: "1"}
                ]}},
                {type: "number", value: {elements: [
                    {number: "2"}
                ]}},
                {type: "number", value: {elements: [
                    {number: "3"}
                ]}},
                {type: "number", value: {elements: [
                    {number: "4"}
                ]}},
                {type: "number", value: {elements: [
                    {number: "5"}
                ]}},
                {type: "number", value: {elements: [
                    {number: "6"}
                ]}},
                {type: "number", value: {elements: [
                    {number: "7"}
                ]}}
            ]
        }
    });
});
