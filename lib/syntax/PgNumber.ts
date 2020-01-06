"use strict";

import {Syntax} from "lang-coach";

// 42
// 3.5
// 4.
// .001
// 5e2
// 1.925e-3

export default class PgNumber extends Syntax<PgNumber> {
    structure() {
        return {
            number: "string"
        };
    }

    parse(coach, data) {
        let intPart = "";
        let floatPart = "";
        let ePart = "";
        
        intPart = PgNumber.readDigits( coach );
        if ( coach.is(".") ) {
            coach.i++;
            floatPart = PgNumber.readDigits( coach );
        }
        
        if ( coach.is("e") || coach.is("E") ) {
            coach.i++;
            
            if ( coach.is("+") || coach.is("-") ) {
                ePart = coach.str[ coach.i ];
                coach.i++;
            }
            
            ePart += PgNumber.readDigits( coach );
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
    
    static readDigits(coach) {
        let digits = "";
        for (; coach.i < coach.n; coach.i++) {
            let symbol = coach.str[ coach.i ];
            
            if ( /\d/.test(symbol) ) {
                digits += symbol;
            } else {
                break;
            }
        }
        return digits;
    }
    
    is(coach, str) {
        return str.search(/[\d.]/) === 0;
    }
    
    toString() {
        return this.data.number;
    }
}


