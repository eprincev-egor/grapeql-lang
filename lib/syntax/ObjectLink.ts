"use strict";

import {Syntax, Types} from "lang-coach";
import ObjectName from "./ObjectName";
import GrapeQLCoach from "../GrapeQLCoach";

export default class ObjectLink extends Syntax<ObjectLink> {
    structure() {
        return {
            star: Types.Boolean({
                nullAsFalse: true
            }),
            link: Types.Array({
                element: ObjectName
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"], options) {
        options = options || {availableStar: false};
        data.link = [];

        this.parseLink(coach, data, options);
    }

    parseLink(coach: GrapeQLCoach, data: this["TInputData"], options) {

        if ( options.availableStar && coach.is(/\s*\*/) ) {
            coach.skipSpace();
            coach.expect("*");

            data.star = true;
            return;
        }


        const elem = coach.parse(ObjectName);
        data.link.push( elem );

        if ( coach.is(/\s*\./) ) {
            coach.skipSpace();
            coach.i++; // .
            coach.skipSpace();

            this.parseLink( coach, data, options );
        }
    }

    is(coach: GrapeQLCoach, str: string, options) {
        options = options || {availableStar: false};

        return (
            ObjectName.prototype.is(coach) ||
            // select *
            options.availableStar &&
            str[0] === "*"
        );
    }

    toString() {
        const elems = this.data.link.map((elem) =>
            elem.toString()
        );
        let str = elems.join(".");

        if ( this.data.star ) {
            if ( elems.length ) {
                str += ".";
            }
            str += "*";
        }
        
        return str;
    }

    isStar() {
        return this.data.star;
    }

    first() {
        return this.data.link[0];
    }

    last() {
        return this.data.link[ this.data.link.length - 1 ];
    }
    
    clear() {
        this.set({
            link: []
        });
    }

    push(objectName) {
        if ( typeof objectName === "string" ) {
            objectName = new ObjectName({
                word: objectName
            });
        }

        const link = this.data.link.slice();
        link.push( objectName );

        this.set({
            link
        });
    }
}


