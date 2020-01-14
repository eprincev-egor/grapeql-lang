"use strict";

import {Syntax, Types} from "lang-coach";
import FilePathElement from "./FilePathElement";

export default class File extends Syntax<File> {
    structure() {
        return {
            relative: Types.Boolean,
            path: Types.Array({
                element: FilePathElement
            })
        };
    }

    parse(coach, data) {
        data.path = [];

        if ( !coach.is(/\.*\//) ) {
            coach.expectWord("file");
        }

        if ( !coach.is("/") && !coach.is(".") ) {
            const elem = new FilePathElement({
                name: "."
            });

            data.path.push(elem);
        }

        if ( coach.is("/") ) {
            coach.i++;
        }

        this.parsePath(coach, data);

        // ./relative  or  /root
        data.relative = isRelativePath( data.path );
    }

    parsePath(coach, data) {
        const elem = coach.parseFilePathElement();
        data.path.push(elem);

        if ( coach.is(/\s*\//) ) {
            coach.read(/\s*\/+\s*/);

            this.parsePath(coach, data);
        }
    }

    is(coach) {
        return (
            coach.is(/\.*\//) || 
            coach.isWord("file")
        );
    }

    toString() {
        let out = this.data.path.map((elem) => elem.toString()).join("/");
        
        if ( !this.data.relative ) {
            out = "/" + out;
        }

        return out;
    }
}

function isRelativePath(path) {
    const firstPathElem = path[0];
    const firstName = firstPathElem.get("name");

    // path is:  /root
    if ( firstName && !/^\.+$/.test(firstName) ) {
        return false;
    }

    // path is:   ./relative
    return true;
}

