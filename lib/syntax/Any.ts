"use strict";

import {Syntax, Types} from "lang-coach";
import ISyntaxes from "./ISyntaxes";
import GrapeQLCoach from "../GrapeQLCoach";

export default class Any extends Syntax<Any> {
    structure() {
        const Expression = this.syntax.Expression as any as ISyntaxes["Expression"];
        const Select = this.syntax.Select as any as ISyntaxes["Select"];

        return {
            type: Types.String({
                enum: ["any", "all", "some"]
            }),
            array: Expression,
            select: Select
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
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
        
        if ( coach.isSelect() ) {
            data.select = coach.parseSelect();
        } else {
            data.array = coach.parseExpression();
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
