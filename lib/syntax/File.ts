
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {FilePathElement} from "./FilePathElement";

export class File extends Syntax<File> {
    structure() {
        return {
            relative: Types.Boolean,
            path: Types.Array({
                element: FilePathElement
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
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
        data.relative = isRelativePath( data.path as any );
    }

    parsePath(coach: GrapeQLCoach, data: this["TInputData"]) {
        const elem = coach.parse(FilePathElement);
        data.path!.push(elem);

        if ( coach.is(/\s*\//) ) {
            coach.read(/\s*\/+\s*/);

            this.parsePath(coach, data);
        }
    }

    is(coach: GrapeQLCoach) {
        return (
            coach.is(/\.*\//) || 
            coach.isWord("file")
        );
    }

    toString() {
        let out = this.row.path!.map((elem) => elem.toString()).join("/");
        
        if ( !this.row.relative ) {
            out = "/" + out;
        }

        return out;
    }
}

function isRelativePath(path: FilePathElement[]) {
    const firstPathElem = path[0];
    const firstName = firstPathElem.get("name");

    // path is:  /root
    if ( firstName && !/^\.+$/.test(firstName) ) {
        return false;
    }

    // path is:   ./relative
    return true;
}

