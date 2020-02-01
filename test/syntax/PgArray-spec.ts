

import PgArray from "../../lib/syntax/PgArray";
import testSyntax from "../testSyntax";

describe("PgArray", () => {

    testSyntax(PgArray, {
        str: "ARRAY[]",
        result: {array: []}
    });

    testSyntax(PgArray, {
        str: "arraY[]",
        result: {array: []}
    });

    testSyntax(PgArray, {
        str: "array[1]",
        result: {array: [
            {elements: [
                {number: "1"}
            ]}
        ]}
    });

    testSyntax(PgArray, {
        str: "array[ '' ]",
        result: {array: [
            {elements: [
                {content: ""}
            ]}
        ]}
    });

});
