
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {PgNumber} from "./PgNumber";

/*
UNBOUNDED PRECEDING
UNBOUNDED FOLLOWING
CURRENT ROW
value PRECEDING
value FOLLOWING
    */

export class WindowDefinitionFrameElement extends Syntax<WindowDefinitionFrameElement> {
    structure() {
        return {
            value: PgNumber,
            unbounded: Types.Boolean,
            currentRow: Types.Boolean,
            preceding: Types.Boolean,
            following: Types.Boolean
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {

        if ( coach.isWord("unbounded") ) {
            coach.expectWord("unbounded");

            data.unbounded = true;

            const word = coach.readWord();
            if ( word !== "preceding" && word !== "following" ) {
                coach.throwError("expected preceding or following");
            }

            if ( word === "preceding" ) {
                data.preceding = true;
            } else {
                data.following = true;
            }
        }
        else if ( coach.isWord("current") ) {
            coach.expectWord("current");

            coach.expectWord("row");
            data.currentRow = true;
        }
        else {
            data.value = coach.parse(PgNumber);
            coach.skipSpace();

            const word = coach.readWord();
            if ( word !== "preceding" && word !== "following" ) {
                coach.throwError("expected preceding or following");
            }

            if ( word === "preceding" ) {
                data.preceding = true;
            } else {
                data.following = true;
            }
        }
    }
    
    is(coach: GrapeQLCoach) {
        return (
            coach.isWord("unbounded") || 
            coach.isWord("current") ||
            coach.is(PgNumber)
        );
    }
    
    toString() {
        if ( this.row.unbounded ) {
            return (
                "unbounded " +
                (this.row.preceding ?
                    "preceding" :
                    "following")
            );
        }
        else if ( this.row.currentRow ) {
            return "current row";
        }
        else {
            return (
                this.row.value!.toString() + " " +
                (this.row.preceding ? 
                    "preceding" : 
                    "following")
            );
        }
    }
}
