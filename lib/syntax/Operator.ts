"use strict";

import {Syntax} from "lang-coach";

const OPERATORS = [
    "=","<>","!=","<",">","<=",">=","||","!","!!","%","@","-","<<","&<","&>",">>",
    "<@","@>","~=","&&",">^","<^","@@","*","<->","/","+","#=","#<>","#<","#>",
    "#<=","#>=","<?>","|/","||/","|","<#>","~","!~","#","?#","@-@","?-","?|","^",
    "~~","!~~","~*","!~*","|>>","<<|","?||","?-|","##","&","<<=",">>=","~~*",
    "!~~*","~<~","~<=~","~>=~","~>~","&<|","|&>","@@@","*=","*<>","*<","*>","*<=",
    "*>=","-|-","->","->>","#>>","?","?&","#-", "::"
];
const OPERATORS_SYMBOLS = (
    OPERATORS
        .join("")
        .split("")
        .reduce((total, symbol) => {

            if ( !total.includes(symbol) ) {
                total += symbol;
            }

            return total;
        }, "")
);

const OPERATORS_MAP = {};
OPERATORS.forEach(operator => {
    for (let i = 0, n = operator.length; i < n; i++) {
        let sequence = operator.slice(0, i + 1);
        OPERATORS_MAP[ sequence ] = true;
    }
});

const CONDITION_OPERATORS = [
    "and",
    "or",
    "not",
    "isnull",
    "notnull",
    "like",
    "ilike"
];

export default class Operator extends Syntax<Operator> {
    structure() {
        return {
            operator: "string"
        };
    }

    parse(coach, data) {
        
        if ( coach.isWord("operator") ) {
            coach.readWord();
            
            coach.expect("(");
            coach.skipSpace();

            let link = coach.read(/[^)]+/);
            link = link && link.trim();
            
            if ( !link ) {
                coach.throwError("invalid operator");
            }
            data.operator = "operator(" + link + ")";
            coach.skipSpace();
            coach.expect(")");
            return;
        }
        
        // check condition operators
        coach.checkpoint();
        let word = coach.readWord();
        
        if ( CONDITION_OPERATORS.includes(word) ) {
            data.operator = word;
        }
        
        // is
        // is not
        // is not distinct from
        // is not unknown
        // is distinct from
        // is unknown
        else if ( word == "is" ) {
            data.operator = "is";
            
            if ( coach.isWord("not") ) {
                coach.expectWord("not");
                
                data.operator += " not";
            }
            
            if ( coach.isWord("distinct") ) {
                coach.expectWord("distinct");
                
                coach.expectWord("from");
                
                data.operator += " distinct from";
            }
            else if ( coach.isWord("unknown") ) {
                coach.expectWord("unknown");
                
                data.operator += " unknown";
            }
        }
        
        // similar to
        else if ( word == "similar" ) {
            coach.expectWord("to");
            
            data.operator = "similar to";
        }
        
        // another
        else {
            coach.rollback();
            
            data.operator = "";

            for (; coach.i < coach.n; coach.i++) {
                let symbol = coach.str[ coach.i ];
                
                let sequence = data.operator + symbol;
                let existsSimilarSequence = sequence in OPERATORS_MAP;

                if ( existsSimilarSequence ) {
                    data.operator += symbol;
                } else {
                    break;
                }
            }
        }
    }
    
    is(coach, str) {
        return (
            (
                OPERATORS_SYMBOLS.includes( str[0] ) ||
                coach.isWord("operator") ||
                coach.isWord("and") ||
                coach.isWord("or") ||
                coach.isWord("not") ||
                coach.isWord("is") ||
                coach.isWord("ilike") ||
                coach.isWord("like") ||
                coach.isWord("similar") ||
                coach.isWord("notnull") ||
                coach.isWord("isnull") 
            ) && 
            !(str[0] == "-" && str[1] == "-") && // -- comment
            !(str[0] == "/" && str[1] == "*") // /* comment
        ); 
    }
    
    toString() {
        return this.data.operator;
    }
}


