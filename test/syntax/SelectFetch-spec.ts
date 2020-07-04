
import {testSyntax} from "../testSyntax";
import {SelectFetch} from "../../lib/syntax/SelectFetch";

describe("SelectFetch", () => {

    testSyntax(SelectFetch, {
        str: "fetch first row only",
        shouldBe: {
            first: true,
            row: true
        }
    });

    testSyntax(SelectFetch, {
        str: "fetch next row only",
        shouldBe: {
            next: true,
            row: true
        }
    });

    testSyntax(SelectFetch, {
        str: "fetch next 5 rows only",
        shouldBe: {
            next: true,
            rows: true,
            count: 5
        }
    });

});
