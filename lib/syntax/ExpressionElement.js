"use strict";

const {Syntax} = require("lang-coach");

class ExpressionElement extends Syntax {

    static structure() {
        return {
            element: Syntax
        };
    }

    static parse(coach, data, options) {
        options = options || {availableStar: false};

        if ( coach.isPgNull() ) {
            data.element = coach.parsePgNull();
        }

        else if ( coach.isBoolean() ) {
            data.element = coach.parseBoolean();
        }

        else if ( coach.isPgNumber() ) {
            data.element = coach.parsePgNumber();
        }

        else if ( coach.isByteString() ) {
            data.element = coach.parseByteString();
        }

        else if ( coach.isDollarString() ) {
            data.element = coach.parseDollarString();
        }

        else if ( coach.isSingleQuotesString() ) {
            data.element = coach.parseSingleQuotesString();
        }

        else if ( coach.isSystemVariable() ) {
            data.element = coach.parseSystemVariable();
        }

        else if ( coach.isDataType() ) {
            data.element = coach.parseDataType();
        }

        else if ( coach.isCast() ) {
            data.element = coach.parseCast();
        }

        else if ( coach.isPgArray() ) {
            data.element = coach.parsePgArray();
        }

        else if ( coach.isCaseWhen() ) {
            data.element = coach.parseCaseWhen();
        }

        else if ( coach.isColumnLink() ) {
            data.element = coach.parseColumnLink({ 
                availableStar: options.availableStar
            });
        }

        else {
            coach.throwError("expected any expression element");
        }
    }

    static is(coach) {
        return (
            coach.isPgNull() ||
            coach.isBoolean() ||
            coach.isPgNumber() ||
            coach.isSystemVariable() ||
            coach.isByteString() ||
            coach.isDollarString() ||
            coach.isSingleQuotesString() ||
            coach.isDataType() ||
            coach.isCast() ||
            coach.isPgArray() ||
            coach.isCaseWhen() ||
            coach.isColumnLink()
        );
    }

    toString() {
        return this.data.element.toString();
    }
}

module.exports = ExpressionElement;
