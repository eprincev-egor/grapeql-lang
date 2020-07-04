
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {ColumnDefinition} from "./ColumnDefinition";
import {ForeignKeyConstraint} from "./ForeignKeyConstraint";
import {CheckConstraint} from "./CheckConstraint";
import {UniqueConstraint} from "./UniqueConstraint";
import {PrimaryKeyConstraint} from "./PrimaryKeyConstraint";

export class CreateTableElement extends Syntax<CreateTableElement> {
    structure() {
        return {
            element: Types.Or({
                or: [
                    ColumnDefinition,
                    ForeignKeyConstraint,
                    CheckConstraint,
                    UniqueConstraint,
                    PrimaryKeyConstraint
                ]
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.is(ForeignKeyConstraint) ) {
            data.element = coach.parse(ForeignKeyConstraint);
        }
        else if ( coach.is(UniqueConstraint) ) {
            data.element = coach.parse(UniqueConstraint);
        }
        else if ( coach.is(PrimaryKeyConstraint) ) {
            data.element = coach.parse(PrimaryKeyConstraint);
        }
        else if ( coach.is(CheckConstraint) ) {
            data.element = coach.parse(CheckConstraint);
        }
        else {
            data.element = coach.parse(ColumnDefinition);
        }
    }
    
    is(coach: GrapeQLCoach) {
        return (
            coach.is(ForeignKeyConstraint) ||
            coach.is(UniqueConstraint) ||
            coach.is(PrimaryKeyConstraint) ||
            coach.is(CheckConstraint) ||
            coach.is(ColumnDefinition)
        );
    }
    
    toString() {
        return this.row.element.toString();
    }
}


