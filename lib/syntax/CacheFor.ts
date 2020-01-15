"use strict";

import {Syntax, Types} from "lang-coach";
import TableLink from "./TableLink";
import ObjectName from "./ObjectName";
import Select from "./Select";
import CacheReverseExpression from "./CacheReverseExpression";
import GrapeQLCoach from "../GrapeQLCoach";

/*
cache totals for company (
    select
        count(*) as quantity
    from orders
    where
        orders.id_client = company.id
)
after change orders set where
    company.id = orders.id_client
 */

export default class CacheFor extends Syntax<CacheFor> {
    structure() {
        return {
            for: TableLink,
            as: ObjectName,
            cache: Select,
            reverse: Types.Array({
                element: CacheReverseExpression
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("cache");
        coach.expectWord("for");

        data.for = coach.parseTableLink();
        coach.skipSpace();

        if ( coach.isWord("as") ) {
            coach.expectWord("as");

            data.as = coach.parseObjectName();
            coach.skipSpace();
        }

        coach.expect("(");
        coach.skipSpace();

        data.cache = coach.parseSelect();

        coach.skipSpace();
        coach.expect(")");

        data.reverse = coach.parseChain("CacheReverseExpression");
    }

    is(coach: GrapeQLCoach) {
        return coach.is(/cache\s+for/i);
    }

    toString() {
        const data = this.data;
        let out = "";

        out += "cache for ";
        out += data.for.toString();

        if ( data.as ) {
            out += " as ";
            out += data.as.toString();
        }

        out += " ( ";
        out += data.cache.toString();
        out += " )";

        data.reverse.forEach((item) => {
            out += " ";
            out += item.toString();
        });

        return out;
    }
}
