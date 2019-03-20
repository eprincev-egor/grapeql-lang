"use strict";

const SchemaName = require("./SchemaName");

class SchemaTable extends SchemaName {
    static structure() {
        return {
            schema: "text",
            table: "text"
        };
    }

    static parse(coach, data) {
        SchemaName.parse(coach, data);
        
        data.table = data.name;
        delete data.name;
    }

    toString() {
        return `${this.data.schema}.${this.data.table}`;
    }
}

module.exports = SchemaTable;
