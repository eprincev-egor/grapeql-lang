"use strict";

import {Syntax, Types} from "lang-coach";
import Expression from "./Expression";
import GrapeQLCoach from "../GrapeQLCoach";

export default class ValueItem extends Syntax<ValueItem> {
    structure() {
        return {
            default: Types.Boolean,
            expression: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.isWord("default") ) {
            coach.expectWord("default");
            data.default = true;
        } else {
            data.expression = coach.parse(Expression);
        }
    }

    is(coach: GrapeQLCoach) {
        return (
            coach.isWord("default") || 
            coach.is(Expression)
        );
    }

    toString() {
        if ( this.data.default ) {
            return "default";
        } else {
            return this.data.expression.toString();
        }
    }
}

