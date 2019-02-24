"use strict";

const {Syntax} = require("lang-coach");

class Exists extends Syntax {
    static structure() {
        const Select = Exists.prototype.Coach.Select;
        
        return {
            exists: Select
        };
    }

    static parse(coach, data) {
        coach.expectWord("exists");
        
        coach.expect("(");
        coach.skipSpace();
        
        data.exists = coach.parseSelect();
        
        coach.skipSpace();
        coach.expect(")");
    }
    
    static is(coach) {
        return coach.isWord("exists");
    }
    
    toString() {
        return `exists( ${ this.data.exists } )`;
    }
}

module.exports = Exists;