"use strict";

import {Syntax} from "lang-coach";
import ISyntaxes from "./ISyntaxes";

export default class Substring extends Syntax<Substring> {
    structure() {
        const Expression = this.syntax.Expression as any as ISyntaxes["Expression"];

        return {
            str: Expression,
            from: Expression,
            for: Expression
        };
    }

    parse(coach, data) {
        coach.expectWord("substring");
        
        coach.expect("(");
        coach.skipSpace();

        data.str = coach.parseExpression();
        
        if ( coach.isWord("from") ) {
            coach.expectWord("from");
            
            data.from = coach.parseExpression();
        }

        if ( coach.isWord("for") ) {
            coach.expectWord("for");
            
            data.for = coach.parseExpression();
        }

        coach.expect(")");
    }
    
    is(coach) {
        return coach.is(/^substring\s*\(/i);
    }
    
    toString() {
        let out = "substring(";

        out += this.data.str.toString();

        if ( this.data.from ) {
            out += " from ";
            out += this.data.from.toString();
        }

        if ( this.data.for ) {
            out += " for ";
            out += this.data.for.toString();
        }

        out += ")";
        return out;
    }
}

