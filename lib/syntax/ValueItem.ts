"use strict";

import {Syntax, Types} from "lang-coach";
import Expression from "./Expression";

export default class ValueItem extends Syntax<ValueItem> {
    structure() {
        return {
            default: Types.Boolean,
            expression: Expression
        };
    }

    parse(coach, data) {
        if ( coach.isWord("default") ) {
            coach.expectWord("default");
            data.default = true;
        } else {
            data.expression = coach.parseExpression();
        }
    }

    is(coach) {
        return (
            coach.isWord("default") || 
            coach.isExpression()
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

