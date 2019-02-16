"use strict";

const {Syntax} = require("lang-coach");

// TODO: load types from db
const types = [
    "smallint",
    "integer",
    "bigint",
    "decimal",
    "numeric(n)",
    "numeric(n,n)",
    "real",
    "double precision",
    "smallserial",
    "serial",
    "bigserial",
    "money",
    "character varying(n)",
    "varchar(n)",
    "character(n)",
    "char(n)",
    "text",
    "\"char\"",
    "name",
    "bytea",
    // don't touch order ! see 'posibleTypes' checks
    "timestamp without time zone",
    "timestamp with time zone",
    "timestamp",
    "time without time zone",
    "time with time zone",
    // ...
    "boolean",
    "point",
    "line",
    "lseg",
    "box",
    "path",
    "polygon",
    "path",
    "circle",
    "cidr",
    "inet",
    "macaddr",
    "macaddr8",
    "bit(n)",
    "bit varying(n)",
    "tsvector",
    "tsquery",
    "uuid",
    "xml",
    "json",
    "jsonb",
    "int",
    "int4range",
    "int8range",
    "numrange",
    "tsrange",
    "tstzrange",
    "daterange",
    "regclass",
    "regproc",
    "regprocedure",
    "regoper",
    "regoperator",
    "regclass",
    "regtype",
    "regrole",
    "regnamespace",
    "regconfig",
    "regdictionary",
    "date"
];

let firstWords = {};
types.forEach(type => {
    let firstWord = type.split(" ")[0];
    firstWord = firstWord.split("(")[0];
    
    if ( !firstWords[firstWord] ) {
        firstWords[firstWord] = [];
    }
    firstWords[ firstWord ].push( type );
});

let regExps = {};
types.forEach(type => {
    let regExp = type.replace(/ /g, "\\s+");
    regExp = regExp.replace("(n)", "\\s*\\(\\s*\\d+\\s*\\)");
    regExp = regExp.replace("(n,n)", "\\s*\\(\\s*\\d+\\s*,\\s*\\d+\\s*\\)");
    
    regExps[ type ] = new RegExp(regExp, "i");
});

class DataType extends Syntax {
    static structure() {
        return {
            type: "string"
        };
    }

    static parse(coach, data) {
        if ( coach.is("\"") ) {
            coach.i++;
            coach.expectWord("char");
            coach.expect("\"");
            data.type = "\"char\"";
            return;
        }
        
        coach.checkpoint();
        let word = coach.readWord().toLowerCase();
        let availableTypes = firstWords[ word ];
        
        coach.rollback();
        if ( !availableTypes ) {
            coach.throwError("unknown data type: " + word);
        }
        
        for (let i = 0, n = availableTypes.length; i < n; i++) {
            let availableType = availableTypes[ i ];
            let regExp = regExps[ availableType ];
            
            if ( coach.is(regExp) ) {
                data.type = regExp.exec( coach.str.slice(coach.i) )[0];
                coach.i += data.type.length;
                
                data.type = data.type.replace(/\s+/g, " ");
                data.type = data.type.replace(/\s*\(\s*/g, "(");
                data.type = data.type.replace(/\s*\)\s*/g, ")");
                data.type = data.type.replace(/\s*,\s*/g, ",");
                data.type = data.type.toLowerCase();
                break;
            }
        }
        
        if ( !data.type ) {
            if ( word == "numeric" ) {
                data.type = "numeric";
                coach.i += data.type.length;
            } else {
                coach.throwError("unknown data type: " + word);
            }
        }
        
        DataType.parseArrayType(coach, data);
    }
    
    static parseArrayType(coach, data) {
        if ( coach.is(/\s*\[/) ) {
            coach.skipSpace();
            coach.i++;
            coach.skipSpace();
            
            if ( coach.is("]") ) {
                coach.i++;
                data.type += "[]";
            } else {
                let pgNumb = coach.parsePgNumber();
                coach.skipSpace();
                coach.expect("]");
                
                data.type += "[" + pgNumb.get("number") + "]";
            }
        }
        
        if ( coach.is(/\s*\[/) ) {
            DataType.parseArrayType(coach, data);
        }
    }
    
    static is(coach) {
        if ( coach.is(/"char"/) ) {
            return true;
        }

        coach.checkpoint();
        let word = coach.readWord().toLowerCase();
        coach.rollback();
        return word in firstWords;
    }
    
    toString() {
        return this.data.type;
    }
}

module.exports = DataType;
