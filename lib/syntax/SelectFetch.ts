"use strict";

import {Syntax, Types} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";

export default class SelectFetch extends Syntax<SelectFetch> {
    structure() {
        return {
            first: Types.Boolean,
            next: Types.Boolean,
            row: Types.Boolean,
            rows: Types.Boolean,
            count: Types.Number
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
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

    is(coach: GrapeQLCoach) {
        return coach.isWord("fetch");
    }

    toString() {
        const data = this.data;
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

