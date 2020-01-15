"use strict";

import {Syntax, Types} from "lang-coach";
import DataType from "./DataType";
import ISyntaxes from "./ISyntaxes";
import GrapeQLCoach from "../GrapeQLCoach";

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

export default class Extract extends Syntax<Extract> {
    structure() {
        const Expression = this.syntax.Expression as any as ISyntaxes["Expression"];
        
        return {
            field: Types.String({
                enum: extractFields
            }),
            type: DataType,
            source: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("extract");
        coach.expect("(");
        coach.skipSpace();
        
        data.field = coach.readWord();
        
        if ( !extractFields.includes(data.field) ) {
            coach.throwError("unrecognized extract field: " + data.field);
        }

        coach.expectWord("from");
        
        if ( coach.isDataType() ) {
            data.type = coach.parseDataType();
            coach.skipSpace();
        }

        data.source = coach.parseExpression();
        
        coach.expect(")");
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("extract");
    }
    
    toString() {
        let out = `extract( ${this.data.field} from `;

        if ( this.data.type ) {
            out += this.data.type.toString();
            out += " ";
        }

        out += this.data.source.toString();

        out += ")";
        return out;
    }
}

