"use strict";

const {Syntax} = require("lang-coach");
const File = require("./File");
const FunctionCall = require("./FunctionCall");
const TableLink = require("./TableLink");
const ObjectName = require("./ObjectName");
const Join = require("./Join");

class FromItem extends Syntax {
    static structure() {
        const Select = FromItem.prototype.Coach.Select;
        
        return {
            only: "boolean",
            table: TableLink,
            star: "boolean",
            file: File,
            lateral: "boolean",
            withOrdinality: "boolean",
            functionCall: FunctionCall,
            as: ObjectName,
            columns: [ObjectName],
            select: Select,
            joins: {
                type: [Join],
                nullAsEmpty: true
            }
        };
    }

    static parse(coach, data) {
        let needAs = false;

        // file Order.sql
        if ( coach.isFile() ) {
            data.file = coach.parseFile();
        }
        // [ LATERAL ] ( select ) [ AS ] alias
        else if ( coach.is("(") || coach.is(/lateral\s*\(/i) ) {
            
            if ( coach.isWord("lateral") ) {
                coach.expectWord("lateral");
                data.lateral = true;
            }

            coach.expect("(");
            coach.skipSpace();

            data.select = coach.parseSelect();

            coach.skipSpace();
            coach.expect(")");
            coach.skipSpace();

            needAs = true;
        }
        // [ LATERAL ] function_name ( [ argument [, ...] ] )
        //            [ WITH ORDINALITY ] [ [ AS ] alias ]
        else if ( FromItem.isFromFunctionCall(coach) ) {
            
            if ( coach.isWord("lateral") ) {
                coach.expectWord("lateral");
                data.lateral = true;
            }

            data.functionCall = coach.parseFunctionCall();

            if ( coach.isWord("with") ) {
                coach.expectWord("with");
                coach.expectWord("ordinality");
                
                data.withOrdinality = true;
            }

            needAs = true;
        }
        // [ ONLY ] table_name [ * ] [ [ AS ] alias
        else {
            if ( coach.isWord("only") ) {
                coach.expectWord("only");
                data.only = true;
            }

            data.table =  coach.parseTableLink();

            
            coach.skipSpace();
            if ( coach.is("*") ) {
                coach.expect("*");
                data.star = true;
            }
        }

        if ( needAs || coach.isWord("as") ) {
            coach.expectWord("as");

            data.as = coach.parseObjectName();
        }
        
        coach.skipSpace();

        // [ ( column_alias [, ...] ) ]
        if ( coach.is("(") ) {
            coach.expect("(");
            coach.skipSpace();

            data.columns = coach.parseComma("ObjectName");
            
            coach.skipSpace();
            coach.expect(")");
        }

        data.joins = coach.parseChain("Join");
    }

    static isFromFunctionCall(coach) {
        let i = coach.i;

        if ( coach.isWord("lateral") ) {
            coach.readWord();
            coach.skipSpace();
        }
        let isFunctionCall = coach.isFunctionCall();

        coach.i = i;
        return isFunctionCall;
    }

    static is(coach) {
        return coach.is(/only|lateral|\(/) || coach.isWord() || coach.isDoubleQuotes() || coach.isFile();
    }

    toString() {
        let data = this.data;
        let out = "";

        if ( data.file ) {
            out += data.file.toString();
        }
        else if ( data.select ) {
            if ( data.lateral ) {
                out += "lateral ";
            }
            out += "(";
            out += data.select.toString();
            out += ")";
        }
        else if ( data.functionCall ) {
            if ( data.lateral ) {
                out += "lateral ";
            }

            out += data.functionCall.toString();

            if ( data.withOrdinality ) {
                out += " with ordinality";
            }
        }
        else {
            if ( data.only ) {
                out += "only ";
            }

            out += data.table.toString();

            if ( data.star ) {
                out += " *";
            }
        }

        if ( data.as ) {
            out += " as ";
            out += data.as.toString();
        }

        if ( data.columns ) {
            out += " (";
            out += data.columns.map(name => name.toString()).join(", ");
            out += ")";
        }

        if ( data.joins.length ) {
            data.joins.forEach(join => {
                out += " ";
                out += join.toString();
            });
        }

        return out;
    }
}

module.exports = FromItem;