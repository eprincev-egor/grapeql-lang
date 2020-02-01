

import {Syntax, Types} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import allSyntax from "../allSyntax";

export default class Union extends Syntax<Union> {
    structure() {
        const Select = allSyntax.Select as GrapeQLCoach["syntax"]["Select"];

        return {
            union: Types.Boolean,
            except: Types.Boolean,
            intersect: Types.Boolean,
            all: Types.Boolean,
            distinct: Types.Boolean,
            select: Select
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Select = allSyntax.Select as GrapeQLCoach["syntax"]["Select"];

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

        data.select = coach.parse(Select);
    }

    is(coach: GrapeQLCoach) {
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

