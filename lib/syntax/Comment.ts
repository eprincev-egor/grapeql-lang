"use strict";

import {Syntax, Types} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";

export default class Comment extends Syntax<Comment> {
    structure() {
        return {
            isLine: Types.Boolean({
                default: false
            }),
            isMulti: Types.Boolean({
                default: false
            }),
            content: Types.String
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        let content = "";
        
        if ( coach.is("-") ) {
            coach.expect("--");
            
            data.isLine = true;
            
            for (; coach.i < coach.n; coach.i++) {
                const symbol = coach.str[ coach.i ];
                
                if ( /[\n\r]/.test(symbol) ) {
                    break;
                }
                
                content += symbol;
            }
        } else {
            coach.expect("/*");
            
            data.isMulti = true;
            
            for (; coach.i < coach.n; coach.i++) {
                const symbol = coach.str[ coach.i ];
                
                if ( symbol === "*" && coach.str[ coach.i + 1 ] === "/" ) {
                    coach.i += 2;
                    break;
                }
                
                content += symbol;
            }
        }
        
        data.content = content;
    }
    
    is(coach: GrapeQLCoach, str: string) {
        return (
            str[0] === "-" && str[1] === "-" ||
            str[0] === "/" && str[1] === "*"
        );
    }
    
    toString() {
        if ( this.data.isMulti ) {
            return "/*" + this.data.content + "*/";
        }
        else {
            return "--" + this.data.content;
        }
    }
}


