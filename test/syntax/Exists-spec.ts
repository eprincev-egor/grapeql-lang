

import Exists from "../../lib/syntax/Exists";
import testSyntax from "../testSyntax";

describe("Exists", () => {

    testSyntax(Exists, {
        str: "exists( select )",
        result: {
            exists: {
                with: null,
                columns: null,
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
