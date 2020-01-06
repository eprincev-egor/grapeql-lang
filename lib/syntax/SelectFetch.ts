"use strict";

import {Syntax} from "lang-coach";

export default class SelectFetch extends Syntax<SelectFetch> {
    structure() {
        return {
            first: "boolean",
            next: "boolean",
            row: "boolean",
            rows: "boolean",
            count: "number"
        };
    }

    parse(coach, data) {
        coach.expectWord("fetch");

        if ( coach.isWord("first") ) {
            coach.expectWord("first");
            data.first = true;
        }
        else {
            coach.expectWord("next");
            data.next = true;
        }

        // count ?
        if ( coach.is(/\d/) ) {
            data.count = +coach.expect(/\d+/);
            coach.skipSpace();
        }

        // { ROW | ROWS } ONLY
        if ( coach.isWord("rows") ) {
            coach.expectWord("rows");
            data.rows = true;
        }
        else {
            coach.expectWord("row");
            data.row = true;
        }
        
        coach.expectWord("only");
    }

    is(coach) {
        return coach.isWord("fetch");
    }

    toString() {
        let data = this.data;
        let out = "";

        out += "fetch ";

        if ( data.first ) {
            out += "first ";
        }
        else {
            out += "next ";
        }

        if ( data.count !== null ) {
            out += data.count + " ";
        }

        if ( data.rows ) {
            out += "rows ";
        }
        else {
            out += "row ";
        }

        out += "only";

        return out;
    }
}

