"use strict";

const {Syntax} = require("lang-coach");
const ObjectName = require("./ObjectName");

class ObjectLink extends Syntax {
    static structure() {
        return {
            star: {
                type: "boolean",
                nullAsFalse: true
            },
            link: [ObjectName]
        };
    }

    static parse(coach, data, options) {
        options = options || {availableStar: false};
        data.link = [];

        ObjectLink.parseLink(coach, data, options);
    }

    static parseLink(coach, data, options) {

        if ( options.availableStar && coach.is(/\s*\*/) ) {
            coach.skipSpace();
            coach.expect("*");

            data.star = true;
            return;
        }


        let elem = coach.parseObjectName();
        data.link.push( elem );

        if ( coach.is(/\s*\./) ) {
            coach.skipSpace();
            coach.i++; // .
            coach.skipSpace();

            ObjectLink.parseLink( coach, data, options );
        }
    }

    static is(coach, str, options) {
        options = options || {availableStar: false};

        return (
            ObjectName.is(coach, str) ||
            // select *
            options.availableStar &&
            str[0] == "*"
        );
    }

    toString() {
        let elems = this.data.link.map(elem =>
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
        this.set("link", []);
    }

    push(objectName) {
        if ( typeof objectName == "string" ) {
            objectName = new ObjectName({
                word: objectName
            });
        }

        let link = this.data.link.slice();
        link.push( objectName );

        this.set("link", link);
    }
}

module.exports = ObjectLink;
