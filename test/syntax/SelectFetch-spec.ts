
import {testSyntax} from "../testSyntax";
import {SelectFetch} from "../../lib/syntax/SelectFetch";

describe("SelectFetch", () => {

    testSyntax(SelectFetch, {
        str: "fetch first row only",
        shouldBe: {
            first: true,
            next: null,
            row: true,
            rows: null,
            count: null
        }
    });

    testSyntax(SelectFetch, {
        str: "fetch next row only",
        shouldBe: {
            first: null,
            next: true,
            row: true,
            rows: null,
            count: null
        }
    });

    testSyntax(SelectFetch, {
        str: "fetch next 5 rows only",
        shouldBe: {
            first: null,
            next: true,
            row: null,
            rows: true,
            count: 5
        }
    });

});
