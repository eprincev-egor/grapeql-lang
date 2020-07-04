
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {PgArgument} from "./PgArgument";
import {DataType} from "./DataType";

export class PgReturns extends Syntax<PgReturns> {
    structure() {
        return {
            setof: Types.Boolean,
            table: Types.Array({
                element: PgArgument
            }),
            type: Types.String
        };
    }

    is(coach: GrapeQLCoach) {
        return coach.is(DataType);
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.isWord("setof") ) {
            coach.expectWord("setof");
            
            data.setof = true;
        }

        if ( coach.isWord("table") ) {
            coach.expectWord("table");
            
            coach.expect("(");
            coach.skipSpace();

            data.table = coach.parseComma(PgArgument);

            coach.skipSpace();
            coach.expect(")");

        } else {
            data.type = coach.parseType();
        }
    }

    toString() {
        const returns = this.row;
        let out = "";

        if ( returns.setof ) {
            out += "setof ";
        }

        if ( returns.table ) {
            out += `table(${ 
                returns.table.map((arg) => 
                    arg.toString()
                ).join(", ") 
            })`;
        } else {
            out += returns.type;
        }

        return out;
    }
}
