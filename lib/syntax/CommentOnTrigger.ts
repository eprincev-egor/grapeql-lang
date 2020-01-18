
import CommentOn from "./CommentOn";
import TriggerIdentify from "./TriggerIdentify";
import GrapeQLCoach from "../GrapeQLCoach";

export default class CommentOnTrigger extends CommentOn<CommentOnTrigger> {
    structure() {
        return {
            ...super.structure(),

            trigger: TriggerIdentify
        };
    }
    
    is(coach: GrapeQLCoach) {
        return coach.is(/comment\s+on\s+trigger/i);
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("comment");
        coach.expectWord("on");
        coach.expectWord("trigger");

        data.trigger = coach.parse(TriggerIdentify);

        // comment ... is 'some'
        super.parseComment(coach, data);
    }

    toString() {
        const triggerIdentify = this.get("trigger");
        const commentIs = super.toStringCommentIs();

        return `comment on trigger ${triggerIdentify} ${commentIs}`;
    }
}
