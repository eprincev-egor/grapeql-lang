"use strict";

import SchemaName from "./SchemaName";
import { Types } from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";

export default class SchemaTable extends SchemaName<SchemaTable> {
    structure() {
        return {
            schema: Types.String,
            name: Types.String,
            table: Types.String
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        super.parse(coach, data);
        
        data.table = data.name;
        delete data.name;
    }

    toString() {
        return `${this.data.schema}.${this.data.table}`;
    }
}


