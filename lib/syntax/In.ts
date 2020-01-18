

import {Syntax, Types} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";

export default class In extends Syntax<In> {
    structure() {
        const Expression = this.syntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        const Select = this.syntax.Select as GrapeQLCoach["syntax"]["Select"];

        return {
            inSelect: Select,
            inItems: Types.Array({
                element: Expression
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = this.syntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        const Select = this.syntax.Select as GrapeQLCoach["syntax"]["Select"];

        coach.expectWord("in");
        
        coach.expect("(");
        coach.skipSpace();
        
        if ( coach.is(Select) ) {
            data.inSelect = coach.parse(Select);
        } else {
            data.inItems = coach.parseComma(Expression);
        }
        
        
        coach.skipSpace();
        coach.expect(")");
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("in");
    }
    
    toString() {
        if ( this.data.inItems ) {
            return `in (${ this.data.inItems.join(", ") })`;
        } else {
            return `in (${ this.data.inSelect })`;
        }
    }
}

