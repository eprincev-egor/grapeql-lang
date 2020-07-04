
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {ObjectName} from "./ObjectName";
import {DataType} from "./DataType";
import {Expression} from "./Expression";

// https://www.postgresql.org/docs/10/plpgsql-declarations.html
// name [ CONSTANT ] type [ COLLATE collation_name ] [ NOT NULL ] [ { DEFAULT | := | = } expression ];

// TODO: add support:
// name ALIAS FOR $n;

export class VariableDefinition extends Syntax<VariableDefinition> {
    structure() {
        return {
            name: ObjectName,
            type: DataType,
            collate: ObjectName,
            nulls: Types.Boolean({
                default: true
            }),
            default: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        
        data.name = coach.parse(ObjectName);
        coach.skipSpace();

        data.type = coach.parse(DataType);
        coach.skipSpace();

        if ( coach.isWord("collate") ) {
            coach.expectWord("collate");
            data.collate = coach.parse(ObjectName);
            coach.skipSpace();
        }

        if ( coach.isWord("not") ) {
            coach.expectWord("not");
            coach.expectWord("null");
            data.nulls = false;
        }

        if ( coach.isWord("default") ) {
            coach.expectWord("default");
            data.default = coach.parse(Expression);
        }
        else if ( coach.is(/:=|=/) ) {
            coach.expect(/:=|=/);
            coach.skipSpace();
            data.default = coach.parse(Expression);
        }
    }

    is(coach: GrapeQLCoach) {
        return coach.is(ObjectName);
    }

    toString() {
        const row = this.row;
        let sql = "";

        sql += row.name.toString();
        sql += " ";
        sql += row.type.toString();

        if ( row.collate ) {
            sql += " collate ";
            sql += row.collate.toString();
        }

        if ( row.nulls === false ) {
            sql += " not null";
        }

        if ( row.default ) {
            sql += " = ";
            sql += row.default.toString();
        }

        return sql;
    }

    toLowerCase() {
        return this.row.name.toLowerCase();
    }
}


