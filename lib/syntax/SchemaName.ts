"use strict";

import {Syntax, Types} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import ObjectLink from "./ObjectLink";

export default class SchemaName<Child extends SchemaName = any> extends Syntax<SchemaName & Child> {
    structure() {
        return {
            schema: Types.String,
            name: Types.String
        };
    }

    is(coach: GrapeQLCoach) {
        return coach.is(ObjectLink);
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        
        // name
        const i = coach.i;
        const objectLink = coach.parse(ObjectLink);
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


