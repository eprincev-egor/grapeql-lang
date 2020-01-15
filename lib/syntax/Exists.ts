"use strict";

import {Syntax} from "lang-coach";
import ISyntaxes from "./ISyntaxes";
import GrapeQLCoach from "../GrapeQLCoach";

export default class Exists extends Syntax<Exists> {
    structure() {
        const Select = this.syntax.Select as any as ISyntaxes["Select"];
        
        return {
            exists: Select
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("exists");
        
        coach.expect("(");
        coach.skipSpace();
        
        data.exists = coach.parseSelect();
        
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

