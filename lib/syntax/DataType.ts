"use strict";

import {Syntax, Types} from "lang-coach";
import ObjectName from "./ObjectName";

// TODO: load types from db
const types = [
    "smallint",
    "integer",
    "bigint",
    "decimal",
    "numeric(n)",
    "numeric(n,n)",
    "numeric",
    "real",
    "double precision",
    "smallserial",
    "serial",
    "bigserial",
    "money",
    "character varying(n)",
    "character varying",
    "varchar(n)",
    "varchar",
    "character(n)",
    "character",
    "char(n)",
    "char",
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
    "bit varying",
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
    "date",
    "trigger",
    "void"
];

const firstWords = {};
types.forEach((type) => {
    let firstWord = type.split(" ")[0];
    firstWord = firstWord.split("(")[0];
    
    if ( !firstWords[firstWord] ) {
        firstWords[firstWord] = [];
    }
    firstWords[ firstWord ].push( type );
});

const regExps = {};
types.forEach((type) => {
    let regExp = type.replace(/ /g, "\\s+");
    regExp = regExp.replace("(n)", "\\s*\\(\\s*\\d+\\s*\\)");
    regExp = regExp.replace("(n,n)", "\\s*\\(\\s*\\d+\\s*,\\s*\\d+\\s*\\)");
    
    regExps[ type ] = new RegExp(regExp, "i");
});

export default class DataType extends Syntax<DataType> {
    structure() {
        return {
            type: Types.String
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.is("\"") ) {
            coach.i++;
            coach.expectWord("char");
            coach.expect("\"");
            data.type = "\"char\"";
            return;
        }
        
        coach.checkpoint();
        const word = coach.readWord().toLowerCase();
        const availableTypes = firstWords[ word ] || [];
        
        coach.rollback();
        
        
        for (let i = 0, n = availableTypes.length; i < n; i++) {
            const availableType = availableTypes[ i ];
            const regExp = regExps[ availableType ];
            
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
            const schemaName = coach.parseSchemaName();
            data.type = schemaName.toString();
        }
        
        this.parseArrayType(coach, data);
    }
    
    parseArrayType(coach, data) {
        if ( coach.is(/\s*\[/) ) {
            coach.skipSpace();
            coach.i++;
            coach.skipSpace();
            
            if ( coach.is("]") ) {
                coach.i++;
                data.type += "[]";
            } else {
                const pgNumb = coach.parsePgNumber();
                coach.skipSpace();
                coach.expect("]");
                
                data.type += "[" + pgNumb.get("number") + "]";
            }
        }
        
        if ( coach.is(/\s*\[/) ) {
            this.parseArrayType(coach, data);
        }
    }
    
    is(coach: GrapeQLCoach) {
        return coach.is(ObjectName);
    }
    
    toString() {
        return this.data.type;
    }
}


