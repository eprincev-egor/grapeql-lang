"use strict";

import SchemaName from "./SchemaName";

export default class SchemaTable extends SchemaName<SchemaTable> {
    structure() {
        return {
            schema: "text",
            table: "text"
        };
    }

    parse(coach, data) {
        SchemaName.parse(coach, data);
        
        data.table = data.name;
        delete data.name;
    }

    toString() {
        return `${this.data.schema}.${this.data.table}`;
    }
}


