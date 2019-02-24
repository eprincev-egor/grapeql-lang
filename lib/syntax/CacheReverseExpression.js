"use strict";

const {Syntax} = require("lang-coach");
const TableLink = require("./TableLink");
const ObjectName = require("./ObjectName");
const Expression = require("./Expression");

/*
after change orders set where
    company.id = orders.id_client
 */

class CacheReverseExpression extends Syntax {
    static structure() {
        return {
            table: TableLink,
            as: ObjectName,
            where: Expression
        };
    }

    static parse(coach, data) {
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

    static is(coach) {
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

module.exports = CacheReverseExpression;