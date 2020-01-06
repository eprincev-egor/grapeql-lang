"use strict";

import {Syntax} from "lang-coach";

export default class SchemaName extends Syntax<SchemaName> {
    structure() {
        return {
            schema: "text",
            name: "text"
        };
    }

    is(coach) {
        return coach.isObjectLink();
    }

    parse(coach, data) {
        
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


