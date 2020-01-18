

import SchemaParse from "./SchemaParse";
import { Types } from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";

export default class SchemaTable extends SchemaParse<SchemaTable> {
    structure() {
        return {
            schema: Types.String,
            table: Types.String
        };
    }

    parse(coach: GrapeQLCoach, data) {
        super.parse(coach, data);
        
        data.table = data.name;
        delete data.name;
    }

    toString() {
        return `${this.data.schema}.${this.data.table}`;
    }
}


