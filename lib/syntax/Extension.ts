
import {GrapeQLCoach} from "../GrapeQLCoach";
import {TableSyntax} from "./TableSyntax";
import {ObjectLink} from "./ObjectLink";
import {ObjectName} from "./ObjectName";

export class Extension extends TableSyntax<Extension> {
    structure() {
        return {
            ...super.structure(),
            name: ObjectName,
            forTable: ObjectLink
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.isWord("deprecated") ) {
            coach.expectWord("deprecated");
            data.deprecated = true;
        }

        if ( coach.isWord("create") ) {
            coach.expectWord("create");
        }

        coach.expectWord("extension");
        
        data.name = coach.parse(ObjectName);
        coach.skipSpace();

        coach.expectWord("for");
        data.forTable = coach.parse(ObjectLink);

        // (columns, constraints)
        if ( coach.is("(") ) {
            super.parseBody(coach, data);
        }
        
        if ( coach.isWord("deprecated") ) {
            coach.expectWord("deprecated");

            coach.expect("(");
            coach.skipSpace();

            data.deprecatedColumns = coach.parseComma(ObjectName);

            coach.skipSpace();
            coach.expect(")");
        }

        // values (...)
        super.parseValues(coach, data);
    }

    is(coach: GrapeQLCoach) {
        if ( coach.isWord("deprecated") ) {
            return true;
        }
        if ( coach.isWord("extension") ) {
            return true;
        }

        if ( !coach.isWord("create") ) {
            return false;
        }

        const checkpoint = coach.i;

        coach.expectWord("create");
        const isExtension = coach.isWord("extension");

        coach.i = checkpoint;
        return isExtension;
    }
    
    toString() {
        let out = "";
        
        if ( this.row.deprecated ) {
            out += "deprecated ";
        }

        out += "extension ";
        out += this.row.name!.toString();

        out += " for ";
        out += this.row.forTable!.toString();

        const hasBody = (
            this.row.columns!.length || 
            this.row.constraints!.length
        );
        if ( hasBody ) {
            out += super.bodyToString();
        }

        if ( this.row.deprecatedColumns!.length ) {
            out += " deprecated (";
            out += this.row.deprecatedColumns!.map((item) => 
                item.toString()
            ).join(", ");
            out += ")";
        }

        
        out += super.valuesToString();

        return out;
    }
}


