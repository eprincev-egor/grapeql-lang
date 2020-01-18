
import {Syntax, Types} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import DollarString from "./DollarString";
import SingleQuotesString from "./SingleQuotesString";

export default class CommentOn<Child extends CommentOn = any> extends Syntax<CommentOn & Child> {
    structure() {
        return {
            comment: Types.Or({
                or: [
                    DollarString, 
                    SingleQuotesString
                ]
            })
        };
    }

    is(coach) {
        return coach.isWord("comment");
    }

    parseComment(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("is");

        if ( coach.is(DollarString) ) {
            data.comment = coach.parse(DollarString);
        }
        else {
            data.comment = coach.parse(SingleQuotesString);
        }
    }
    
    toStringCommentIs(): string {
        return `is ${ this.data.comment }`;
    }
}
