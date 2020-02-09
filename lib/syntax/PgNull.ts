

import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";

export default class PgNull extends Syntax<PgNull> {
    structure() {
        return {
            null: Types.Boolean({
                default: true
            })
        };
    }

    is(coach: GrapeQLCoach) {
        return coach.isWord("null");
    }

    parse(coach: GrapeQLCoach) {
        coach.expectWord("null");
    }

    toString() {
        return "null";
    }
}

