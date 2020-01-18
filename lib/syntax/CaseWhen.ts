

import {Syntax, Types} from "lang-coach";
import CaseWhenElement from "./CaseWhenElement";
import GrapeQLCoach from "../GrapeQLCoach";

export default class CaseWhen extends Syntax<CaseWhen> {
    structure() {
        const Expression = this.syntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        return {
            case: Types.Array({
                element: CaseWhenElement
            }),
            else: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = this.syntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        
        coach.expectWord("case");
        
        data.case = [];
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
        data.case.push(elem);
        
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
        
        const cases = this.data.case.map((elem) => elem.toString()).join(" ");
        out += cases;
        
        if ( this.data.else ) {
            out += " else ";
            out += this.data.else.toString();
        }
        
        out += " end";
        return out;
    }
}
