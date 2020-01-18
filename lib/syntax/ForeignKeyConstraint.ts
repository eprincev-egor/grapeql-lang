
import { Types } from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import Constraint from "./Constraint";
import ObjectName from "./ObjectName";
import ObjectLink from "./ObjectLink";

export default class ForeignKeyConstraint extends Constraint<ForeignKeyConstraint> {
    
    structure() {
        return {
            ...super.structure(),
            column: ObjectName,

            columns: Types.Array({
                element: ObjectName
            }),
            referenceTable: ObjectLink,
            referenceColumns: Types.Array({
                element: ObjectName
            }),
            match: Types.String({
                enum: [
                    "full",
                    "simple",
                    "partial"
                ]
            }),
            onDelete: Types.String({
                enum: [
                    "no action",
                    "restrict",
                    "cascade",
                    "set null",
                    "set default"
                ]
            }),
            onUpdate: Types.String({
                enum: [
                    "no action",
                    "restrict",
                    "cascade",
                    "set null",
                    "set default"
                ]
            })
        };
    }

    is(coach: GrapeQLCoach) {
        return (
            coach.isWord("references")  ||
            super.is(coach)
        );
    }

    parse(
        coach: GrapeQLCoach, 
        data: this["TInputData"], 
        options: this["IOptions"] = {column: null}
    ) {
        if ( options.column ) {
            data.column = options.column;
            data.columns = [options.column];
        }
        else {
            super.parseName(coach, data);

            coach.expectWord("foreign");
            coach.expectWord("key");
            coach.expect("(");
            coach.skipSpace();
    
            data.columns = coach.parseComma(ObjectName);
    
            coach.skipSpace();
            coach.expect(")");
            coach.skipSpace();
        }

        coach.expectWord("references");

        data.referenceTable = coach.parse(ObjectLink);

        if ( coach.is("(") ) {
            coach.expect("(");
            coach.skipSpace();

            data.referenceColumns = coach.parseComma(ObjectName);
            
            coach.skipSpace();
            coach.expect(")");
            coach.skipSpace();
        }

        if ( coach.isWord("match") ) {
            coach.expectWord("match");

            if ( coach.isWord("full") ) {
                coach.expectWord("full");

                data.match = "full";
            }
            else if ( coach.isWord("simple") ) {
                coach.expectWord("simple");

                data.match = "simple";
            }
            else {
                coach.expectWord("partial");

                data.match = "partial";
            }
        }

        this.parseOnAction(coach, data);
        this.parseOnAction(coach, data);
    }

    parseOnAction(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !data.onDelete && coach.is(/on\s+delete/i) ) {
            coach.expectWord("on");
            coach.expectWord("delete");
    
            data.onDelete = this.parseAction(coach);
        }
    
        if ( !data.onUpdate && coach.is(/on\s+update/i) ) {
            coach.expectWord("on");
            coach.expectWord("update");
    
            data.onUpdate = this.parseAction(coach);
        }
    }

    parseAction(coach: GrapeQLCoach) {
        if ( coach.isWord("no") ) {
            coach.expectWord("no");
            coach.expectWord("action");
    
            return "no action";
        }
        else if ( coach.isWord("restrict") ) {
            coach.expectWord("restrict");
    
            return "restrict";
        }
        else if ( coach.isWord("cascade") ) {
            coach.expectWord("cascade");
    
            return "cascade";
        }
        else {
            coach.expectWord("set");
    
            if ( coach.isWord("null") ) {
                coach.expectWord("null");
    
                return "set null";
            } else {
                coach.expectWord("default");
    
                return "set default";
            }
        }
    }
    
    toString() {
        const {
            columns, 
            referenceTable, 
            referenceColumns,
            match,
            onDelete,
            onUpdate,
            column
        } = this.data;

        let out = "";

        if ( !column ) {
            out += super.toString();

            out += " foreign key ( ";
            out += columns.map((name) => name.toString()).join(", ");
            out += " ) ";
        }
        
        out += "references ";
        out += referenceTable.toString();

        if ( referenceColumns ) {
            out += " ( ";
            out += referenceColumns.map((name) => name.toString()).join(", ");
            out += " )";
        }

        if ( match ) {
            out += " match ";
            out += match;
        }
        
        if ( onDelete ) {
            out += " on delete ";
            out += onDelete;
        }

        if ( onUpdate ) {
            out += " on update ";
            out += onUpdate;
        }
        
        return out;
    }
}

