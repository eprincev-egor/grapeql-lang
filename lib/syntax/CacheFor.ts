
import {Syntax, Types} from "lang-coach";
import {TableLink} from "./TableLink";
import {ObjectName} from "./ObjectName";
import {Select} from "./Select";
import {GrapeQLCoach} from "../GrapeQLCoach";

/*
cache totals for company (
    select
        count(*) as quantity
    from orders
    where
        orders.id_client = company.id
)
 */

export class CacheFor extends Syntax<CacheFor> {
    structure() {
        return {
            for: TableLink,
            name: ObjectName,
            as: ObjectName,
            cache: Select
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("cache");

        data.name = coach.parse(ObjectName);
        coach.skipSpace();

        coach.expectWord("for");

        data.for = coach.parse(TableLink);
        coach.skipSpace();

        if ( coach.isWord("as") ) {
            coach.expectWord("as");

            data.as = coach.parse(ObjectName);
            coach.skipSpace();
        }

        coach.expect("(");
        coach.skipSpace();

        data.cache = coach.parse(Select);

        coach.skipSpace();
        coach.expect(")");
    }

    is(coach: GrapeQLCoach) {
        return coach.isWord("cache");
    }

    toString() {
        const data = this.row;
        let out = "";

        out += "cache ";
        out += data.name.toString();
        
        out += " for ";
        out += data.for.toString();

        if ( data.as ) {
            out += " as ";
            out += data.as.toString();
        }

        out += " ( ";
        out += data.cache.toString();
        out += " )";

        return out;
    }
}
