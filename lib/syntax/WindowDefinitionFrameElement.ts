"use strict";

import {Syntax, Types} from "lang-coach";
import PgNumber from "./PgNumber";

/*
UNBOUNDED PRECEDING
UNBOUNDED FOLLOWING
CURRENT ROW
value PRECEDING
value FOLLOWING
    */

export default class WindowDefinitionFrameElement extends Syntax<WindowDefinitionFrameElement> {
    structure() {
        return {
            value: PgNumber,
            unbounded: Types.Boolean,
            currentRow: Types.Boolean,
            preceding: Types.Boolean,
            following: Types.Boolean
        };
    }

    parse(coach, data) {

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
            data.value = coach.parsePgNumber();
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
    
    is(coach) {
        return (
            coach.isWord("unbounded") || 
            coach.isWord("current") ||
            coach.isPgNumber()
        );
    }
    
    toString() {
        if ( this.data.unbounded ) {
            return (
                "unbounded " +
                (this.data.preceding ?
                    "preceding" :
                    "following")
            );
        }
        else if ( this.data.currentRow ) {
            return "current row";
        }
        else {
            return (
                this.data.value.toString() + " " +
                (this.data.preceding ? 
                    "preceding" : 
                    "following")
            );
        }
    }
}


