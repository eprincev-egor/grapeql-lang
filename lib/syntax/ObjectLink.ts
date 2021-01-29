
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {ObjectName} from "./ObjectName";

export class ObjectLink extends Syntax<ObjectLink> {
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

    parse(coach: GrapeQLCoach, data: this["TInputData"], options: any) {
        options = options || {availableStar: false};
        data.link = [];

        this.parseLink(coach, data, options);
    }

    parseLink(coach: GrapeQLCoach, data: this["TInputData"], options: any) {

        if ( options.availableStar && coach.is(/\s*\*/) ) {
            coach.skipSpace();
            coach.expect("*");

            data.star = true;
            return;
        }


        const elem = coach.parse(ObjectName);
        data.link!.push( elem );

        if ( coach.is(/\s*\./) ) {
            coach.skipSpace();
            coach.i++; // .
            coach.skipSpace();

            this.parseLink( coach, data, options );
        }
    }

    is(coach: GrapeQLCoach, str: string, options: any) {
        options = options || {availableStar: false};

        return (
            ObjectName.prototype.is(coach) ||
            // select *
            options.availableStar &&
            str[0] === "*"
        );
    }

    toString() {
        const elems = this.row.link!.map((elem) =>
            elem.toString()
        );
        let str = elems.join(".");

        if ( this.row.star ) {
            if ( elems.length ) {
                str += ".";
            }
            str += "*";
        }
        
        return str;
    }

    isStar() {
        return this.row.star;
    }

    first() {
        return this.row.link![0];
    }

    last() {
        return this.row.link![ this.row.link!.length - 1 ];
    }
    
    clear() {
        this.set({
            link: []
        });
    }

    push(objectName: string | ObjectName) {
        if ( typeof objectName === "string" ) {
            objectName = new ObjectName({
                word: objectName
            });
        }

        const link = this.row.link!.slice();
        link.push( objectName );

        this.set({
            link
        });
    }
}


