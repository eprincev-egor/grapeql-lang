

import {Syntax} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import ObjectLink from "./ObjectLink";

export default abstract class SchemaParse<Child extends SchemaParse = any> extends Syntax<Child> {
    /* istanbul ignore next */
    structure() {
        return {

        };
    }
    
    is(coach: GrapeQLCoach): boolean {
        return coach.is(ObjectLink);
    }

    parse(coach: GrapeQLCoach, data: any) {
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
}


