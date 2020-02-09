

import {Syntax} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import allSyntax from "../allSyntax";

export default class Cast extends Syntax<Cast> {
    structure() {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        const DataType = allSyntax.DataType as GrapeQLCoach["syntax"]["DataType"];

        return {
            expression: Expression,
            cast: DataType
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        const DataType = allSyntax.DataType as GrapeQLCoach["syntax"]["DataType"];
        
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
        return `cast(${ this.row.expression } as ${ this.row.cast })`;
    }
}


