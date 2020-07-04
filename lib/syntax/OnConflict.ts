
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {ConflictTargetItem} from "./ConflictTargetItem";
import {ObjectName} from "./ObjectName";
import {Expression} from "./Expression";
import {SetItem} from "./SetItem";

export class OnConflict extends Syntax<OnConflict> {
    structure() {
        return {
            target: Types.Array({
                element: ConflictTargetItem
            }),
            constraint: ObjectName,
            where: Expression,
            doNothing: Types.Boolean,
            updateSet: Types.Array({
                element: SetItem
            }),
            updateWhere: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("on");
        coach.expectWord("conflict");

        // conflict_target
        if ( coach.is("(") ) {
            coach.expect("(");
            coach.skipSpace();

            data.target = coach.parseComma(ConflictTargetItem);

            coach.skipSpace();
            coach.expect(")");
        }
        else if ( coach.isWord("on") ) {
            coach.expectWord("on");
            coach.expectWord("constraint");

            data.constraint = coach.parse(ObjectName);
        }
        coach.skipSpace();

        if ( coach.isWord("where") ) {
            coach.expectWord("where");

            data.where = coach.parse(Expression);
        }

        // conflict_action
        coach.expectWord("do");

        if ( coach.isWord("nothing") ) {
            coach.expectWord("nothing");
            data.doNothing = true;
        } else {
            coach.expectWord("update");
            coach.expectWord("set");

            data.updateSet = coach.parseComma(SetItem);
            coach.skipSpace();

            if ( coach.isWord("where") ) {
                coach.expectWord("where");

                data.updateWhere = coach.parse(Expression);
            }
        }
    }

    is(coach: GrapeQLCoach) {
        return coach.isWord("on");
    }

    toString() {
        const row = this.row;
        let out = "on conflict ";

        if ( row.target ) {
            out += "(";
            out += row.target.map((item) => item.toString()).join(", ");
            out += ")";
        }
        else if ( row.constraint ) {
            out += "on constraint ";
            out += row.constraint.toString();
        }

        if ( row.where ) {
            out += " where ";
            out += row.where.toString();
        }

        if ( row.doNothing ) {
            out += "do nothing";
        } else {
            out += "do update set ";
            out += row.updateSet.map((setItem) => setItem.toString()).join(", ");

            if ( row.updateWhere ) {
                out += " where ";
                out += row.updateWhere.toString();
            }
        }

        return out;
    }
}

