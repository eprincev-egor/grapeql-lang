import { GrapeQLCoach, With, TableLink, ObjectName, FromItem, Expression } from "../GrapeQLCoach";
import { Types, Syntax } from "lang-coach";
import {SetItem} from "./SetItem";
import {Returning} from "./Returning";

export class Update extends Syntax<Update> {
    structure() {
        return {
            with: With,
            only: Types.Boolean({
                default: false
            }),
            table: TableLink,
            as: ObjectName,
            star: Types.Boolean({
                default: false
            }),
            set: Types.Array({
                element: SetItem
            }),
            from: Types.Array({
                element: FromItem
            }),
            where: Expression,
            returning: Returning
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        
        if ( coach.is(With) ) {
            data.with = coach.parse(With);
            coach.skipSpace();
        }

        coach.expectWord("update");

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

            const i = coach.i;
            data.as = coach.parse(ObjectName);

            coach.skipSpace();

            if ( data.as.toLowerCase()[0] === "$" ) {
                coach.i = i;
                coach.throwError("$ is reserved symbol for alias");
            }
        }

        coach.expectWord("set");

        data.set = coach.parseComma(SetItem);
        coach.skipSpace();

        if ( coach.isWord("from") ) {
            coach.expectWord("from");

            data.from = coach.parseComma(FromItem);
            coach.skipSpace();
        }

        if ( coach.isWord("where") ) {
            coach.expectWord("where");

            data.where = coach.parse(Expression);
        }

        if ( coach.isWord("returning") ) {
            data.returning = coach.parse(Returning);
        }
    }

    is(coach) {
        if ( coach.isWord("update") ) {
            return true;
        }
        if ( coach.isWith() ) {
            const index = coach.i;
            coach.parseWith();
            coach.skipSpace();

            const isInsert = coach.isWord("update");
            coach.i = index;

            return isInsert;
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

        out += "update ";

        if ( row.only ) {
            out += "only ";
        }

        out += row.table.toString();

        if ( row.star ) {
            out += " *";
        }

        if ( row.as ) {
            out += " as ";
            out += row.as.toString();
        }

        out += " set ";
        out += row.set.map((setItem) => setItem.toString()).join(", ");

        if ( row.from ) {
            out += " from ";
            out += row.from.map((fromItem) => fromItem.toString()).join(", ");
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

