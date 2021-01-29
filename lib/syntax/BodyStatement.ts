
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {AssignVarStatement} from "./AssignVarStatement";
import {ReturnStatement} from "./ReturnStatement";
import {IfStatement} from "./IfStatement";
import {Select} from "./Select";
import {Insert} from "./Insert";
import {Update} from "./Update";
import {Delete} from "./Delete";
import {Raise} from "./Raise";

// a = 1;
// b = a;
// if ... then ... ;
// raise 'error';
// return x;

export class BodyStatement extends Syntax<BodyStatement> {
    structure() {
        return {
            statements: Types.Array({
                element: Syntax as any as (new (...args: any) => Syntax<any>)
            })
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        data.statements = [];

        while ( !coach.isEnd() ) {
            let statement: Syntax<any> | undefined;
            
            coach.skipSpace();

            if ( coach.is(ReturnStatement) ) {
                statement = coach.parse(ReturnStatement);
            }
            else if ( coach.is(IfStatement) ) {
                statement = coach.parse(IfStatement);
            }
            else if ( coach.is(Raise) ) {
                statement = coach.parse(Raise);
            }
            else if ( coach.is(Insert) ) {
                statement = coach.parse(Insert);
            }
            else if ( coach.is(Update) ) {
                statement = coach.parse(Update);
            }
            else if ( coach.is(Delete) ) {
                statement = coach.parse(Delete);
            }
            else if ( coach.is(Select) ) {
                statement = coach.parse(Select);
            }
            else if ( coach.is(AssignVarStatement) ) {
                statement = coach.parse(AssignVarStatement);
            }


            if ( statement ) {
                data.statements.push(statement);
                coach.expect(";");
            }
            else {
                break;
            }
        }
    }
    
    is(coach: GrapeQLCoach) {
        return true;
    }
    
    toString() {
        const row = this.row;
        const lines = row.statements!.map((elem) => 
            elem.toString()
        );
        const sql = lines.join(";\n") + ";";

        return sql;
    }
}
