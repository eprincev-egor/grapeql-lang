

import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import allSyntax from "../allSyntax";
import {DataType} from "./DataType";

const extractFields = [
    "century",
    "day",
    "decade",
    "dow",
    "doy",
    "epoch",
    "hour",
    "microseconds",
    "millennium",
    "milliseconds",
    "minute",
    "month",
    "quarter",
    "second",
    "timezone",
    "timezone_hour",
    "timezone_minute",
    "week",
    "year"
];

export class Extract extends Syntax<Extract> {
    structure() {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        
        return {
            extract: Types.String({
                enum: extractFields
            }),
            from: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        
        coach.expectWord("extract");
        coach.expect("(");
        coach.skipSpace();
        
        data.extract = coach.readWord();
        
        if ( !extractFields.includes(data.extract) ) {
            coach.throwError("unrecognized extract field: " + data.extract);
        }

        coach.expectWord("from");
        
        data.from = coach.parse(Expression);
        
        coach.expect(")");
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("extract");
    }
    
    toString() {
        let out = `extract( ${this.row.extract} from `;

        out += this.row.from.toString();

        out += ")";
        return out;
    }
}

