"use strict";

import {Syntax, Types} from "lang-coach";
import WithQuery from "./WithQuery";
import GrapeQLCoach from "../GrapeQLCoach";

// WITH [ RECURSIVE ] with_query [, ...]

export default class With extends Syntax<With> {
    structure() {
        return {
            recursive: Types.Boolean,
            queries: Types.Array({
                element: WithQuery
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("with");

        if ( coach.isWord("recursive") ) {
            coach.expectWord("recursive");
            data.recursive = true;
        }

        data.queries = coach.parseComma("WithQuery");

        // query name must be unique
        const existsName = {};
        data.queries.forEach((query) => {
            const name = query.get("name").toLowerCase();

            if ( name in existsName ) {
                throw new Error(`WITH query name "${ name }" specified more than once`);
            }

            existsName[ name ] = true;
        });
    }

    is(coach: GrapeQLCoach) {
        return coach.isWord("with");
    }

    toString() {
        let sql = "with ";

        if ( this.data.recursive ) {
            sql += "recursive ";
        }

        sql += this.data.queries.map((query) =>
            query.toString()
        ).join(", ");

        return sql;
    }
}

