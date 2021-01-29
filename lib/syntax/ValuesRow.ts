
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {ValueItem} from "./ValueItem";

export class ValuesRow extends Syntax<ValuesRow> {
    structure() {
        return {
            values: Types.Array({
                element: ValueItem
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expect("(");
        coach.skipSpace();

        data.values = coach.parseComma(ValueItem);

        coach.skipSpace();
        coach.expect(")");
    }

    is(coach: GrapeQLCoach) {
        return coach.is("(");
    }

    toString() {
        let out = "(";

        out += this.row.values!.map((valueItem) => valueItem.toString()).join(", ");

        out += ")";
        return out;
    }
}
