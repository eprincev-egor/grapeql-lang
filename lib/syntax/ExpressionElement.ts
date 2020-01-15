"use strict";

import {Syntax} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";

export default class ExpressionElement extends Syntax<ExpressionElement> {

    structure() {
        return {
            element: Syntax as any as (new (...args: any) => Syntax<any>)
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"], options) {
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

        else if ( coach.isCast() ) {
            data.element = coach.parseCast();
        }

        else if ( coach.isPgArray() ) {
            data.element = coach.parsePgArray();
        }

        else if ( coach.isCaseWhen() ) {
            data.element = coach.parseCaseWhen();
        }

        else if ( coach.isExtract() ) {
            data.element = coach.parseExtract();
        }

        else if ( coach.isSubstring() ) {
            data.element = coach.parseSubstring();
        }

        else if ( coach.isInterval() ) {
            data.element = coach.parseInterval();
        }

        else if ( coach.isExists() ) {
            data.element = coach.parseExists();
        }

        else if ( coach.isAny() ) {
            data.element = coach.parseAny();
        }

        else if ( coach.isIn() ) {
            data.element = coach.parseIn();
        }

        else if ( coach.isFunctionCall() ) {
            data.element = coach.parseFunctionCall();
        }

        else if ( coach.isColumnLink({ 
            availableStar: options.availableStar
        }) ) {
            data.element = coach.parseColumnLink({ 
                availableStar: options.availableStar
            });
        }

        else {
            coach.throwError("expected any expression element");
        }
    }

    is(coach: GrapeQLCoach, str: string, options) {
        return (
            coach.isPgNull() ||
            coach.isBoolean() ||
            coach.isPgNumber() ||
            coach.isSystemVariable() ||
            coach.isByteString() ||
            coach.isDollarString() ||
            coach.isSingleQuotesString() ||
            coach.isCast() ||
            coach.isPgArray() ||
            coach.isCaseWhen() ||
            coach.isExtract() ||
            coach.isSubstring() ||
            coach.isColumnLink( options )
        );
    }

    toString() {
        return this.data.element.toString();
    }
}


