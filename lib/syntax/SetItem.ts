
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {ValueItem} from "./ValueItem";
import {ObjectName} from "./ObjectName";
import {Select} from "./Select";

/*
    column_name = { expression | DEFAULT }
    ( column_name [, ...] ) = ( { expression | DEFAULT } [, ...] )
    ( column_name [, ...] ) = ( sub-SELECT )
 */

export class SetItem extends Syntax<SetItem> {
    structure() {
        return {
            columns: Types.Array({
                element: ObjectName
            }),
            values: Types.Array({
                element: ValueItem
            }),
            select: Select,
            column: ObjectName,
            value: ValueItem
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.is("(") ) {
            coach.expect("(");
            coach.skipSpace();

            data.columns = coach.parseComma(ObjectName);

            coach.skipSpace();
            coach.expect(")");

            coach.skipSpace();
            coach.expect("=");
            coach.skipSpace();

            coach.expect("(");
            coach.skipSpace();

            if ( coach.is(Select) ) {
                data.select = coach.parse(Select);
            } else {
                data.values = coach.parseComma(ValueItem);
            }

            coach.skipSpace();
            coach.expect(")");
        } else {
            data.column = coach.parse(ObjectName);

            coach.skipSpace();
            coach.expect("=");
            coach.skipSpace();

            data.value = coach.parse(ValueItem);
        }
    }

    is(coach: GrapeQLCoach) {
        return coach.is("(") || coach.is(ObjectName);
    }

    toString() {
        const row = this.row;
        let out = "";

        if ( row.columns ) {
            out += "(";
            out += row.columns.map((name) => name.toString()).join(", ");
            out += ")";

            out += " = ";
            out += "(";

            if ( row.select ) {
                out += row.select.toString();
            } else {
                out += row.values.map((valueItem) => valueItem.toString()).join(", ");
            }

            out += ")";
        } else {
            out += row.column.toString();
            out += " = ";
            out += row.value.toString();
        }

        return out;
    }
}
