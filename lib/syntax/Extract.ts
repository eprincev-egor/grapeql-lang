

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
            field: Types.String({
                enum: extractFields
            }),
            type: DataType,
            source: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        
        coach.expectWord("extract");
        coach.expect("(");
        coach.skipSpace();
        
        data.field = coach.readWord();
        
        if ( !extractFields.includes(data.field) ) {
            coach.throwError("unrecognized extract field: " + data.field);
        }

        coach.expectWord("from");
        
        if ( coach.is(DataType) ) {
            data.type = coach.parse(DataType);
            coach.skipSpace();
        }

        data.source = coach.parse(Expression);
        
        coach.expect(")");
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("extract");
    }
    
    toString() {
        let out = `extract( ${this.row.field} from `;

        if ( this.row.type ) {
            out += this.row.type.toString();
            out += " ";
        }

        out += this.row.source.toString();

        out += ")";
        return out;
    }
}

