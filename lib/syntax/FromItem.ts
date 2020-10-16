
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import allSyntax from "../allSyntax";
import {File} from "./File";
import {FunctionCall} from "./FunctionCall";
import {TableLink} from "./TableLink";
import {ObjectName} from "./ObjectName";
import {Join} from "./Join";
import {DoubleQuotes} from "./DoubleQuotes";

export class FromItem extends Syntax<FromItem> {
    structure() {
        const Select = allSyntax.Select as GrapeQLCoach["syntax"]["Select"];
        
        return {
            only: Types.Boolean,
            table: TableLink,
            star: Types.Boolean,
            file: File,
            lateral: Types.Boolean,
            withOrdinality: Types.Boolean,
            functionCall: FunctionCall,
            as: ObjectName,
            columns: Types.Array({
                element: ObjectName
            }),
            select: Select,
            joins: Types.Array({
                element: Join,
                nullAsEmpty: true
            })
        };
    }

    parse(coach: GrapeQLCoach, data) {
        const Select = allSyntax.Select as GrapeQLCoach["syntax"]["Select"];

        let needAs = false;

        // file Order.sql
        if ( coach.is(File) ) {
            data.file = coach.parse(File);
        }
        // [ LATERAL ] ( select ) [ AS ] alias
        else if ( coach.is("(") || coach.is(/lateral\s*\(/i) ) {
            
            if ( coach.isWord("lateral") ) {
                coach.expectWord("lateral");
                data.lateral = true;
            }

            coach.expect("(");
            coach.skipSpace();

            data.select = coach.parse(Select);

            coach.skipSpace();
            coach.expect(")");
            coach.skipSpace();

            needAs = true;
        }
        // [ LATERAL ] function_name ( [ argument [, ...] ] )
        //            [ WITH ORDINALITY ] [ [ AS ] alias ]
        else if ( this.isFromFunctionCall(coach) ) {
            
            if ( coach.isWord("lateral") ) {
                coach.expectWord("lateral");
                data.lateral = true;
            }

            data.functionCall = coach.parse(FunctionCall);

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

            data.table =  coach.parse(TableLink);

            
            coach.skipSpace();
            if ( coach.is("*") ) {
                coach.expect("*");
                data.star = true;
            }
        }

        if ( coach.isWord("as") ) {
            coach.expectWord("as");

            data.as = coach.parse(ObjectName);
        }
        else if ( coach.is(ObjectName) ) {
            const i = coach.i;
            const nextWord = coach.readWord();
            coach.i = i;

            const isKeyword = [
                "left",
                "right",
                "inner",
                "full",
                "join",
                "on",
                "using",
                "order",
                "where",
                "having",
                "limit",
                "offset",
                "group",
                "fetch",
                "window",
                "union",
                "except",
                "intersect"
            ].includes(nextWord);

            if ( !isKeyword ) {
                data.as = coach.parse(ObjectName);
            }
        }

        if ( needAs && !data.as ) {
            coach.throwError("expected alias for from item");
        }

        
        coach.skipSpace();

        // [ ( column_alias [, ...] ) ]
        if ( coach.is("(") ) {
            coach.expect("(");
            coach.skipSpace();

            data.columns = coach.parseComma(ObjectName);
            
            coach.skipSpace();
            coach.expect(")");
        }

        data.joins = coach.parseChain(Join);
    }

    isFromFunctionCall(coach: GrapeQLCoach) {
        const i = coach.i;

        if ( coach.isWord("lateral") ) {
            coach.readWord();
            coach.skipSpace();
        }
        const isFunctionCall = coach.is(FunctionCall);

        coach.i = i;
        return isFunctionCall;
    }

    is(coach: GrapeQLCoach) {
        return (
            coach.is(/only|lateral|\(/) || 
            coach.isWord() || 
            coach.is(DoubleQuotes) || 
            coach.is(File)
        );
    }

    toString() {
        const data = this.row;
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
            out += data.columns.map((name) => name.toString()).join(", ");
            out += ")";
        }

        if ( data.joins.length ) {
            data.joins.forEach((join) => {
                out += "\n\n";
                out += join.toString();
            });
        }

        return out;
    }
}

