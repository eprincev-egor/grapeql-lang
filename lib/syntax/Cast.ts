"use strict";

import {Syntax} from "lang-coach";
import ISyntaxes from "./ISyntaxes";
import GrapeQLCoach from "../GrapeQLCoach";

export default class Cast extends Syntax<Cast> {
    structure() {
        const Expression = this.syntax.Expression as any as ISyntaxes["Expression"];
        const DataType = this.syntax.Expression as any as ISyntaxes["DataType"];

        return {
            expression: Expression,
            cast: DataType
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("cast");

        coach.expect("(");
        coach.skipSpace();
        
        data.expression = coach.parseExpression();
        
        coach.expectWord("as");
        
        data.cast = coach.parseDataType();
        
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


