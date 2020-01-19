
import {Syntax, Types} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import CreateTableElement from "./CreateTableElement";
import ColumnDefinition from "./ColumnDefinition";
import ForeignKeyConstraint from "./ForeignKeyConstraint";
import CheckConstraint from "./CheckConstraint";
import UniqueConstraint from "./UniqueConstraint";
import PrimaryKeyConstraint from "./PrimaryKeyConstraint";

export default class CreateTable extends Syntax<CreateTable> {
    structure() {
        return {
            tableElements: Types.Array({
                element: Types.Or({
                    or: [
                        ColumnDefinition,
                        ForeignKeyConstraint,
                        CheckConstraint,
                        UniqueConstraint,
                        PrimaryKeyConstraint
                    ]
                })
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.isWord("create") ) {
            coach.expectWord("create");
        }

        coach.expectWord("table");

        coach.expect("(");
        coach.skipSpace();

        const elements = coach.parseComma(CreateTableElement);
        const tableElements = elements.map((element) => 
            element.get("element")
        );
        data.tableElements = tableElements;
        
        coach.skipSpace();
        coach.expect(")");
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("create") || coach.isWord("table");
    }
    
    toString() {
        const content = this.data.tableElements.map((item) => 
            item.toString()
        ).join(", ");

        return `table(${ content })`;
    }
}


