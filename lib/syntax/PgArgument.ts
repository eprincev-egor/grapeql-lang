
import {Syntax, Types} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import Expression from "./Expression";

export default class PgArgument extends Syntax<PgArgument> {
    structure() {
        return {
            out: Types.Boolean,
            in: Types.Boolean,
            name: Types.String,
            type: Types.String,
            default: Types.String
        };
    }

    is(coach: GrapeQLCoach) {
        return coach.isWord();
    }

    // func(id integer, name text)
    // or
    // func(integer, text)
    parse(coach: GrapeQLCoach, data: this["TInputData"], options) {
        options = options || {default: false};

        if ( coach.isWord("out") ) {
            coach.expectWord("out");

            data.out = true;
        }
        else if ( coach.isWord("in") ) {
            coach.expectWord("in");

            data.in = true;
        }

        data.name = null;
        data.type = coach.parseType();

        if ( coach.is(/\s*\w+/i) ) {
            data.name = data.type;
            
            // if dataType unknown type
            // then he returns public.type
            data.name = data.name.replace(/^public\./, "");
            
            coach.skipSpace();
            data.type = coach.parseType();
        }

        if ( options.default ) {

            if ( coach.isWord("default") ) {
                coach.expectWord("default");

                const expression = coach.parse(Expression);
                data.default = expression.toString();
            }
        }
    }

    toString() {
        const arg = this.data;
        let out = "";

        if ( arg.out ) {
            out += "out ";
        }
        else if ( arg.in ) {
            out += "in ";
        }

        if ( arg.name ) {
            out += arg.name;
            out += " ";
        }

        out += arg.type;

        if ( arg.default ) {
            out += " default ";
            out += arg.default;
        }

        return out;
    }
}

