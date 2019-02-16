"use strict";

const {Syntax} = require("lang-coach");

class Cast extends Syntax {
    static structure() {
        const Coach = Cast.prototype.Coach;

        return {
            expression: Coach.Expression,
            cast: Coach.DataType
        };
    }

    static parse(coach, data) {
        coach.expectWord("cast");

        coach.expect("(");
        coach.skipSpace();
        
        data.expression = coach.parseExpression();
        
        coach.expectWord("as");
        
        data.cast = coach.parseDataType();
        
        coach.skipSpace();
        coach.expect(")");
    }
    
    static is(coach) {
        return coach.isWord("cast");
    }
    
    toString() {
        return `cast(${ this.data.expression } as ${ this.data.cast })`;
    }
}

module.exports = Cast;
