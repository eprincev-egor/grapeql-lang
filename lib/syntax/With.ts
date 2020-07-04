
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {WithQuery} from "./WithQuery";

// WITH [ RECURSIVE ] with_query [, ...]

export class With extends Syntax<With> {
    structure() {
        return {
            recursive: Types.Boolean,
            queries: Types.Array({
                element: WithQuery
            })
        };
    }

    parse(coach: GrapeQLCoach, data: any) {
        coach.expectWord("with");

        if ( coach.isWord("recursive") ) {
            coach.expectWord("recursive");
            data.recursive = true;
        }

        const queries = coach.parseComma(WithQuery);
        data.queries = queries;

        // query name must be unique
        const existsName = {};
        queries.forEach((query) => {
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

        if ( this.row.recursive ) {
            sql += "recursive ";
        }

        sql += this.row.queries.map((query) =>
            query.toString()
        ).join(", ");

        return sql;
    }
}
