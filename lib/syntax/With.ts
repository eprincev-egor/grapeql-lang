"use strict";

import {Syntax} from "lang-coach";
import WithQuery from "./WithQuery";

// WITH [ RECURSIVE ] with_query [, ...]

export default class With extends Syntax<With> {
    structure() {
        return {
            recursive: "boolean",
            queries: [WithQuery]
        };
    }

    parse(coach, data) {
        coach.expectWord("with");

        if ( coach.isWord("recursive") ) {
            coach.expectWord("recursive");
            data.recursive = true;
        }

        data.queries = coach.parseComma("WithQuery");

        // query name must be unique
        let existsName = {};
        data.queries.forEach(query => {
            let name = query.get("name").toLowerCase();

            if ( name in existsName ) {
                throw new Error(`WITH query name "${ name }" specified more than once`);
            }

            existsName[ name ] = true;
        });
    }

    is(coach) {
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

