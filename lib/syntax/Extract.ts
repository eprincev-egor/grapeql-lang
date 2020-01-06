"use strict";

import {Syntax} from "lang-coach";
import DataType from "./DataType";

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
        const Expression = Extract.prototype.Coach.Expression;
        
        return {
            field: {
                type: "string",
                enum: extractFields
            },
            type: DataType,
            source: Expression
        };
    }

    parse(coach, data) {
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
    
    is(coach) {
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

