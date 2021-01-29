
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {TableLink} from "./TableLink";
import {With} from "./With";
import {ObjectName} from "./ObjectName";
import {FromItem} from "./FromItem";
import {Expression} from "./Expression";
import {Returning} from "./Returning";

// true or false

export class Delete extends Syntax<Delete> {
    structure() {
        return {
            only: Types.Boolean({
                default: false
            }),
            star: Types.Boolean({
                default: false
            }),
            table: TableLink,
            as: ObjectName,
            using: Types.Array({
                element: FromItem
            }),
            with: With,
            where: Expression,
            returning: Returning
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {

        if ( coach.is(With) ) {
            data.with = coach.parse(With);
            coach.skipSpace();
        }

        coach.expectWord("delete");
        coach.expectWord("from");

        if ( coach.isWord("only") ) {
            coach.expectWord("only");

            data.only = true;
        }

        data.table = coach.parse(TableLink);
        coach.skipSpace();

        if ( coach.is("*") ) {
            coach.i++;
            coach.skipSpace();

            data.star = true;
        }

        if ( coach.isWord("as") ) {
            coach.expectWord("as");

            data.as = coach.parse(ObjectName);
            coach.skipSpace();
        }

        if ( coach.isWord("using") ) {
            coach.expectWord("using");

            data.using = coach.parseComma(FromItem);
        }

        if ( coach.isWord("where") ) {
            coach.expectWord("where");

            data.where = coach.parse(Expression);
        }

        if ( coach.is(Returning) ) {
            data.returning = coach.parse(Returning);
        }
    }

    is(coach: GrapeQLCoach) {
        if ( coach.isWord("delete") ) {
            return true;
        }
        if ( coach.is(With) ) {
            const index = coach.i;
            coach.parse(With);
            coach.skipSpace();

            const isDelete = coach.isWord("delete");
            coach.i = index;

            return isDelete;
        } else {
            return false;
        }
    }

    toString() {
        const row = this.row;
        let out = "";

        if ( row.with ) {
            out += row.with.toString();
            out += " ";
        }

        out += "delete from ";

        if ( row.only ) {
            out += "only ";
        }

        out += row.table!.toString();

        if ( row.star ) {
            out += " *";
        }

        if ( row.as ) {
            out += " as ";
            out += row.as.toString();
        }

        if ( row.using ) {
            out += " using ";
            out += row.using.map((fromItem) => fromItem.toString()).join(", ");
        }

        if ( row.where ) {
            out += " where ";
            out += row.where.toString();
        }

        if ( row.returning ) {
            out += " ";
            out += row.returning.toString();
        }

        return out;
    }
}
