
import {Syntax, Types} from "lang-coach";
import {CaseWhenElement} from "./CaseWhenElement";
import {GrapeQLCoach} from "../GrapeQLCoach";
import allSyntax from "../allSyntax";

export class CaseWhen extends Syntax<CaseWhen> {
    structure() {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        return {
            value: Expression,
            case: Types.Array({
                element: CaseWhenElement
            }),
            else: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        
        coach.expectWord("case");
        
        data.case = [];
        if ( !coach.is(CaseWhenElement) && coach.is(Expression) ) {
            data.value = coach.parse(Expression);
        }

        this.parseElement(coach, data);
        
        coach.skipSpace();
        if ( coach.isWord("else") ) {
            coach.expectWord("else");
            
            data.else = coach.parse(Expression);
            
            coach.skipSpace();
        }
        
        coach.expectWord("end");
    }
    
    parseElement(coach: GrapeQLCoach, data: this["TInputData"]) {
        const elem = coach.parse(CaseWhenElement);
        data.case!.push(elem);
        
        coach.skipSpace();
        if ( coach.is(CaseWhenElement) ) {
            this.parseElement(coach, data);
        }
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("case");
    }
    
    toString() {
        let out = "case ";

        if ( this.row.value ) {
            out += this.row.value.toString();
            out += " ";
        }
        
        const cases = this.row.case!.map((elem) => elem.toString()).join(" ");
        out += cases;
        
        if ( this.row.else ) {
            out += " else ";
            out += this.row.else.toString();
        }
        
        out += " end";
        return out;
    }
}
