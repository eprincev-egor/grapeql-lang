
import {RaiseUsing} from "../../lib/syntax/RaiseUsing";
import testSyntax from "../testSyntax";

describe("RaiseUsing", () => {

    testSyntax(RaiseUsing, {
        str: "message = 'nice'",
        result: {
            option: "message",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "MESSAGE = 'nice'",
        result: {
            option: "message",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "detail = 'nice'",
        result: {
            option: "detail",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "hint = 'nice'",
        result: {
            option: "hint",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "errcode = 'nice'",
        result: {
            option: "errcode",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "column = 'nice'",
        result: {
            option: "column",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "constraint = 'nice'",
        result: {
            option: "constraint",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "datatype = 'nice'",
        result: {
            option: "datatype",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "table = 'nice'",
        result: {
            option: "table",
            expression: {elements: [
                {content: "nice"}
            ]}
        }
    });

    testSyntax(RaiseUsing, {
        str: "schema = 'nice'",
        result: {
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
