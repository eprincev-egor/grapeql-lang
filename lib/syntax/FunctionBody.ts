
import {Syntax, Types} from "lang-coach";
import { GrapeQLCoach } from "../GrapeQLCoach";
import { Declare } from "./Declare";
import { BodyStatement } from "./BodyStatement";

// declare a text, b numeric;
// begin
// return a + b;
// end

export class FunctionBody extends Syntax<FunctionBody> {
    structure() {
        return {
            declares: Types.Array({
                element: Declare
            }),
            body: BodyStatement
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        data.declares = [];
        while ( coach.is(Declare) ) {
            const declare = coach.parse(Declare);
            data.declares.push(declare);

            coach.skipSpace();
            if ( !coach.is(";") ) {
                break;
            }
            coach.expect(";");
            coach.skipSpace();
        }

        coach.expectWord("begin");
        data.body = coach.parse(BodyStatement);
        coach.expectWord("end");
    }
    
    is(coach: GrapeQLCoach) {
        return (
            coach.is(Declare) ||
            coach.is(BodyStatement)
        );
    }
    
    toString() {
        const row = this.row;
        const declares = row.declares!.map((declare) =>
            declare.toString()
        );
        let sql = "";

        if ( declares.length ) {
            sql += declares.join(";\n") + ";\n";
        }

        sql += "begin\n";
        sql += row.body!.toString();
        sql += "\nend";

        return sql;
    }
}
