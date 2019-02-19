"use strict";

const {Syntax} = require("lang-coach");
const WithQuery = require("./WithQuery");

// WITH [ RECURSIVE ] with_query [, ...]

class With extends Syntax {
    static structure() {
        return {
            recursive: "boolean",
            queries: [WithQuery]
        };
    }

    static parse(coach, data) {
        coach.expectWord("with");

        if ( coach.isWord("recursive") ) {
            coach.expectWord("recursive");
            data.recursive = true;
        }

        data.queries = coach.parseComma("WithQuery");

        if ( !data.queries.length ) {
            coach.throwError("expected with_query");
        }

        // query name must be unique
        let existsName = {};
        data.queries.forEach(query => {
            let name = query.name.toLowerCase();

            if ( name in existsName ) {
                throw new Error(`WITH query name "${ name }" specified more than once`);
            }

            existsName[ name ] = true;
        });
    }

    static is(coach) {
        return coach.isWord("with");
    }

    toString() {
        let sql = "with ";

        if ( this.data.recursive ) {
            sql += "recursive ";
        }

        sql += this.data.queries.map(query =>
            query.toString()
        ).join(", ");

        return sql;
    }
}

module.exports = With;