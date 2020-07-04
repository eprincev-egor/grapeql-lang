
import {Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {SchemaParse} from "./SchemaParse";

export class SchemaTable extends SchemaParse<SchemaTable> {
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
        return `${this.row.schema}.${this.row.table}`;
    }
}
