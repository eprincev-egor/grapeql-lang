
import {Update} from "../../lib/syntax/Update";
import testSyntax from "../testSyntax";

describe("Update", () => {

    testSyntax(Update, {
        str: "update companies set name = 'nice'",
        result: {
            with: null,
            only: false,
            table: {link: [
                {word: "companies", content: null}
            ], star: false},
            as: null,
            star: false,
            set: [
                {
                    column: {word: "name", content: null},
                    columns: null,
                    select: null,
                    values: null,
                    value: {default: null, value: {elements: [
                        {content: "nice"}
                    ]}}
                }
            ],
            from: null,
            where: null,
            returning: null
        }
    });

});
