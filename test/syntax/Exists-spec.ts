
import {testSyntax} from "../testSyntax";
import {Exists} from "../../lib/syntax/Exists";

describe("Exists", () => {

    testSyntax(Exists, {
        str: "exists( select )",
        shouldBe: {
            exists: {
                with: null,
                columns: null,
                into: null,
                from: null,
                where: null,
                groupBy: null,
                having: null,
                window: null,
                orderBy: null,
                union: null,
                offset: null,
                offsetRow: null,
                offsetRows: null,
                limit: null,
                fetch: null
            }
        }
    });

});
