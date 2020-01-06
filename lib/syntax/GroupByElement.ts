"use strict";

import {Syntax} from "lang-coach";
import GroupByElementContent from "./GroupByElementContent";
import Expression from "./Expression";

/*
    ()
    expression
    ROLLUP ( { expression | ( expression [, ...] ) } [, ...] )
    CUBE ( { expression | ( expression [, ...] ) } [, ...] )
    GROUPING SETS ( grouping_element [, ...] )
 */
export default class GroupByElement extends Syntax<GroupByElement> {
    structure() {
        return {
            isEmpty: "boolean",
            rollup: [GroupByElementContent],
            cube: [GroupByElementContent],
            groupingSets: [GroupByElement],
            expression: Expression
        };
    }

    parse(coach, data) {
        
        if ( coach.is(/\(\s*\)/) ) {
            coach.expect(/\(\s*\)/);
            data.isEmpty = true;
        }
        
        else if ( coach.isWord("rollup") ) {
            coach.expectWord("rollup");
            
            coach.expect("(");
            coach.skipSpace();
            
            data.rollup = coach.parseComma("GroupByElementContent");
            
            coach.skipSpace();
            coach.expect(")");
        } 
        
        else if ( coach.isWord("cube") ) {
            coach.expectWord("cube");
            
            coach.expect("(");
            coach.skipSpace();
            
            data.cube = coach.parseComma("GroupByElementContent");
            
            coach.skipSpace();
            coach.expect(")");
        } 
        
        else if ( coach.isWord("grouping") ) {
            coach.expectWord("grouping");
            coach.expectWord("sets");
            
            
            coach.expect("(");
            coach.skipSpace();
            
            data.groupingSets = coach.parseComma("GroupByElement");
            
            coach.skipSpace();
            coach.expect(")");
        } 
        
        else {
            data.expression = coach.parseExpression();
        }
    }
    
    is(coach) {
        return (
            coach.isWord("rollup") ||
            coach.isWord("cube") ||
            coach.isWord("grouping") ||
            coach.isExpression()
        );
    }
    
    toString() {
        let data = this.data;

        if ( data.isEmpty ) {
            return "()";
        }
        
        let out = "";
        if ( data.rollup ) {
            out += "rollup (" + data.rollup.map(item => item.toString()).join(", ") + ")";
        }
        else if ( data.cube ) {
            out += "cube (" + data.cube.map(item => item.toString()).join(", ") + ")";
        }
        else if ( data.groupingSets ) {
            out += "grouping sets (";
            out += data.groupingSets.map(set => set.toString()).join(", ");
            out += ")";
        }
        else {
            out += data.expression.toString();
        }
        
        return out;
    }
}

