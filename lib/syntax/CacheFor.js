"use strict";

const {Syntax} = require("lang-coach");
const TableLink = require("./TableLink");
const ObjectName = require("./ObjectName");
const Select = require("./Select");
const CacheReverseExpression = require("./CacheReverseExpression");

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

class CacheFor extends Syntax {
    static structure() {
        return {
            for: TableLink,
            as: ObjectName,
            cache: Select,
            reverse: [CacheReverseExpression]
        };
    }

    static parse(coach, data) {
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

    static is(coach) {
        return coach.is(/cache\s+for/i);
    }

    toString() {
        let data = this.data;
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

        data.reverse.forEach(item => {
            out += " ";
            out += item.toString();
        });

        return out;
    }
}

module.exports = CacheFor;