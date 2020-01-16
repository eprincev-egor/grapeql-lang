"use strict";

import {Syntax} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";

export default class Cast extends Syntax<Cast> {
    structure() {
        const Expression = this.syntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        const DataType = this.syntax.DataType as GrapeQLCoach["syntax"]["DataType"];

        return {
            expression: Expression,
            cast: DataType
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = this.syntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        const DataType = this.syntax.DataType as GrapeQLCoach["syntax"]["DataType"];
        
        coach.expectWord("cast");

        coach.expect("(");
        coach.skipSpace();
        
        data.expression = coach.parse(Expression);
        
        coach.expectWord("as");
        
        data.cast = coach.parse(DataType);
        
        coach.skipSpace();
        coach.expect(")");
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("cast");
    }
    
    toString() {
        return `cast(${ this.data.expression } as ${ this.data.cast })`;
    }
}


