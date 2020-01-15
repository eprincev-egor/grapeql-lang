"use strict";

import {Syntax} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";

export default class Exists extends Syntax<Exists> {
    structure() {
        const Select = this.syntax.Select as GrapeQLCoach["syntax"]["Select"];
        
        return {
            exists: Select
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Select = this.syntax.Select as GrapeQLCoach["syntax"]["Select"];

        coach.expectWord("exists");
        
        coach.expect("(");
        coach.skipSpace();
        
        data.exists = coach.parse(Select);
        
        coach.skipSpace();
        coach.expect(")");
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("exists");
    }
    
    toString() {
        return `exists( ${ this.data.exists } )`;
    }
}

