
import {Syntax, Types} from "lang-coach";
import {ObjectName} from "./ObjectName";
import {SchemaName} from "./SchemaName";
import {PgNumber} from "./PgNumber";
import {GrapeQLCoach} from "../GrapeQLCoach";

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
    "void",
    "record",
    "anyarray",
    "anyelement",
    "float"
];

const firstWords: any = {};
types.forEach((type) => {
    let firstWord = type.split(" ")[0];
    firstWord = firstWord.split("(")[0];
    
    if ( !firstWords[firstWord] ) {
        firstWords[firstWord] = [];
    }
    firstWords[ firstWord ].push( type );
});

const regExps: any = {};
types.forEach((type) => {
    let regExp = type.replace(/ /g, "\\s+");
    regExp = regExp.replace("(n)", "\\s*\\(\\s*\\d+\\s*\\)");
    regExp = regExp.replace("(n,n)", "\\s*\\(\\s*\\d+\\s*,\\s*\\d+\\s*\\)");
    
    regExps[ type ] = new RegExp(regExp, "i");
});

export class DataType extends Syntax<DataType> {
    structure() {
        return {
            type: Types.String
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const position = coach.i;
        const word = coach.readWord().toLowerCase();
        const availableTypes = firstWords[ word ] || [];
        
        coach.i = position;
        
        
        for (let i = 0, n = availableTypes.length; i < n; i++) {
            const availableType = availableTypes[ i ];
            const regExp = regExps[ availableType ];
            
            if ( coach.is(regExp) ) {
                data.type = regExp.exec( coach.str.slice(coach.i) )[0];
                coach.i += data.type!.length;
                
                data.type = data.type!.replace(/\s+/g, " ");
                data.type = data.type.replace(/\s*\(\s*/g, "(");
                data.type = data.type.replace(/\s*\)\s*/g, ")");
                data.type = data.type.replace(/\s*,\s*/g, ",");
                data.type = data.type.toLowerCase();
                break;
            }
        }
        
        if ( !data.type ) {
            const schemaName = coach.parse(SchemaName);

            if ( schemaName.toString() === "public.char" ) {
                data.type = "\"char\"";
            }
            else {
                data.type = schemaName.toString();
            }
        }
        
        this.parseArrayType(coach, data);
    }
    
    parseArrayType(coach: GrapeQLCoach, data: any) {
        if ( coach.is(/\s*\[/) ) {
            coach.skipSpace();
            coach.i++;
            coach.skipSpace();
            
            if ( coach.is("]") ) {
                coach.i++;
                data.type += "[]";
            } else {
                const pgNumb = coach.parse(PgNumber);
                coach.skipSpace();
                coach.expect("]");
                
                data.type += "[" + pgNumb.get("number") + "]";
            }
        }
        
        if ( coach.is(/\s*\[/) ) {
            this.parseArrayType(coach, data);
        }
    }

    isNumber(): boolean {
        // https://www.postgresql.org/docs/9.1/datatype-numeric.html
        const type = this.row.type;
        return (
            type === "real"              ||
            type === "decimal"           ||
            type === "smallint"          ||
            type === "integer"           ||
            type === "biginteger"        ||
            type === "smallserial"       ||
            type === "serial"            ||
            type === "double precision"  ||
            type === "bigserial"         ||
            /^numeric/.test(this.row.type!)
        );
    }

    isInteger(): boolean {
        const type = this.row.type;
        return (
            type === "smallint"    ||
            type === "integer"     ||
            type === "biginteger"  ||
            type === "smallserial" ||
            type === "serial"      ||
            type === "bigserial"
        );
    }

    isSerial(): boolean {
        const type = this.row.type;
        return (
            type === "smallserial" ||
            type === "serial"      ||
            type === "bigserial"
        );
    }

    isText() {
        // https://www.postgresql.org/docs/9.1/datatype-character.html
        const type = this.row.type;
        return (
            type === "text" ||
            /^char/.test(this.row.type!) ||
            /^character/.test(this.row.type!) ||
            /^varchar/.test(this.row.type!)
        );
    }

    isBoolean() {
        return this.row.type === "boolean";
    }

    is(coach: GrapeQLCoach) {
        return coach.is(ObjectName);
    }
    
    toString() {
        return this.row.type!;
    }
}


