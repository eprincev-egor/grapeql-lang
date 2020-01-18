
import {Syntax, Types} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import PgArgument from "./PgArgument";
import PgReturns from "./PgReturns";
import FunctionIdentify from "./FunctionIdentify";
import CommentOn from "./CommentOn";
import CommentOnFunction from "./CommentOnFunction";
import DollarString from "./DollarString";
import SingleQuotesString from "./SingleQuotesString";
import SchemaName from "./SchemaName";
import PgNumber from "./PgNumber";

export default class CreateFunction extends Syntax<CreateFunction> {
    structure() {
        return {
            schema: Types.String,
            name: Types.String,
            args: Types.Array({
                element: PgArgument
            }),
            returns: PgReturns,
            body: Types.Or({
                or: [
                    DollarString, 
                    SingleQuotesString
                ]
            }),
            language: Types.String({
                enum: ["plpgsql", "sql"]
            }),
            immutable: Types.Boolean,
            returnsNullOnNull: Types.Boolean,
            stable: Types.Boolean,
            strict: Types.Boolean,
            parallel: Types.String({
                type: "string",
                enum: ["safe", "unsafe", "restricted"]
            }),
            cost: Types.Number,
            comment: CommentOnFunction
        };
    }

    toIdentify(data: this["TInputData"]) {
        const inputArgs = (data.args || []).filter((arg: PgArgument) =>
            !arg.data.out
        ) as PgArgument[];
        const types = inputArgs.map((arg) => arg.data.type);

        return new FunctionIdentify({
            schema: data.schema,
            name: data.name,
            args: types
        });
    }

    is(coach: GrapeQLCoach) {
        return coach.is(/^create(\s+or\s+replace)?\s+function/i);
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        // create or replace function
        coach.expectWord("create");
        

        if ( coach.isWord("or") ) {
            coach.expectWord("or");
            coach.expectWord("replace");
        }

        coach.expectWord("function");
        
        
        const schemaName = coach.parse(SchemaName);
        data.schema = schemaName.get("schema");
        data.name = schemaName.get("name");

        coach.skipSpace();
        

        // arguments
        coach.expect("(");
        coach.skipSpace();

        let args;
        if ( coach.isWord() ) {
            args = coach.parseComma(PgArgument, {default: true});
        } else {
            args = [];
        }
        data.args = args;

        // check defaults
        // cannot create function with args:
        // (a integer default null, b integer)
        let hasDefault = false;
        args.forEach((arg) => {
            if ( arg.data.default ) {
                hasDefault = true;
                return;
            }

            if ( !arg.data.default && hasDefault ) {
                coach.throwError("input parameters after one with a default value must also have defaults");
            }
        });

        coach.skipSpace();
        coach.expect(")");
        coach.skipSpace();

        // returns
        coach.expectWord("returns");
        
        data.returns = coach.parse(PgReturns);
        coach.skipSpace();

        // lang, cost, immutable
        this.parseFunctionInfo( coach, data );
        coach.skipSpace();
        
        coach.expectWord("as");

        // body
        if ( coach.is(DollarString) ) {
            data.body = coach.parse(DollarString);
        } else {
            data.body = coach.parse(SingleQuotesString);
        }
        coach.skipSpace();

        // lang, cost, immutable
        this.parseFunctionInfo( coach, data );

        // validate arguments,
        // error on duplicate name
        const existsName = {};
        args.forEach((arg) => {
            if ( arg.data.name === null ) {
                return;
            }
            
            if ( arg.data.name in existsName ) {
                throw new Error(`parameter name "${ arg.data.name }" used more than once`);
            }

            existsName[ arg.data.name ] = true;
        });

        if ( data.returns.get("table") ) {
            data.returns.get("table").forEach((arg) => {
                if ( arg.data.name in existsName ) {
                    throw new Error(`parameter name "${ arg.data.name }" used more than once`);
                }

                existsName[ arg.data.name ] = true;
            });
        }

        let existsSemicolon = false;
        if ( coach.is(/\s*;/) ) {
            coach.skipSpace();
            coach.expect(";");
            coach.skipSpace();

            existsSemicolon = true;
        }

        if ( existsSemicolon ) {
            if ( coach.is(CommentOn) ) {
                data.comment = coach.parse(CommentOnFunction);
    
                const identify = this.toIdentify( data );
                const isSameIdentify = data.comment.get("function").equal( identify );
    
                if ( !isSameIdentify ) {
                    coach.throwError(
                        "comment after function has wrong identify: " + 
                        data.comment.get("function").toString()
                    );
                }
            }
        }
        
        if ( coach.is(/\s*;/) ) {
            coach.skipSpace();
            coach.expect(";");
            coach.skipSpace();
        }
    }

    parseFunctionInfo(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.isWord("language") ) {
            coach.expectWord("language");
            
            const i = coach.i;
            const language = coach.expectWord();

            if ( language !== "plpgsql" && language !== "sql" ) {
                coach.i = i;
                coach.throwError("expected language plpgsql or sql");
            }

            data.language = language;
        }
        coach.skipSpace();

        if ( coach.isWord("immutable") ) {
            coach.expectWord("immutable");
            data.immutable = true;
        }
        else if ( coach.isWord("stable") ) {
            coach.expectWord("stable");
            data.stable = true;
        }
        else if ( coach.isWord("volatile") ) {
            coach.expectWord("volatile");
        }

        // CALLED ON NULL INPUT | RETURNS NULL ON NULL INPUT | STRICT
        if ( coach.isWord("called") ) {
            coach.expectWord("called");
            coach.expectWord("on");
            coach.expectWord("null");
            coach.expectWord("input");
        }
        else if ( coach.isWord("returns") ) {
            coach.expectWord("returns");
            coach.expectWord("null");
            coach.expectWord("on");
            coach.expectWord("null");
            coach.expectWord("input");

            data.returnsNullOnNull = true;
        }
        else if ( coach.isWord("strict") ) {
            coach.expectWord("strict");

            data.strict = true;
        }


        if ( coach.isWord("parallel") ) {
            coach.expectWord("parallel");

            data.parallel = coach.readWord();
        }

        if ( coach.isWord("cost") ) {
            coach.expectWord("cost");
            
            const cost = coach.parse(PgNumber);
            data.cost = +cost;
        }

        coach.skipSpace();
    }

    toString() {
        const func = this.data;
        let additionalParams = "";

        additionalParams += " language ";
        additionalParams += func.language;
        
        if ( func.immutable ) {
            additionalParams += " immutable";
        }
        else if ( func.stable ) {
            additionalParams += " stable";
        }

        if ( func.returnsNullOnNull ) {
            additionalParams += " returns null on null input";
        }
        else if ( func.strict ) {
            additionalParams += " strict";
        }


        if ( func.parallel ) {
            additionalParams += " parallel ";
            additionalParams += func.parallel;
        }

        if ( func.cost != null ) {
            additionalParams += " cost " + func.cost;
        }

        
        const returnsSql = func.returns.toString();

        let argsSql = func.args.map((arg) => 
            "    " + arg.toString()
        ).join(",\n");

        if ( func.args.length ) {
            argsSql = "\n" + argsSql + "\n";
        }

        let comment = "";
        if ( func.comment ) {
            comment = "\n" + func.comment.toString() + ";";
        }

        const body = func.body.toString();

        // отступов не должно быть!
        // иначе DDLManager.dump будет писать некрасивый код
        return `
create or replace function ${ func.schema }.${ func.name }(${argsSql}) 
returns ${ returnsSql } 
${ additionalParams }
as ${ body };${ comment }
        `.trim();
    }
}
