"use strict";

import {Syntax, Types} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";

export default class Any extends Syntax<Any> {
    structure() {
        const Expression = this.syntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        const Select = this.syntax.Select as GrapeQLCoach["syntax"]["Select"];

        return {
            type: Types.String({
                enum: ["any", "all", "some"]
            }),
            array: Expression,
            select: Select
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = this.syntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        const Select = this.syntax.Select as GrapeQLCoach["syntax"]["Select"];
        
        if ( coach.isWord("any") ) {
            coach.expectWord("any");
            data.type = "any";
        }
        else if ( coach.isWord("all") ) {
            coach.expectWord("all");
            data.type = "all";
        }
        else {
            coach.expectWord("some");
            data.type = "some";
        }

        coach.expect("(");
        coach.skipSpace();
        
        if ( coach.is(Select) ) {
            data.select = coach.parse(Select);
        } else {
            data.array = coach.parse(Expression);
        }
        
        coach.skipSpace();
        coach.expect(")");
    }
    
    is(coach: GrapeQLCoach) {
        const isKeyword = (
            coach.isWord("any") ||
            coach.isWord("all") ||
            coach.isWord("some")
        );
            
        if ( !isKeyword ) {
            return false;
        }

        const i = coach.i;
        coach.readWord();
        coach.skipSpace();

        const isBracket = coach.is("(");
        coach.i = i;
        
        return isKeyword && isBracket;
    }
    
    toString() {
        if ( this.data.select ) {
            return `${this.data.type} (${ this.data.select })`;
        } else {
            return `${this.data.type} (${ this.data.array })`;
        }
    }
}
