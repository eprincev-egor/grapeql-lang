
import {Syntax, Types} from "lang-coach";
import {IBooleanType, IArrayType} from "model-layer";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {GroupByElementContent} from "./GroupByElementContent";
import {Expression} from "./Expression";

/*
    ()
    expression
    ROLLUP ( { expression | ( expression [, ...] ) } [, ...] )
    CUBE ( { expression | ( expression [, ...] ) } [, ...] )
    GROUPING SETS ( grouping_element [, ...] )
 */
export class GroupByElement extends Syntax<GroupByElement> {
    structure(): {
        isEmpty: IBooleanType;
        rollup: IArrayType<GroupByElementContent>;
        cube: IArrayType<GroupByElementContent>;
        groupingSets: IArrayType<GroupByElement>;
        expression: typeof Expression;
    } {
        return {
            isEmpty: Types.Boolean,
            rollup: Types.Array({
                element: GroupByElementContent
            }),
            cube: Types.Array({
                element: GroupByElementContent
            }),
            groupingSets: Types.Array({
                element: GroupByElement
            }),
            expression: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        
        if ( coach.is(/\(\s*\)/) ) {
            coach.expect(/\(\s*\)/);
            data.isEmpty = true;
        }
        
        else if ( coach.isWord("rollup") ) {

            // istanbul error here (else path not taken):
            /* istanbul ignore next */
            coach.expectWord("rollup");
            
            coach.expect("(");
            coach.skipSpace();
            
            data.rollup = coach.parseComma(GroupByElementContent);
            
            coach.skipSpace();
            coach.expect(")");
        } 
        
        else if ( coach.isWord("cube") ) {
            coach.expectWord("cube");
            
            coach.expect("(");
            coach.skipSpace();
            
            data.cube = coach.parseComma(GroupByElementContent);
            
            coach.skipSpace();
            coach.expect(")");
        } 
        
        else if ( coach.isWord("grouping") ) {
            coach.expectWord("grouping");
            coach.expectWord("sets");
            
            
            coach.expect("(");
            coach.skipSpace();
            
            data.groupingSets = coach.parseComma(GroupByElement);
            
            coach.skipSpace();
            coach.expect(")");
        } 
        
        else {
            data.expression = coach.parse(Expression);
        }
    }
    
    is(coach: GrapeQLCoach) {
        return (
            coach.isWord("rollup") ||
            coach.isWord("cube") ||
            coach.isWord("grouping") ||
            coach.is(Expression)
        );
    }
    
    toString() {
        const data = this.row;

        if ( data.isEmpty ) {
            return "()";
        }
        
        let out = "";
        if ( data.rollup ) {
            out += "rollup (" + data.rollup.map((item) => item.toString()).join(", ") + ")";
        }
        else if ( data.cube ) {
            out += "cube (" + data.cube.map((item) => item.toString()).join(", ") + ")";
        }
        else if ( data.groupingSets ) {
            out += "grouping sets (";
            out += data.groupingSets.map((set) => set.toString()).join(", ");
            out += ")";
        }
        else {
            out += data.expression!.toString();
        }
        
        return out;
    }
}

