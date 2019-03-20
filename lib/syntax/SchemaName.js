"use strict";

const {Syntax} = require("lang-coach");

class SchemaName extends Syntax {
    static structure() {
        return {
            schema: "text",
            name: "text"
        };
    }

    static is(coach) {
        return coach.isObjectLink();
    }

    static parse(coach, data) {
        
        // name
        let i = coach.i;
        let objectLink = coach.parseObjectLink();
        let link = objectLink.get("link");

        if ( 
            link.length != 2 &&
            link.length != 1
        ) {
            coach.i = i;
            coach.throwError("invalid name " + objectLink.toString());
        }

        let schema = "public";
        let name = link[0].toLowerCase();
        if ( link.length == 2 ) {
            schema = name;
            name = link[1].toLowerCase();
        }
        
        data.schema = schema;
        data.name = name;
    }

    toString() {
        return `${this.data.schema}.${this.data.name}`;
    }
}

module.exports = SchemaName;
