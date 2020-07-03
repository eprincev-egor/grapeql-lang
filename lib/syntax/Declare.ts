
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import { VariableDefinition } from "./VariableDefinition";

// declare a text, b numeric

export class Declare extends Syntax<Declare> {
    structure() {
        return {
            variables: Types.Array({
                element: VariableDefinition
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("declare");
        data.variables = coach.parseComma(VariableDefinition);
    }
    
    is(coach: GrapeQLCoach) {
        return coach.isWord("declare");
    }
    
    toString() {
        const row = this.row;
        const variables = row.variables.map((variable) =>
            variable.toString()
        );

        const sql = `declare ` + variables.join(", ");
        return sql;
    }
}
