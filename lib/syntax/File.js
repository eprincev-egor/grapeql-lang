"use strict";

const {Syntax} = require("lang-coach");
const FilePathElement = require("./FilePathElement");

class File extends Syntax {
    static structure() {
        return {
            relative: "boolean",
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

        File.parsePath(coach, data);

        // ./relative  or  /root
        data.relative = isRelativePath( data.path );
    }

    static parsePath(coach, data) {
        let elem = coach.parseFilePathElement();
        data.path.push(elem);

        if ( coach.is(/\s*\//) ) {
            coach.read(/\s*\/+\s*/);

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
        
        if ( !this.data.relative ) {
            out = "/" + out;
        }

        return out;
    }
}

function isRelativePath(path) {
    let firstPathElem = path[0];
    let firstName = firstPathElem.get("name");

    // path is:  /root
    if ( firstName && !/^\.+$/.test(firstName) ) {
        return false;
    }

    // path is:   ./relative
    return true;
}

module.exports = File;