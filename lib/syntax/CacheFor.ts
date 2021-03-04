
import {Syntax, Types} from "lang-coach";
import {TableLink} from "./TableLink";
import {ObjectName} from "./ObjectName";
import {Select} from "./Select";
import {WithoutTriggersOn} from "./WithoutTriggersOn";
import {GrapeQLCoach} from "../GrapeQLCoach";
import { CacheIndex } from "./CacheIndex";
import { WithoutInsertOn } from "./WithoutInsertOn";

/*
cache totals for company (
    select
        count(*) as quantity
    from orders
    where
        orders.id_client = company.id
)
[without triggers on TABLE] [ *]
[index INDEX_TYPE on ( { COLUMN_NAME | ( EXPRESSION ) } [, ...] ) ] [ *]
 */

export class CacheFor extends Syntax<CacheFor> {
    structure() {
        return {
            for: TableLink,
            name: ObjectName,
            as: ObjectName,
            cache: Select,
            withoutTriggers: Types.Array({
                element: TableLink
            }),
            withoutInsertOn: Types.Array({
                element: TableLink
            }),
            indexes: Types.Array({
                element: CacheIndex
            })
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

        coach.skipSpace();
        if ( coach.is(WithoutTriggersOn) ) {
            const withoutTriggers = coach.parseChain(WithoutTriggersOn);
            const withoutTriggersOnTables = withoutTriggers.map((withoutTrigger) =>
                withoutTrigger.get("onTable")!
            );
            data.withoutTriggers = withoutTriggersOnTables;
        }
        if ( coach.is(WithoutInsertOn) ) {
            const withoutInserts = coach.parseChain(WithoutInsertOn);
            const withoutInsertOnTables = withoutInserts.map((withoutTrigger) =>
                withoutTrigger.get("onTable")!
            );
            data.withoutInsertOn = withoutInsertOnTables;
        }

        if ( coach.is(CacheIndex) ) {
            data.indexes = coach.parseChain(CacheIndex);
        }
    }

    is(coach: GrapeQLCoach) {
        return coach.isWord("cache");
    }

    toString() {
        const data = this.row;
        let out = "";

        out += "cache ";
        out += data.name!.toString();
        
        out += " for ";
        out += data.for!.toString();

        if ( data.as ) {
            out += " as ";
            out += data.as.toString();
        }

        out += " ( ";
        out += data.cache!.toString();
        out += " )";

        if ( data.withoutTriggers ) {
            out += " ";
            out += data.withoutTriggers.map((onTable) =>
                `without triggers on ${onTable}`
            ).join(" ");
        }

        if ( data.withoutInsertOn ) {
            out += " ";
            out += data.withoutInsertOn.map((onTable) =>
                `without insert case on ${onTable}`
            ).join(" ");
        }

        if ( data.indexes ) {
            out += " ";
            out += data.indexes.map(cacheIndex => cacheIndex.toString()).join(" ");
        }

        return out;
    }
}
