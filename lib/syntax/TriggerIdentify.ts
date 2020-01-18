
import {Syntax, Types} from "lang-coach";
import ObjectLink from "./ObjectLink";
import SchemaTable from "./SchemaTable";
import GrapeQLCoach from "../GrapeQLCoach";

export default class TriggerIdentify extends Syntax<TriggerIdentify> {
    structure() {
        return {
            name: Types.String,
            schema: Types.String,
            table: Types.String
        };
    }

    is(coach: GrapeQLCoach) {
        return coach.is(ObjectLink);
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        // trigger name
        data.name = coach.readWord();

        // on table
        coach.expectWord("on");

        const schemaTable = coach.parse(SchemaTable);

        data.schema = schemaTable.get("schema");
        data.table = schemaTable.get("table");
    }

    toString() {
        const {name, schema, table} = this.data;
        return `${name} on ${schema}.${table}`;
    }
}
