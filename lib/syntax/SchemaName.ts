

import {Types} from "lang-coach";
import SchemaParse from "./SchemaParse";

export default class SchemaName extends SchemaParse<SchemaName> {
    structure() {
        return {
            schema: Types.String,
            name: Types.String
        };
    }

    toString() {
        return `${this.row.schema}.${this.row.name}`;
    }
}


