
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {SingleQuotesString} from "./SingleQuotesString";
import {DollarString} from "./DollarString";
import {Expression} from "./Expression";
import {RaiseUsing} from "./RaiseUsing";

// https://www.postgresql.org/docs/10/plpgsql-errors-and-messages.html
// RAISE [ level ] 'format' [, expression [, ... ]] [ USING option = expression [, ... ] ];
// RAISE [ level ] condition_name [ USING option = expression [, ... ] ];
// RAISE [ level ] SQLSTATE 'sqlstate' [ USING option = expression [, ... ] ];
// RAISE [ level ] USING option = expression [, ... ];
// RAISE ;

const LEVELS = [
    "debug",
    "log",
    "notice",
    "warning",
    "exception"
];

export class Raise extends Syntax<Raise> {
    structure() {
        return {
            level: Types.String({
                enum: LEVELS
            }),
            raise: Types.Or({
                or: [
                    SingleQuotesString,
                    DollarString
                ]
            }),
            conditionName: Types.String,
            sqlState: Types.Or({
                or: [
                    SingleQuotesString,
                    DollarString
                ]
            }),
            parameters: Types.Array({
                element: Expression,
                default: []
            }),
            using: Types.Array({
                element: RaiseUsing,
                default: []
            })
        };
    }

    is(coach: GrapeQLCoach) {
        return coach.isWord("raise");
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("raise");
        
        this.parseLevel(coach, data);

        if ( coach.isWord("sqlstate") ) {
            this.parseSqlState(coach, data);
            return;
        }
        
        if ( coach.isWord("using") ) {
            this.parseUsing(coach, data);
            return;
        }
        

        if ( coach.isWord() ) {
            const conditionName = coach.readWord();
            data.conditionName = conditionName;
        }
        else {
            this.parseFormat(coach, data);
            this.parseParameters(coach, data);
        }
        
        this.parseUsing(coach, data);
    }

    toString() {
        const row = this.row;
        let sql = "raise";

        if ( row.level ) {
            sql += " ";
            sql += row.level;
        }

        if ( row.raise ) {
            sql += " ";
            sql += row.raise.toString();

            const parameters = row.parameters.map((param) =>
                param.toString()
            );
            if ( parameters.length ) {
                sql += ", ";
                sql += parameters.join(", ");
            }
        }
        else if ( row.sqlState ) {
            sql += " sqlstate ";
            sql += row.sqlState;
        }
        else if ( row.conditionName ) {
            sql += " ";
            sql += row.conditionName;
        }
        

        const using = row.using.map((usingOption) =>
            usingOption.toString()
        );
        if ( using.length ) {
            sql += " using ";
            sql += using.join(", ");
        }

        return sql;
    }

    private parseLevel(coach: GrapeQLCoach, data: this["TInputData"]) {
        const i = coach.i;
        const level = coach.readWord();
        
        if ( LEVELS.includes(level) ) {
            data.level = level;
        }
        else {
            coach.i = i;
        }
    }

    private parseSqlState(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("sqlstate");

        if ( coach.is(SingleQuotesString) ) {
            data.sqlState = coach.parse(SingleQuotesString);
        }
        else {
            data.sqlState = coach.parse(DollarString);
        }
        coach.skipSpace();

        this.parseUsing(coach, data);
    }

    private parseFormat(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.is(SingleQuotesString) ) {
            data.raise = coach.parse(SingleQuotesString);
        }
        else if ( coach.is(DollarString) ) {
            data.raise = coach.parse(DollarString);
        }
    }

    private parseParameters(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.is(/\s*,/) ) {
            coach.skipSpace();
            coach.expect(",");
            coach.skipSpace();

            data.parameters = coach.parseComma(Expression);
        }
    }

    private parseUsing(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.isWord("using") ) {
            return;
        }
        coach.expectWord("using");
        data.using = coach.parseComma(RaiseUsing);
    }
}

