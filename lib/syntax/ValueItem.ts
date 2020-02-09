

import {Syntax, Types} from "lang-coach";
import Expression from "./Expression";
import {GrapeQLCoach} from "../GrapeQLCoach";

export default class ValueItem extends Syntax<ValueItem> {
    structure() {
        return {
            default: Types.Boolean,
            value: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.isWord("default") ) {
            coach.expectWord("default");
            data.default = true;
        } else {
            data.value = coach.parse(Expression);
        }
    }

    is(coach: GrapeQLCoach) {
        return (
            coach.isWord("default") || 
            coach.is(Expression)
        );
    }

    toString() {
        if ( this.row.default ) {
            return "default";
        } else {
            return this.row.value.toString();
        }
    }
}

