
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import allSyntax from "../allSyntax";
import {Operator} from "./Operator";

export class OrderByElement extends Syntax<OrderByElement> {
    structure() {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

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
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        data.expression = coach.parse(Expression);
        
        data.vector = "asc";
        if ( coach.is(/asc|desc/i) ) {
            data.vector = coach.readWord();
        } 
        else if ( coach.isWord("using") ) {
            coach.expectWord("using");
            
            data.using = coach.parse(Operator);
            data.vector = null as any;
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
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        return coach.is(Expression);
    }
    
    toString() {
        let out = this.row.expression!.toString();
        
        if ( this.row.vector ) {
            // asc or desc
            out += " " + this.row.vector;
        } 
        else {
            out += " using " + this.row.using!.toString();
        }
        
        if ( this.row.nulls ) {
            out += " nulls " + this.row.nulls;
        }
        
        return out;
    }
}

