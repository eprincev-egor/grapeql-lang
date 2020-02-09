
import {GrapeQLCoach} from "../GrapeQLCoach";
import TableSyntax from "./TableSyntax";
import ObjectLink from "./ObjectLink";

export default class Extension extends TableSyntax<Extension> {
    structure() {
        return {
            ...super.structure(),
            forTable: ObjectLink
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.isWord("create") ) {
            coach.expectWord("create");
        }

        coach.expectWord("extension");
        coach.expectWord("for");
        data.forTable = coach.parse(ObjectLink);

        // (columns, constraints)
        if ( coach.is("(") ) {
            super.parseBody(coach, data);
        }
        
        // values (...)
        super.parseValues(coach, data);
    }

    is(coach: GrapeQLCoach) {
        return coach.is(/(create\s+)?extension/i);
    }
    
    toString() {
        let out = "extension for ";
        out += this.row.forTable.toString();

        const hasBody = (
            this.row.columns.length || 
            this.row.constraints.length
        );
        if ( hasBody ) {
            out += super.bodyToString();
        }
        
        out += super.valuesToString();

        return out;
    }
}


