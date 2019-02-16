"use strict";

const {Syntax} = require("lang-coach");
const PgNumber = require("./PgNumber");

/*
UNBOUNDED PRECEDING
UNBOUNDED FOLLOWING
CURRENT ROW
value PRECEDING
value FOLLOWING
    */

class WindowDefinitionFrameElement extends Syntax {
    static structure() {
        return {
            value: PgNumber,
            unbounded: "boolean",
            currentRow: "boolean",
            preceding: "boolean",
            following: "boolean"
        };
    }

    static parse(coach, data) {

        if ( coach.isWord("unbounded") ) {
            coach.expectWord("unbounded");

            data.unbounded = true;

            let word = coach.readWord();
            if ( word != "preceding" && word != "following" ) {
                coach.throwError("expected preceding or following");
            }

            if ( word == "preceding" ) {
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

            let word = coach.readWord();
            if ( word != "preceding" && word != "following" ) {
                coach.throwError("expected preceding or following");
            }

            if ( word == "preceding" ) {
                data.preceding = true;
            } else {
                data.following = true;
            }
        }
    }
    
    static is(coach) {
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

module.exports = WindowDefinitionFrameElement;
