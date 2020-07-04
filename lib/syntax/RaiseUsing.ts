
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {Expression} from "./Expression";

// https://www.postgresql.org/docs/10/plpgsql-errors-and-messages.html
// option = expression

const OPTIONS = [
    "message",
    "detail",
    "hint",
    "errcode",
    "column",
    "constraint",
    "datatype",
    "table",
    "schema"
];

export class RaiseUsing extends Syntax<RaiseUsing> {
    structure() {
        return {
            option: Types.String({
                enum: OPTIONS
            }),
            expression: Expression
        };
    }

    is(coach: GrapeQLCoach) {
        const i = coach.i;
        const word = coach.readWord();
        coach.i = i;

        const isUsingOption = OPTIONS.includes(word);
        return isUsingOption;
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const option = coach.readWord();
        
        if ( !OPTIONS.includes(option) ) {
            coach.throwError("unknown option: " + option);
        }
        data.option = option;
        
        coach.skipSpace();
        coach.expect("=");
        coach.skipSpace();

        data.expression = coach.parse(Expression);
    }

    toString() {
        const row = this.row;
        const sql = `${row.option} = ${row.expression}`;
        return sql;
    }
}

