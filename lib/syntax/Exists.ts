"use strict";

import {Syntax} from "lang-coach";

export default class Exists extends Syntax<Exists> {
    structure() {
        const Select = Exists.prototype.Coach.Select;
        
        return {
            exists: Select
        };
    }

    parse(coach, data) {
        coach.expectWord("exists");
        
        coach.expect("(");
        coach.skipSpace();
        
        data.exists = coach.parseSelect();
        
        coach.skipSpace();
        coach.expect(")");
    }
    
    is(coach) {
        return coach.isWord("exists");
    }
    
    toString() {
        return `exists( ${ this.data.exists } )`;
    }
}

