
import {testSyntax} from "../testSyntax";
import {CommentOnFunction} from "../../lib/syntax/CommentOnFunction";
import {CommentOnTrigger} from "../../lib/syntax/CommentOnTrigger";

describe("CommentOn", () => {

    testSyntax(CommentOnTrigger, {
        str: "comment on trigger test on company is $$xxx$$",
        result: {
            trigger: {
                name: "test",
                schema: "public",
                table: "company"
            },
            comment: {
                content: "xxx"
            }
        }
    });
    
    testSyntax(CommentOnTrigger, {
        str: "comment on trigger test on company is 'nice'",
        result: {
            trigger: {
                name: "test",
                schema: "public",
                table: "company"
            },
            comment: {
                content: "nice"
            }
        }
    });
    
    testSyntax(CommentOnFunction, {
        str: "comment on function test(integer, text) is $$yyy$$",
        result: {
            function: {
                name: "test",
                schema: "public",
                args: [
                    "integer",
                    "text"
                ]
            },
            comment: {
                content: "yyy"
            }
        }
    });

    testSyntax(CommentOnFunction, {
        str: "comment on function operation.func() is $$yyy$$",
        result: {
            function: {
                name: "func",
                schema: "operation",
                args: []
            },
            comment: {
                content: "yyy"
            }
        }
    });

});
