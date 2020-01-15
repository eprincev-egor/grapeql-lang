"use strict";

import {Syntax, Types} from "lang-coach";
import FunctionLink from "./FunctionLink";
import OrderByElement from "./OrderByElement";
import WindowDefinition from "./WindowDefinition";
import ISyntaxes from "./ISyntaxes";
import GrapeQLCoach from "../GrapeQLCoach";

// some(1,2)

export default class FunctionCall extends Syntax<FunctionCall> {
    structure() {
        const Expression = this.syntax.Expression as any as ISyntaxes["Expression"];

        return {
            function: FunctionLink,
            all: Types.Boolean,
            distinct: Types.Boolean,
            arguments: Types.Array({
                element: Expression
            }),
            where: Expression,
            orderBy: Types.Array({
                element: OrderByElement
            }),
            within: Types.Array({
                element: OrderByElement
            }),
            over: WindowDefinition,
            emptyOver: Types.Boolean
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        data.function = coach.parseFunctionLink();

        coach.skipSpace();
        coach.expect("(");
        coach.skipSpace();

        if ( coach.isWord("all") ) {
            coach.expectWord("all");

            data.all = true;
        }
        else if ( coach.isWord("distinct") ) {
            coach.expectWord("distinct");

            data.distinct = true;
        }

        // count( company.* )
        if ( coach.isExpression({ availableStar: true }) ) {
            data.arguments = coach.parseComma("Expression", {
                availableStar: true
            });
        } else {
            data.arguments = [];
        }
        

        coach.skipSpace();

        // aggregate_name (expression [ , ... ] [ order_by_clause ] )
        if ( coach.isWord("order") ) {
            data.orderBy = this.parseOrderBy(coach);
        }

        coach.skipSpace();
        coach.expect(")");
        coach.skipSpace();

        if ( coach.isWord("within") ) {
            coach.expectWord("within");
            coach.expectWord("group");


            coach.expect("(");
            coach.skipSpace();

            data.within = this.parseOrderBy(coach);

            coach.skipSpace();
            coach.expect(")");
        }

        coach.skipSpace();

        if ( coach.isWord("filter") ) {
            coach.expectWord("filter");

            coach.expect("(");
            coach.skipSpace();

            coach.expectWord("where");

            data.where = coach.parseExpression();

            coach.skipSpace();
            coach.expect(")");
        }

        if ( coach.isWord("over") ) {
            coach.expectWord("over");

            coach.expect("(");
            coach.skipSpace();

            if ( coach.is(")") ) {
                data.emptyOver = true;
            } else {
                data.over = coach.parseWindowDefinition();
            }

            coach.skipSpace();
            coach.expect(")");
        }
    }

    parseOrderBy(coach) {
        coach.expectWord("order");
        coach.expectWord("by");

        return coach.parseComma("OrderByElement");
    }

    is(coach: GrapeQLCoach) {
        coach.checkpoint();
        let result = false;

        try {
            coach.parseFunctionLink();
            coach.skipSpace();
            result = coach.is("(");
        } catch (err) {
            result = false;
        }

        coach.rollback();
        return result;
    }

    toString() {
        const data = this.data;
        let out = "";

        out += data.function.toString();
        out += "(";

        if ( data.all ) {
            out += " all ";
        }
        if ( data.distinct ) {
            out += " distinct ";
        }

        out += data.arguments.map((arg) => arg.toString()).join(", ");

        if ( data.orderBy ) {
            out += " order by ";
            out += data.orderBy.map((item) => item.toString()).join(", ");
            out += " ";
        }

        out += ")";

        if ( data.within ) {
            out += " within group ( order by ";
            out += data.within.map((item) => item.toString()).join(", ");
            out += " ) ";
        }

        if ( data.where ) {
            out += "filter (where ";
            out += data.where.toString();
            out += ")";
        }

        if ( data.over ) {
            out += "over ( ";
            out += data.over.toString();
            out += ")";
        }

        else if ( data.emptyOver ) {
            out += "over()";
        }

        return out;
    }
}

