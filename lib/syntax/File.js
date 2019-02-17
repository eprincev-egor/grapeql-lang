"use strict";

const {Syntax} = require("lang-coach");
const FilePathElement = require("./FilePathElement");

class File extends Syntax {
    static structure() {
        return {
            path: [FilePathElement]
        };
    }

    static parse(coach, data) {
        data.path = [];

        if ( !coach.is(/\.*\//) ) {
            coach.expectWord("file");
        }

        if ( !coach.is("/") && !coach.is(".") ) {
            let elem = new FilePathElement({
                name: "."
            });

            data.path.push(elem);
        }

        if ( coach.is("/") ) {
            coach.i++;
        }

        let oldLength = data.path.length;
        File.parsePath(coach, data);

        if ( data.path.length == oldLength ) {
            coach.throwError("expected file name");
        }
    }

    static parsePath(coach, data) {
        let elem = coach.parseFilePathElement();
        data.path.push(elem);

        if ( coach.is(/\s*\//) ) {
            coach.skipSpace();
            coach.read(/\/+/);
            coach.skipSpace();

            File.parsePath(coach, data);
        }
    }

    static is(coach) {
        return (
            coach.is(/\.*\//) || 
            coach.isWord("file")
        );
    }

    toString() {
        let out = this.data.path.map(elem => elem.toString()).join("/");

        if ( !/^\.+$/.test(this.data.path[0].name) ) {
            out = "/" + out;
        }

        return out;
    }
}

module.exports = File;