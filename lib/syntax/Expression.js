"use strict";

const {Syntax} = require("lang-coach");

// true or false

class Expression extends Syntax {
    static structure() {
        return {
            elements: [Syntax]
        };
    }

    static parse(coach, data, options) {
        options = options || {
            // @see Between
            excludeOperators: false
        };
        data.elements = [];

        Expression.parseElements(coach, data, options);

        // (((elem))) => elem
        data.elements = Expression.extrude( data.elements );
    }
    
    static parseElements(coach, data, options) {
        let elem;

        // count(*)
        if ( options.availableStar ) {
            if ( coach.is("*") ) {
                let elem = coach.parseColumnLink({
                    availableStar: options.availableStar
                });
                data.elements.push( elem );

                coach.skipSpace();
                return;
            }
        }

        let operators = Expression.parseOperators(coach, options.excludeOperators);
        if ( operators === false ) {
            return;
        }
        
        data.elements = data.elements.concat( operators );


        // 1::bigint
        let lastOperator = operators.slice(-1)[0];
        let isToType = (
            lastOperator &&
            lastOperator.get("operator") == "::"
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
            let i = coach.i;
            coach.expectWord("not");
            coach.skipSpace();

            
            if ( coach.isBetween() ) {
                coach.i = i;

                let elem = coach.parseOperator();
                coach.skipSpace();
                
                data.elements.push( elem );
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
            Expression.parseElements(coach, data, options);
        }
    }

    static parseOperators(coach, excludeOperators, outOperators) {
        outOperators = outOperators || [];

        if ( coach.isOperator() ) {
            let i = coach.i;
            let operator = coach.parseOperator();

            // fix for between: stop on operator AND
            if ( excludeOperators ) {
                if ( excludeOperators.includes(operator.get("operator")) ) {
                    coach.i = i;
                    return false;
                }
            }
            
            // throw error on operators sequence: 
            //    :: :: 
            let isCastOperator = operator.get("operator") == "::";
            if ( isCastOperator ) {
                let prevOperator = outOperators.slice(-1)[0];
                let isCastPrevOperator = (
                    prevOperator && 
                    prevOperator.get("operator") == "::"
                );

                if ( isCastPrevOperator ) {
                    coach.throwError("expected type");
                }
            }

            outOperators.push( operator );

            coach.skipSpace();
            Expression.parseOperators(coach, excludeOperators, outOperators);
        }

        return outOperators;
    }

    // ((( expression )))  strip unnecessary brackets
    static extrude(elements) {
        if ( elements.length == 1 ) {
            let firstElement = elements[0];
            let isExpression = firstElement instanceof Expression;

            if ( isExpression ) {
                return Expression.extrude(
                    firstElement.get("elements")
                );
            }
        }
        
        return elements;
    }
    
    static is(coach, str, options) {
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

module.exports = Expression;
