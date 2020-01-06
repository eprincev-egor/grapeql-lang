"use strict";

import {Syntax} from "lang-coach";

export default class Union extends Syntax<Union> {
    structure() {
        const Select = Union.prototype.Coach.Select;

        return {
            union: "boolean",
            except: "boolean",
            intersect: "boolean",
            all: "boolean",
            distinct: "boolean",
            select: Select
        };
    }

    parse(coach, data) {

        // { UNION | INTERSECT | EXCEPT }
        if ( coach.isWord("intersect") ) {
            coach.expectWord("intersect");
            data.intersect = true;
        }
        else if ( coach.isWord("except") ) {
            coach.expectWord("except");
            data.except = true;
        }
        else {
            coach.expectWord("union");
            data.union = true;
        }
        

        // [ ALL | DISTINCT ]
        if ( coach.isWord("all") ) {
            coach.expectWord("all");
            data.all = true;
        }
        else if ( coach.isWord("distinct") ) {
            coach.expectWord("distinct");
            data.distinct = true;
        }

        data.select = coach.parseSelect();
    }

    is(coach) {
        return coach.is(/(union|intersect|except)\s+/i);
    }

    toString() {
        let out = "";

        if ( this.data.intersect ) {
            out += "intersect ";
        }
        else if ( this.data.except ) {
            out += "except ";
        }
        else {
            out += "union ";
        }

        if ( this.data.all ) {
            out += "all ";
        }
        else if ( this.data.distinct ) {
            out += "distinct ";
        }

        out += this.data.select.toString();

        return out;
    }
}

