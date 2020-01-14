"use strict";

import {Syntax, Types} from "lang-coach";

export default class SchemaName<Child extends SchemaName = any> extends Syntax<SchemaName & Child> {
    structure() {
        return {
            schema: Types.String,
            name: Types.String
        };
    }

    is(coach) {
        return coach.isObjectLink();
    }

    parse(coach, data) {
        
        // name
        const i = coach.i;
        const objectLink = coach.parseObjectLink();
        const link = objectLink.get("link");

        if ( 
            link.length !== 2 &&
            link.length !== 1
        ) {
            coach.i = i;
            coach.throwError("invalid name " + objectLink.toString());
        }

        let schema = "public";
        let name = link[0].toLowerCase();
        if ( link.length === 2 ) {
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


