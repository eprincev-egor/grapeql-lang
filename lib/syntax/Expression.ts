
import {Syntax, Types} from "lang-coach";
import allSyntax from "../allSyntax";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {ColumnLink} from "./ColumnLink";
import {DataType} from "./DataType";
import {ExpressionElement} from "./ExpressionElement";
import {Operator} from "./Operator";
import {In} from "./In";
import {SquareBrackets} from "./SquareBrackets";
import {Between} from "./Between";
import {PgNull} from "./PgNull";
import {PgNumber} from "./PgNumber";
import {SingleQuotesString} from "./SingleQuotesString";
import {DollarString} from "./DollarString";
import {Boolean} from "./Boolean";
import {Collate} from "./Collate";

// true or false

export class Expression extends Syntax<Expression> {

    structure() {
        return {
            brackets: Types.Boolean,
            elements: Types.Array({
                element: Syntax as any as (new (...args: any) => Syntax<any>)
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"], options: any) {
        options = options || {
            // @see Between
            excludeOperators: false
        };

        data.elements = [];
        this.parseElements(coach, data, options); 

        let firstElem = data.elements![0]!;

        const isSubExpression = (
            data.elements!.length === 1 &&
            firstElem.constructor.name === "Expression"
        );
        if ( isSubExpression && (!firstElem.row.brackets || !options.brackets) ) {
            data.brackets = data.brackets || firstElem.row.brackets;
            data.elements = firstElem.row.elements;
            firstElem = data.elements![0];
        }

        const isSubQuery = (
            data.elements!.length === 1 &&
            firstElem.constructor.name === "Select"
        );
        if ( options.brackets && !isSubQuery ) {
            data.brackets = true;
        }

    }
    
    parseElements(coach: GrapeQLCoach, data: this["TInputData"], options: any) {
        let elem;

        // count(*)
        if ( options.availableStar ) {
            if ( coach.is("*") && data.elements!.length === 0 ) {
                const elemStar = coach.parse(ColumnLink, {
                    availableStar: options.availableStar
                });
                data.elements!.push( elemStar );

                coach.skipSpace();
                return;
            }
        }

        const indexBeforeOperators = coach.i;

        const operators = this.parseOperators(coach, options.excludeOperators);
        if ( operators === false ) {
            return;
        }
        
        data.elements = data.elements!.concat( operators );


        const lastOperator = operators.slice(-1)[0]!;
        
        const lastOperatorIsPostOperator = (
            lastOperator &&
            lastOperator.get("operator") === "isnull"
        );
        if ( lastOperatorIsPostOperator ) {
            return;
        }


        // 1::bigint
        const isToType = (
            lastOperator &&
            lastOperator.get("operator") === "::"
        );

        if ( isToType ) {
            elem = coach.parse(DataType);
        }

        // sub expression
        else if ( coach.is("(") ) {
            coach.expect("(");
            coach.skipSpace();

            elem = coach.parse(Expression, {
                ...options,
                brackets: true
            });

            coach.skipSpace();
            coach.expect(")");
        }

        else {
            elem = coach.parse(ExpressionElement, options);
            elem = elem.get("element");
        }

        // fix case for ColumnDefinition:
        // default 0 not null
        if ( elem instanceof PgNull && lastOperator ) {
            if ( lastOperator.get("operator") === "not" ) {
                // return parsing position to place before operator not
                coach.i = indexBeforeOperators;
                // removing operator 'not' from data.elements
                data.elements = data.elements.slice(0, -1);
                return;
            }
        }
        
        data.elements.push( elem! );

        coach.skipSpace();
        if ( coach.is(SquareBrackets) ) {
            elem = coach.parse(SquareBrackets);
            data.elements.push( elem );

            coach.skipSpace();
        }

        // fix not between
        if ( coach.isWord("not") ) {
            const i = coach.i;
            coach.expectWord("not");
            coach.skipSpace();

            
            if ( coach.is(Between) ) {
                coach.i = i;

                const operator = coach.parse(Operator);
                coach.skipSpace();
                
                data.elements.push( operator );
            }
            else {
                coach.i = i;
            }
        }

        // between
        if ( coach.is(Between) ) {
            elem = coach.parse(Between);
            data.elements.push( elem );

            coach.skipSpace();
        }

        // in
        const canParseIn = (
            !options.excludeOperators ||
            !options.excludeOperators.includes("in")
        );
        if ( canParseIn && coach.is(In) ) {
            elem = coach.parse(In);
            data.elements.push( elem );

            coach.skipSpace();
        }
        
        if ( coach.is(Collate) ) {
            elem = coach.parse(Collate);
            data.elements.push( elem );
    
            coach.skipSpace();
        }

        coach.skipSpace();
        if ( coach.is(Operator) ) {
            this.parseElements(coach, data, options);
        }
    }

    parseOperators(
        coach: GrapeQLCoach,
        excludeOperators: string[],
        outOperators: Operator[] = []
    ): Operator[] | false {

        if ( coach.is(Operator) ) {
            const i = coach.i;
            const operator = coach.parse(Operator);

            // fix for between: stop on operator AND
            if ( excludeOperators ) {
                if ( excludeOperators.includes(operator.get("operator")!) ) {
                    coach.i = i;
                    return false;
                }
            }
            
            // throw error on operators sequence: 
            //    :: :: 
            const isCastOperator = operator.get("operator") === "::";
            if ( isCastOperator ) {
                const prevOperator = outOperators.slice(-1)[0]!;
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
    
    is(coach: GrapeQLCoach, str: string, options: any) {
        return (
            // for stopping parseComma
            !coach.isEnd() &&

            coach.is("(") ||
            coach.is( ExpressionElement, options ) ||
            coach.is(Operator)
        );
    }

    toPrimitiveValue(): (number | string | boolean | null) {
        const elements = this.row.elements!;
        const firstElem = elements[0];
        const secondElem = elements[1];
        const thirdElem = elements[2];
        const fourthElem = elements[3];

        // -4
        const isNegativeNumber = (
            elements.length === 2 &&
            firstElem instanceof Operator &&
            firstElem.get("operator") === "-" &&
            secondElem instanceof PgNumber
        );

        // -4::integer
        const isNegativeNumberWithCasting = (
            elements.length === 4 &&
            firstElem instanceof Operator &&
            firstElem.get("operator") === "-" &&
            secondElem instanceof PgNumber &&
            thirdElem instanceof Operator &&
            thirdElem.get("operator") === "::" &&
            fourthElem instanceof DataType
        );

        const firstElemIsConstant = (
            firstElem instanceof PgNull ||
            firstElem instanceof PgNumber ||
            firstElem instanceof SingleQuotesString ||
            firstElem instanceof DollarString ||
            firstElem instanceof Boolean
        );
        // '1'::numeric
        const isConstantWithCasting = (
            elements.length === 3 &&
            firstElemIsConstant &&
            secondElem instanceof Operator &&
            secondElem.get("operator") === "::" &&
            thirdElem instanceof DataType
        );

        // null, true, false, 'str', $$str$$, 3
        const isConstant = (
            elements.length === 1 &&
            firstElemIsConstant
        );


        const isPrimitive = (
            isConstant ||
            isConstantWithCasting ||
            isNegativeNumber ||
            isNegativeNumberWithCasting
        );

        if ( !isPrimitive ) {
            throw new Error("cannot convert to primitive value");
        }

        if ( isNegativeNumber || isNegativeNumberWithCasting ) {
            const numb = +secondElem.get("number");

            if ( isNaN(numb) ) {
                throw new Error("cannot convert to primitive value");
            }

            if ( isNegativeNumberWithCasting ) {
                const type = fourthElem as DataType;

                if ( type.isText() ) {
                    return -numb + "";
                }

                if ( type.isNumber() ) {
                    return -numb;
                }
                
                throw new Error("cannot convert to primitive value");
            }
            else {
                return -numb;
            }
        }

        if ( isConstant || isConstantWithCasting ) {
            if ( firstElem instanceof PgNull ) {
                return null;
            }

            let value;

            if ( firstElem instanceof PgNumber ) {
                value = +firstElem.get("number")!;
            }

            else if ( firstElem instanceof Boolean ) {
                value = firstElem.get("boolean");
            }

            else {
                // SingleQuotesString
                // DollarString
                value = firstElem.get("content");
            }


            if ( isConstantWithCasting ) {
                const type = thirdElem as DataType;

                if ( type.isText() ) {
                    value = value + "";
                }

                else if ( type.isNumber() ) {
                    value = +value;
                }

                else if ( type.isBoolean() ) {
                    if ( typeof value !== "boolean" ) {
                        throw new Error("cannot convert to primitive value");
                    }
                }
            }


            if ( value !== value ) {// isNaN
                throw new Error("cannot convert to primitive value");
            }


            return value;
        }

        return null;
    }
    
    toString(options = {parentSpace: ""}) {
        const Select = allSyntax.Select as  GrapeQLCoach["syntax"]["Select"];
        let out = options.parentSpace;

        this.row.elements!.forEach((elem, i) => {
            if ( elem instanceof Operator ) {
                const isConditionalOperator = (
                    elem.get("operator") === "and" ||
                    elem.get("operator") === "or" 
                );
                if ( isConditionalOperator ) {
                    out += "\n";
                    out += options.parentSpace + elem.toString();
                    out += "\n";
                    out += options.parentSpace.slice(0, -1);
                    return;
                }
            }
            if ( i > 0 ) {
                out += " ";
            }

            if ( elem instanceof Select ) {
                out += "( ";
                out += elem.toString();
                out += " )";
            } else {
                out += elem.toString();
            }
        });

        if ( this.row.brackets ) {
            return "(" + out + ")";
        }
        return out;
    }
}


