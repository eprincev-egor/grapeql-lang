
import Comment from "../../lib/syntax/Comment";
import GrapeQLCoach from "../../lib/GrapeQLCoach";

describe("Comment", () => {

    GrapeQLCoach.test(Comment, {
        str: "--123\n",
        result: {
            isLine: true,
            isMulti: false,
            content: "123"
        }
    });

    GrapeQLCoach.test(Comment, {
        str: "--123\r",
        result: {
            isLine: true,
            isMulti: false,
            content: "123"
        }
    });

    GrapeQLCoach.test(Comment, {
        str: "/*123\n456*/",
        result: {
            isLine: false,
            isMulti: true,
            content: "123\n456"
        }
    });

    GrapeQLCoach.test(Comment, {
        str: "/*123\r456*/",
        result: {
            isLine: false,
            isMulti: true,
            content: "123\r456"
        }
    });

    GrapeQLCoach.test(Comment, {
        str: "-1",
        error: /SyntaxError/
    });

});
