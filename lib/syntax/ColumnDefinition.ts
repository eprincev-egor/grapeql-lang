
import {Syntax, Types} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import ObjectName from "./ObjectName";
import DataType from "./DataType";
import ForeignKeyConstraint from "./ForeignKeyConstraint";
import CheckConstraint from "./CheckConstraint";
import UniqueConstraint from "./UniqueConstraint";
import PrimaryKeyConstraint from "./PrimaryKeyConstraint";
import Expression from "./Expression";

/*
column_name data_type [ COLLATE collation ] [ column_constraint [ ... ] ]

where column_constraint is:

{ NOT NULL |
  CHECK ( expression ) [ NO INHERIT ] |
  DEFAULT default_expr |
  UNIQUE index_parameters |
  PRIMARY KEY index_parameters |
  REFERENCES reftable [ ( refcolumn ) ] [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ]
    [ ON DELETE action ] [ ON UPDATE action ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]
 */
// TODO: index_parameters
// TODO: collate

export default class ColumnDefinition extends Syntax<ColumnDefinition> {
    structure() {
        return {
            name: ObjectName,
            type: DataType,
            nulls: Types.Boolean({
                default: true
            }),
            primaryKey: PrimaryKeyConstraint,
            unique: UniqueConstraint,
            foreignKey: ForeignKeyConstraint,
            check: CheckConstraint,
            default: Expression
        };
    }

    is(coach: GrapeQLCoach) {
        return coach.is(ObjectName);
    }
    
    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        data.name = coach.parse(ObjectName);
        coach.skipSpace();

        data.type = coach.parse(DataType);
        coach.skipSpace();

        this.parseConstraints(coach, data);
    }

    parseConstraints(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.is(PrimaryKeyConstraint) ) {
            data.nulls = false;
            data.primaryKey = coach.parse(PrimaryKeyConstraint, {
                column: data.name
            });
        }

        if ( coach.isWord("not") ) {
            coach.expectWord("not");
            coach.expectWord("null");
            data.nulls = false;
        }

        if ( coach.is(CheckConstraint) ) {
            data.check = coach.parse(CheckConstraint, {
                column: data.name
            });
        }
    }

    toString() {
        const data = this.data;
        let out = "";

        out += data.name.toString();
        out += " ";
        out += data.type.toString();

        if ( data.primaryKey ) {
            out += " ";
            out += data.primaryKey.toString();
        }
        else if ( data.nulls === false ) {
            out += " not null";
        }

        if ( data.check ) {
            out += " ";
            out += data.check.toString();
        }

        return out;
    }
}
