"use strict";

const {Syntax} = require("lang-coach");
const CaseWhenElement = require("./CaseWhenElement");

class CaseWhen extends Syntax {
    static structure() {
        const Expression = CaseWhenElement.prototype.Coach.Expression;

        return {
            case: [CaseWhenElement],
            else: Expression
        };
    }

    static parse(coach, data) {
        
        coach.expectWord("case");
        
        data.case = [];
        CaseWhen.parseElement(coach, data);
        
        coach.skipSpace();
        if ( coach.isWord("else") ) {
            coach.expectWord("else");
            
            data.else = coach.parseExpression();
            
            coach.skipSpace();
        }
        
        coach.expectWord("end");
    }
    
    static parseElement(coach, data) {
        let elem = coach.parseCaseWhenElement();
        data.case.push(elem);
        
        coach.skipSpace();
        if ( coach.isCaseWhenElement() ) {
            CaseWhen.parseElement(coach, data);
        }
    }
    
    static is(coach) {
        return coach.isWord("case");
    }
    
    toString() {
        let out = "case ";
        
        let cases = this.data.case.map(elem => elem.toString()).join(" ");
        out += cases;
        
        if ( this.data.else ) {
            out += " else ";
            out += this.data.else.toString();
        }
        
        out += " end";
        return out;
    }
}

module.exports = CaseWhen;