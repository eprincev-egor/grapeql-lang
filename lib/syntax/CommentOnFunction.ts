

import CommentOn from "./CommentOn";
import FunctionIdentify from "./FunctionIdentify";
import {GrapeQLCoach} from "../GrapeQLCoach";

export default class CommentOnFunction extends CommentOn<CommentOnFunction> {
    structure() {
        return {
            ...super.structure(),

            function: FunctionIdentify
        };
    }

    is(coach) {
        return coach.is(/comment\s+on\s+function/i);
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("comment");
        coach.expectWord("on");
        coach.expectWord("function");

        data.function = coach.parse(FunctionIdentify);

        // comment ... is 'some'
        super.parseComment(coach, data);
    }

    toString() {
        const functionIdentify = this.get("function");
        const commentIs = super.toStringCommentIs();

        return `comment on function ${functionIdentify} ${commentIs}`;
    }
}
