
import {Syntax} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import allSyntax from "../allSyntax";
import {PgNull} from "./PgNull";
import {Boolean} from "./Boolean";
import {PgNumber} from "./PgNumber";
import {ByteString} from "./ByteString";
import {DollarString} from "./DollarString";
import {SingleQuotesString} from "./SingleQuotesString";
import {SystemVariable} from "./SystemVariable";
import {Cast} from "./Cast";
import {PgArray} from "./PgArray";
import {CaseWhen} from "./CaseWhen";
import {Extract} from "./Extract";
import {MakeInterval} from "./MakeInterval";
import {Substring} from "./Substring";
import {Position} from "./Position";
import {Overlay} from "./Overlay";
import {Interval} from "./Interval";
import {Exists} from "./Exists";
import {Any} from "./Any";
import {In} from "./In";
import {FunctionCall} from "./FunctionCall";
import {ColumnLink} from "./ColumnLink";
import { Trim } from "./Trim";

export class ExpressionElement extends Syntax<ExpressionElement> {

    structure() {
        return {
            element: Syntax as any as (new (...args: any) => Syntax<any>)
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"], options: any) {
        const Select = allSyntax.Select as  GrapeQLCoach["syntax"]["Select"];
        options = options || {availableStar: false};

        if ( coach.is(PgNull) ) {
            data.element = coach.parse(PgNull);
        }

        else if ( coach.is(Boolean) ) {
            data.element = coach.parse(Boolean);
        }

        else if ( coach.is(PgNumber) ) {
            data.element = coach.parse(PgNumber);
        }

        else if ( coach.is(ByteString) ) {
            data.element = coach.parse(ByteString);
        }

        else if ( coach.is(DollarString) ) {
            data.element = coach.parse(DollarString);
        }

        else if ( coach.is(SingleQuotesString) ) {
            data.element = coach.parse(SingleQuotesString);
        }

        else if ( coach.is(SystemVariable) ) {
            data.element = coach.parse(SystemVariable);
        }

        else if ( coach.is(Trim) ) {
            data.element = coach.parse(Trim);
        }

        else if ( coach.is(Cast) ) {
            data.element = coach.parse(Cast);
        }

        else if ( coach.is(PgArray) ) {
            data.element = coach.parse(PgArray);
        }

        else if ( coach.is(CaseWhen) ) {
            data.element = coach.parse(CaseWhen);
        }

        else if ( coach.is(Extract) ) {
            data.element = coach.parse(Extract);
        }

        else if ( coach.is(MakeInterval) ) {
            data.element = coach.parse(MakeInterval);
        }

        else if ( coach.is(Substring) ) {
            data.element = coach.parse(Substring);
        }

        else if ( coach.is(Position) ) {
            data.element = coach.parse(Position);
        }

        else if ( coach.is(Overlay) ) {
            data.element = coach.parse(Overlay);
        }

        else if ( coach.is(Interval) ) {
            data.element = coach.parse(Interval);
        }

        else if ( coach.is(Exists) ) {
            data.element = coach.parse(Exists);
        }

        else if ( coach.is(Any) ) {
            data.element = coach.parse(Any);
        }

        else if ( coach.is(In) ) {
            data.element = coach.parse(In);
        }

        else if ( coach.is(Select) ) {
            data.element = coach.parse(Select);
        }

        else if ( coach.is(FunctionCall) ) {
            data.element = coach.parse(FunctionCall);
        }

        else if ( coach.is(ColumnLink, { 
            availableStar: options.availableStar
        }) ) {
            data.element = coach.parse(ColumnLink, { 
                availableStar: options.availableStar
            });
        }

        else {
            coach.throwError("expected any expression element");
        }
    }

    is(coach: GrapeQLCoach, str: string, options: any): boolean {
        return (
            coach.is(PgNull) ||
            coach.is(Boolean) ||
            coach.is(PgNumber) ||
            coach.is(SystemVariable) ||
            coach.is(ByteString) ||
            coach.is(DollarString) ||
            coach.is(SingleQuotesString) ||
            coach.is(Cast) ||
            coach.is(Trim) ||
            coach.is(PgArray) ||
            coach.is(CaseWhen) ||
            coach.is(Extract) ||
            coach.is(MakeInterval) ||
            coach.is(Substring) ||
            coach.is( ColumnLink, options )
        );
    }

    toString() {
        return this.row.element!.toString();
    }
}


