"use strict";

import {Syntax, Types} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";

// 42
// 3.5
// 4.
// .001
// 5e2
// 1.925e-3

export default class PgNumber extends Syntax<PgNumber> {
    structure() {
        return {
            number: Types.String
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        let intPart = "";
        let floatPart = "";
        let ePart = "";
        
        intPart = this.readDigits( coach );
        if ( coach.is(".") ) {
            coach.i++;
            floatPart = this.readDigits( coach );
        }
        
        if ( coach.is("e") || coach.is("E") ) {
            coach.i++;
            
            if ( coach.is("+") || coach.is("-") ) {
                ePart = coach.str[ coach.i ];
                coach.i++;
            }
            
            ePart += this.readDigits( coach );
        }
        
        
        if ( floatPart ) {
            data.number = intPart + "." + floatPart;
        } else {
            data.number = intPart;
        }
        
        if ( ePart ) {
            data.number += "e" + ePart;
        }
    }
    
    readDigits(coach) {
        let digits = "";
        for (; coach.i < coach.n; coach.i++) {
            const symbol = coach.str[ coach.i ];
            
            if ( /\d/.test(symbol) ) {
                digits += symbol;
            } else {
                break;
            }
        }
        return digits;
    }
    
    is(coach: GrapeQLCoach, str: string) {
        return str.search(/[\d.]/) === 0;
    }
    
    toString() {
        return this.data.number;
    }
}


