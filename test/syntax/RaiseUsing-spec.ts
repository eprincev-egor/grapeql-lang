
import {testSyntax} from "../testSyntax";
import {RaiseUsing} from "../../lib/syntax/RaiseUsing";

describe("RaiseUsing", () => {

    testSyntax(RaiseUsing, {
        str: "message = 'nice'",
        shouldBe: {
            option: "message",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "MESSAGE = 'nice'",
        shouldBe: {
            option: "message",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "detail = 'nice'",
        shouldBe: {
            option: "detail",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "hint = 'nice'",
        shouldBe: {
            option: "hint",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "errcode = 'nice'",
        shouldBe: {
            option: "errcode",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "column = 'nice'",
        shouldBe: {
            option: "column",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "constraint = 'nice'",
        shouldBe: {
            option: "constraint",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "datatype = 'nice'",
        shouldBe: {
            option: "datatype",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "table = 'nice'",
        shouldBe: {
            option: "table",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "schema = 'nice'",
        shouldBe: {
            option: "schema",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "hello = 'world'",
        error: /unknown option: hello/i
    });

});
