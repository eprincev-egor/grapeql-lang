"use strict";

import {Syntax, Types} from "lang-coach";
import Operator from "./Operator";
import GrapeQLCoach from "../GrapeQLCoach";

export default class OrderByElement extends Syntax<OrderByElement> {
    structure() {
        const Expression = this.syntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        return {
            expression: Expression,
            vector: Types.String({
                enum: ["asc", "desc"]
            }),
            using: Operator,
            nulls: Types.String({
                enum: ["first", "last"]
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = this.syntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        data.expression = coach.parse(Expression);
        
        data.vector = "asc";
        if ( coach.is(/asc|desc/i) ) {
            data.vector = coach.readWord();
        } 
        else if ( coach.isWord("using") ) {
            coach.expectWord("using");
            
            data.using = coach.parse(Operator);
            data.vector = null;
        }
        
        if ( coach.isWord("nulls") ) {
            coach.expectWord("nulls");
            
            if ( coach.isWord("first") ) {
                coach.expectWord("first");
                data.nulls = "first";
            } 
            else {
                coach.expectWord("last");
                data.nulls = "last";
            }
        }
    }
    
    is(coach: GrapeQLCoach) {
        const Expression = this.syntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        return coach.is(Expression);
    }
    
    toString() {
        let out = this.data.expression.toString();
        
        if ( this.data.vector ) {
            // asc or desc
            out += " " + this.data.vector;
        } 
        else {
            out += " using " + this.data.using.toString();
        }
        
        if ( this.data.nulls ) {
            out += " nulls " + this.data.nulls;
        }
        
        return out;
    }
}

