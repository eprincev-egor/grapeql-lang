"use strict";

import {Syntax, Types} from "lang-coach";
import Operator from "./Operator";
import ISyntaxes from "./ISyntaxes";
import GrapeQLCoach from "../GrapeQLCoach";

export default class OrderByElement extends Syntax<OrderByElement> {
    structure() {
        const Expression = this.syntax.Expression as any as ISyntaxes["Expression"];

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
        data.expression = coach.parseExpression();
        
        data.vector = "asc";
        if ( coach.is(/asc|desc/i) ) {
            data.vector = coach.readWord();
        } 
        else if ( coach.isWord("using") ) {
            coach.expectWord("using");
            
            data.using = coach.parseOperator();
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
        return coach.isExpression();
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

