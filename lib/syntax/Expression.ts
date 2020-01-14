"use strict";

import {Syntax, Types} from "lang-coach";

// true or false

export default class Expression extends Syntax<Expression> {

    // ((( expression )))  strip unnecessary brackets
    static extrude(elements) {
        if ( elements.length === 1 ) {
            const firstElement = elements[0];
            const isExpression = firstElement instanceof Expression;

            if ( isExpression ) {
                return Expression.extrude(
                    firstElement.get("elements")
                );
            }
        }
        
        return elements;
    }
    structure() {
        return {
            elements: Types.Array({
                element: Syntax as any as (new (...args: any) => Syntax<any>)
            })
        };
    }

    parse(coach, data, options) {
        options = options || {
            // @see Between
            excludeOperators: false
        };
        data.elements = [];

        this.parseElements(coach, data, options);

        // (((elem))) => elem
        data.elements = Expression.extrude( data.elements );
    }
    
    parseElements(coach, data, options) {
        let elem;

        // count(*)
        if ( options.availableStar ) {
            if ( coach.is("*") ) {
                const elemStar = coach.parseColumnLink({
                    availableStar: options.availableStar
                });
                data.elements.push( elemStar );

                coach.skipSpace();
                return;
            }
        }

        const operators = this.parseOperators(coach, options.excludeOperators);
        if ( operators === false ) {
            return;
        }
        
        data.elements = data.elements.concat( operators );


        // 1::bigint
        const lastOperator = operators.slice(-1)[0];
        const isToType = (
            lastOperator &&
            lastOperator.get("operator") === "::"
        );

        if ( isToType ) {
            elem = coach.parseDataType();
        }

        // sub expression
        else if ( coach.is("(") ) {
            coach.expect("(");
            coach.skipSpace();

            elem = coach.parseExpression(options);

            coach.skipSpace();
            coach.expect(")");
        }

        else {
            elem = coach.parseExpressionElement(options);
            elem = elem.get("element");
        }

        
        data.elements.push( elem );

        coach.skipSpace();
        if ( coach.isSquareBrackets() ) {
            elem = coach.parseSquareBrackets();
            data.elements.push( elem );

            coach.skipSpace();
        }

        // fix not between
        if ( coach.isWord("not") ) {
            const i = coach.i;
            coach.expectWord("not");
            coach.skipSpace();

            
            if ( coach.isBetween() ) {
                coach.i = i;

                const operator = coach.parseOperator();
                coach.skipSpace();
                
                data.elements.push( operator );
            }
            else {
                coach.i = i;
            }
        }

        // between
        if ( coach.isBetween() ) {
            elem = coach.parseBetween();
            data.elements.push( elem );

            coach.skipSpace();
        }

        // in
        if ( coach.isIn() ) {
            elem = coach.parseIn();
            data.elements.push( elem );

            coach.skipSpace();
        }

        coach.skipSpace();
        if ( coach.isOperator() ) {
            this.parseElements(coach, data, options);
        }
    }

    parseOperators(coach, excludeOperators, outOperators = []) {

        if ( coach.isOperator() ) {
            const i = coach.i;
            const operator = coach.parseOperator();

            // fix for between: stop on operator AND
            if ( excludeOperators ) {
                if ( excludeOperators.includes(operator.get("operator")) ) {
                    coach.i = i;
                    return false;
                }
            }
            
            // throw error on operators sequence: 
            //    :: :: 
            const isCastOperator = operator.get("operator") === "::";
            if ( isCastOperator ) {
                const prevOperator = outOperators.slice(-1)[0];
                const isCastPrevOperator = (
                    prevOperator && 
                    prevOperator.get("operator") === "::"
                );

                if ( isCastPrevOperator ) {
                    coach.throwError("expected type");
                }
            }

            outOperators.push( operator );

            coach.skipSpace();
            this.parseOperators(coach, excludeOperators, outOperators);
        }

        return outOperators;
    }
    
    is(coach, str, options) {
        return (
            // for stopping parseComma
            !coach.isEnd() &&

            coach.is("(") ||
            coach.isExpressionElement( options ) ||
            coach.isOperator()
        );
    }
    
    toString() {
        let out = "";

        this.data.elements.forEach((elem, i) => {
            if ( i > 0 ) {
                out += " ";
            }

            if ( elem instanceof Expression ) {
                out += "( ";
                out += elem.toString();
                out += " )";
            } else {
                out += elem.toString();
            }
        });

        return out;
    }
}


