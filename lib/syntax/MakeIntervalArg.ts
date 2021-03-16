import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {extractFields, extractFieldsAliases} from "./Extract";
import allSyntax from "../allSyntax";

export class MakeIntervalArg extends Syntax<MakeIntervalArg> {
    structure() {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        return {
            type: Types.String,
            value: Expression
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        const i = coach.i;

        if ( coach.isWord() ) {
            const word = coach.readWord();
            if ( word in extractFieldsAliases || extractFields.includes(word) ) {

                data.type = word;

                coach.skipSpace();
                coach.expect(/:=|=>/);
                coach.skipSpace();

                data.value = coach.parse(Expression);
                return;
            }
        }

        coach.i = i;
        data.type = "number";
        data.value = coach.parse(Expression);
    }
    
    is(coach: GrapeQLCoach) {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];
        return coach.is(Expression);
    }
    
    toString() {
        if ( this.row.type === "number" ) {
            return this.row.value!.toString();
        }
        else {
            return `${this.row.type} => ${this.row.value}`;
        }
    }
}
