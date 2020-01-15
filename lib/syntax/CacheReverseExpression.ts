"use strict";

import {Syntax} from "lang-coach";
import TableLink from "./TableLink";
import ObjectName from "./ObjectName";
import Expression from "./Expression";
import GrapeQLCoach from "../GrapeQLCoach";

/*
after change orders set where
    company.id = orders.id_client
 */

export default class CacheReverseExpression extends Syntax<CacheReverseExpression> {
    structure() {
        return {
            table: TableLink,
            as: ObjectName,
            where: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("after");
        coach.expectWord("change");


        data.table = coach.parseTableLink();
        coach.skipSpace();

        if ( coach.isWord("as") ) {
            coach.expectWord("as");

            data.as = coach.parseObjectName();
            coach.skipSpace();
        }

        coach.expectWord("set");
        coach.expectWord("where");

        data.where = coach.parseExpression();
    }

    is(coach: GrapeQLCoach) {
        return coach.isWord("after");
    }

    toString() {
        let out = "";

        out += "after change ";
        out += this.data.table.toString();

        if ( this.data.as ) {
            out += " as ";
            out += this.data.as.toString();
        }

        out += " set where ";
        out += this.data.where.toString();

        return out;
    }
}
