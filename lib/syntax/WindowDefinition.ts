
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import allSyntax from "../allSyntax";
import {ObjectName} from "./ObjectName";
import {OrderByElement} from "./OrderByElement";
import {WindowDefinitionFrame} from "./WindowDefinitionFrame";

/*
window_definition is
[ existing_window_name ]
[ PARTITION BY expression [, ...] ]
[ ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...] ]
[ frame_clause ]
The frame_clause can be one of
{ RANGE | ROWS } frame_start
{ RANGE | ROWS } BETWEEN frame_start AND frame_end
where frame_start and frame_end can be one of
UNBOUNDED PRECEDING
value PRECEDING
CURRENT ROW
value FOLLOWING
UNBOUNDED FOLLOWING
*/

export class WindowDefinition extends Syntax<WindowDefinition> {
    structure() {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        return {
            windowDefinition: ObjectName,
            partitionBy: Types.Array({
                element: Expression
            }),
            orderBy: Types.Array({
                element: OrderByElement
            }),
            range: WindowDefinitionFrame,
            rows: WindowDefinitionFrame
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const Expression = allSyntax.Expression as GrapeQLCoach["syntax"]["Expression"];

        // [ existing_window_name ]
        if ( !coach.is(/(partition|order|range|rows)[^\w$]/i) ) {
            data.windowDefinition = coach.parse(ObjectName);
            coach.skipSpace();
        }

        // [ PARTITION BY expression [, ...] ]
        if ( coach.isWord("partition") ) {
            coach.expectWord("partition");
            coach.expectWord("by");


            data.partitionBy = coach.parseComma(Expression);
        }

        // [ ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...] ]
        if ( coach.isWord("order") ) {
            coach.expectWord("order");
            coach.expectWord("by");

            data.orderBy = coach.parseComma(OrderByElement);
            coach.skipSpace();
        }

        // { RANGE | ROWS } frame_start
        // { RANGE | ROWS } BETWEEN frame_start AND frame_end
        if ( coach.isWord("range") ) {
            coach.expectWord("range");

            data.range = coach.parse(WindowDefinitionFrame);
        }
        else if ( coach.isWord("rows") ) {
            coach.expectWord("rows");

            data.rows = coach.parse(WindowDefinitionFrame);
        }
    }

    is(coach: GrapeQLCoach) {
        // quotes or word
        return coach.is(ObjectName);
    }

    toString() {
        const data = this.row;
        let out = "";

        if ( data.windowDefinition ) {
            out += data.windowDefinition.toString();
        }

        if ( data.partitionBy ) {
            if ( out ) { out += " "; }

            out += "partition by ";
            out += data.partitionBy.map((item) => item.toString()).join(", ");
        }

        if ( data.orderBy ) {
            if ( out ) { out += " "; }

            out += "order by ";
            out += data.orderBy.map((item) => item.toString()).join(", ");
        }

        if ( data.range ) {
            if ( out ) { out += " "; }

            out += "range " + data.range.toString();
        }
        else if ( data.rows ) {
            if ( out ) { out += " "; }

            out += "rows " + data.rows.toString();
        }

        return out;
    }
}
