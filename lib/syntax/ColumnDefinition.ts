
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

        // not null, unique, primary key, ...
        this.parseConstraints(coach, data);
    }

    parseConstraints(coach: GrapeQLCoach, data: this["TInputData"]) {
        // not null
        this.parseConstraint(coach, data);
        // check
        this.parseConstraint(coach, data);
        // primary key
        this.parseConstraint(coach, data);
        // unique
        this.parseConstraint(coach, data);
        // foreign key
        this.parseConstraint(coach, data);
    }

    parseConstraint(coach: GrapeQLCoach, data: this["TInputData"]) {
        
        this.parseNotNull(coach, data);
        this.parsePrimaryKey(coach, data);
        this.parseUnique(coach, data);
        this.parseCheck(coach, data);
        this.parseForeignKey(coach, data);

    }

    parseNotNull(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.isWord("not") ) {
            return;
        }

        if ( data.primaryKey ) {
            coach.throwError("column already defined as not null by primary key");
        }

        if ( data.nulls === false ) {
            coach.throwError("duplicate not null");
        }

        coach.expectWord("not");
        coach.expectWord("null");
        data.nulls = false;
    }

    parsePrimaryKey(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.is(PrimaryKeyConstraint) ) {
            return;
        }

        if ( data.nulls === false && !data.primaryKey ) {
            coach.throwError("column already defined as not null by primary key");
        }

        if ( data.primaryKey ) {
            coach.throwError("duplicate primary key");
        }

        data.nulls = false;
        data.primaryKey = coach.parse(PrimaryKeyConstraint, {
            column: data.name
        });
    }

    parseUnique(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.is(UniqueConstraint) ) {
            return;
        }

        if ( data.unique ) {
            coach.throwError("duplicate unique");
        }

        data.unique = coach.parse(UniqueConstraint, {
            column: data.name
        });
    }

    parseCheck(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.is(CheckConstraint) ) {
            return;
        }

        if ( data.check ) {
            coach.throwError("duplicate check");
        }

        data.check = coach.parse(CheckConstraint, {
            column: data.name
        });
    }

    parseForeignKey(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.is(ForeignKeyConstraint) ) {
            return;
        }

        if ( data.foreignKey ) {
            coach.throwError("duplicate foreign key");
        }

        data.foreignKey = coach.parse(ForeignKeyConstraint, {
            column: data.name
        });
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

        if ( data.unique ) {
            out += " ";
            out += data.unique.toString();
        }

        if ( data.check ) {
            out += " ";
            out += data.check.toString();
        }

        if ( data.foreignKey ) {
            out += " ";
            out += data.foreignKey.toString();
        }

        return out;
    }
}
