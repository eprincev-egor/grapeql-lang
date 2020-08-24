
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {With} from "./With";
import {Column} from "./Column";
import {Expression} from "./Expression";
import {FromItem} from "./FromItem";
import {GroupByElement} from "./GroupByElement";
import {WindowItem} from "./WindowItem";
import {OrderByElement} from "./OrderByElement";
import {Union} from "./Union";
import {SelectFetch} from "./SelectFetch";
import {ObjectLink} from "./ObjectLink";

// https://www.postgresql.org/docs/9.5/static/sql-select.html
/*
[ WITH [ RECURSIVE ] with_query [, ...] ]
SELECT [ ALL | DISTINCT [ ON ( expression [, ...] ) ] ]
    [ * | expression [ [ AS ] output_name ] [, ...] ]
    [ FROM from_item [, ...] ]
    [ WHERE condition ]
    [ GROUP BY grouping_element [, ...] ]
    [ HAVING condition [, ...] ]
    [ WINDOW window_name AS ( window_definition ) [, ...] ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] select ]
    [ ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...] ]
    [ LIMIT { count | ALL } ]
    [ OFFSET start [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } ONLY ]
where from_item can be one of:
    [ ONLY ] table_name [ * ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
                [ TABLESAMPLE sampling_method ( argument [, ...] ) [ REPEATABLE ( seed ) ] ]
    [ LATERAL ] ( select ) [ AS ] alias [ ( column_alias [, ...] ) ]
    with_query_name [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    [ LATERAL ] function_name ( [ argument [, ...] ] )
                [ WITH ORDINALITY ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    [ LATERAL ] function_name ( [ argument [, ...] ] ) [ AS ] alias ( column_definition [, ...] )
    [ LATERAL ] function_name ( [ argument [, ...] ] ) AS ( column_definition [, ...] )
    [ LATERAL ] ROWS FROM( function_name ( [ argument [, ...] ] ) [ AS ( column_definition [, ...] ) ] [, ...] )
                [ WITH ORDINALITY ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    from_item [ NATURAL ] join_type from_item [ ON join_condition | USING ( join_column [, ...] ) ]
and grouping_element can be one of:
    ( )
    expression
    ( expression [, ...] )
    ROLLUP ( { expression | ( expression [, ...] ) } [, ...] )
    CUBE ( { expression | ( expression [, ...] ) } [, ...] )
    GROUPING SETS ( grouping_element [, ...] )
and with_query is:
    with_query_name [ ( column_name [, ...] ) ] AS ( select  )
TABLE [ ONLY ] table_name [ * ]
 */

export class Select extends Syntax<Select> {
    structure() {
        return {
            with: With,
            columns: Types.Array({
                element: Column
            }),
            into: Types.Array({
                element: ObjectLink
            }),
            from: Types.Array({
                element: FromItem
            }),
            where: Expression,
            groupBy: Types.Array({
                element: GroupByElement
            }),
            having: Expression,
            window: Types.Array({
                element: WindowItem
            }),
            orderBy: Types.Array({
                element: OrderByElement
            }),
            union: Union,
            offset: Types.String,
            offsetRow: Types.Boolean,
            offsetRows: Types.Boolean,
            limit: Types.String,
            fetch: SelectFetch
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        // options = options || {allowCustomReturning: false};

        this.parseWith(coach, data);

        coach.expectWord("select");
        
        // let customReturningStart = coach.i;
        
        // if ( options.allowCustomReturning ) {
        //     if ( coach.isWord("row") ) {
        //         coach.expectWord("row");
        //         coach.skipSpace();
                
        //         this.returningObject = true;
        //     }
        //     else if ( coach.isWord("value") ) {
        //         coach.expectWord("value");
        //         coach.skipSpace();
                
        //         this.returningValue = true;
        //     }
        // }
        
        this.parseColumns(coach, data);

        // if ( this.returningValue ) {
        //     if( !this.columns.length ) {
        //         coach.i = customReturningStart;
        //         coach.throwError("select value should have one column");
        //     }
            
        //     if ( this.columns.length > 1 ) {
        //         coach.i = customReturningStart;
        //         coach.throwError("select value should contain only one column");
        //     }

        //     let firstColumn = this.columns[0];
        //     if ( firstColumn.isStar() ) {
        //         coach.i = customReturningStart;
        //         coach.throwError("select value can't use with star");
        //     }
        // }

        this.parseInto(coach, data);
        this.parseFrom(coach, data);
        this.parseWhere(coach, data);
        this.parseGroupBy(coach, data);
        this.parseHaving(coach, data);
        this.parseWindow(coach, data);
        this.parseOrderBy(coach, data);
        this.parseOffsets(coach, data);
        this.parseUnion(coach, data);

        validate(data);
    }

    parseColumns(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.is(Column) ) {
            return;
        }

        data.columns = coach.parseComma(Column);
        coach.skipSpace();
    }

    parseWith(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.is(With) ) {
            return;
        }
        data.with = coach.parse(With);

        coach.skipSpace();
    }

    parseInto(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.isWord("into") ) {
            return;
        }

        coach.expectWord("into");
        data.into = coach.parseComma(ObjectLink);

        coach.skipSpace();
    }

    parseFrom(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.isWord("from") ) {
            return;
        }

        coach.expectWord("from");

        data.from = coach.parseComma(FromItem);

        coach.skipSpace();
    }

    parseWhere(coach: GrapeQLCoach, data: this["TInputData"]) {
        data.where = null;

        if ( coach.isWord("where") ) {
            coach.expectWord("where");

            data.where = coach.parse(Expression);

            coach.skipSpace();
        }
    }

    parseGroupBy(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.isWord("group") ) {
            return;
        }

        coach.expectWord("group");
        coach.expectWord("by");

        data.groupBy = coach.parseComma(GroupByElement);

        coach.skipSpace();
    }

    parseHaving(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.isWord("having") ) {
            return;
        }
        coach.expectWord("having");

        data.having = coach.parse(Expression);

        coach.skipSpace();
    }

    parseWindow(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.isWord("window") ) {
            return;
        }

        coach.expectWord("window");

        data.window = coach.parseComma(WindowItem);

        coach.skipSpace();
    }

    /*
        [ LIMIT { count | ALL } ]
        [ OFFSET start [ ROW | ROWS ] ]
        [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } ONLY ]
     */
    parseOffsets(coach: GrapeQLCoach, data: this["TInputData"]) {

        let hasOffset; 
        let hasLimit; 
        let hasFetch;

        hasOffset = this.parseOffset(coach, data);
        hasLimit = this.parseLimit(coach, data);
        hasFetch = this.parseFetch(coach, data);

        if ( !hasOffset ) { 
            hasOffset = this.parseOffset(coach, data); 
        }
        if ( !hasLimit ) {
            hasLimit = this.parseLimit(coach, data);
        }
        if ( !hasFetch ) {
            hasFetch = this.parseFetch(coach, data);
        }

        if ( !hasOffset ) { 
            hasOffset = this.parseOffset(coach, data); 
        }
        if ( !hasLimit ) {
            hasLimit = this.parseLimit(coach, data);
        }
        if ( !hasFetch ) {
            hasFetch = this.parseFetch(coach, data);
        }

        coach.skipSpace();
    }

    // [ OFFSET start [ ROW | ROWS ] ]
    parseOffset(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.isWord("offset") ) {
            return;
        }
        coach.expectWord("offset");

        data.offset = +coach.expect(/\d+/) + "";
        coach.skipSpace();

        if ( coach.isWord("rows") ) {
            coach.expectWord("rows");
            data.offsetRows = true;
        }
        else if ( coach.isWord("row") ) {
            coach.expectWord("row");
            data.offsetRow = true;
        }

        coach.skipSpace();
        return true;
    }

    // [ LIMIT { count | ALL } ]
    parseLimit(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.isWord("limit") ) {
            return;
        }

        coach.expectWord("limit");

        data.limit = coach.expect(/all|\d+/i);

        coach.skipSpace();
        return true;
    }

    // [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } ONLY ]
    parseFetch(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.is(SelectFetch) ) {
            return;
        }

        data.fetch = coach.parse(SelectFetch);
        return true;
    }

    // [ ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...] ]
    parseOrderBy(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.isWord("order") ) {
            return;
        }

        coach.expectWord("order");
        coach.expectWord("by");

        data.orderBy = coach.parseComma(OrderByElement);

        coach.skipSpace();
    }

    // [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] select ]
    parseUnion(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( !coach.is(Union) ) {
            return;
        }

        data.union = coach.parse(Union);
    }

    is(coach: GrapeQLCoach) {
        return coach.isWord("select") || coach.is(With);
    }

    toString() {
        const data = this.row;
        // options = options || {pg: false};
        let out = "";

        if ( data.with ) {
            out += data.with.toString();
            out += " ";
        }

        out += "select";
        // if ( !options.pg ) {
        //     if ( this.returningObject ) {
        //         out += " row ";
        //     }
        //     else if ( this.returningValue ) {
        //         out += " value ";
        //     }
        // }
        
        if ( data.columns ) {
            out += "\n";
            out += data.columns.map((item) => 
                "    " + item.toString()
            ).join(",\n");
        }

        if ( data.into ) {
            out += "\ninto ";
            out += data.into.map((item) => item.toString()).join(", ");
        }

        if ( data.from ) {
            out += "\nfrom ";
            out += data.from.map((item) => item.toString()).join(", ");
        }

        if ( data.where ) {
            out += "\nwhere\n";
            out += data.where.toString({
                parentSpace: "    "
            });
        }

        if ( data.window ) {
            out += "\nwindow ";
            out += data.window.map((item) => item.toString()).join(", ");
            out += " ";
        }

        if ( data.groupBy ) {
            out += "\ngroup by ";
            out += data.groupBy.map((item) => item.toString()).join(", ");
            out += " ";
        }

        if ( data.having ) {
            out += "\nhaving ";
            out += data.having.toString();
            out += " ";
        }

        if ( data.orderBy ) {
            out += "\norder by ";
            out += data.orderBy.map((item) => item.toString()).join(", ");
            out += " ";
        }

        if ( data.offset !== null ) {
            out += "\noffset " + data.offset;

            if ( data.offsetRows ) {
                out += " rows";
            }
            else if ( data.offsetRow ) {
                out += " row";
            }

            out += " ";
        }

        if ( data.limit !== null ) {
            out += "\nlimit " + data.limit;
            out += " ";
        }

        if ( data.fetch ) {
            out += "\n";
            out += data.fetch;
            out += " ";
        }

        if ( data.union ) {
            out += "\n";
            out += data.union.toString();
        }

        return out;
    }

}


function validate(data: Select["TInputData"]) {
    if ( !data.from ) {
        return;
    }

    // validate from items
    const fromMap = {};

    data.from.forEach((fromItem: FromItem) => {
        validateFromItem( fromMap, fromItem );
    });
}

function validateFromItem(fromMap: any, fromItem: FromItem) {
    let name;

    if ( fromItem.get("as") ) {
        name = fromItem.get("as");
        name = name.toLowerCase();

        if ( name in fromMap ) {
            throwFromUniqError(name);
        }

        fromMap[ name ] = fromItem;
    } else {
        // from schema1.company, schema2.company

        const tableLink = fromItem.get("table");
        const link = tableLink.get("link");

        name = tableLink.last();
        name = name.toLowerCase();

        if ( !(name in fromMap) ) {
            fromMap[ name ] = [fromItem];
        } else {
            const items = fromMap[ name ];
            if ( !Array.isArray(items) ) {
                throwFromUniqError(name);
            }

            let schema = null;
            if ( link.length > 1 ) {
                schema = link[ 0 ];
                schema = schema.toLowerCase();
            }

            items.forEach((item) => {
                let itemSchema = null;
                if ( item.get("table").get("link").length > 1 ) {
                    itemSchema = item.get("table").first();
                    itemSchema = itemSchema.toLowerCase();
                }

                if ( itemSchema === schema ) {
                    throwFromUniqError(name);
                }
            });

            items.push( fromItem );
        }
    }
}

function throwFromUniqError(name) {
    throw new Error(`table name "${ name }" specified more than once`);
}


// stop keywords for alias
(Select as any).keywords = [
    "into",
    "from",
    "where",
    "select",
    "with",
    "having",
    "offset",
    "limit",
    "fetch",
    "lateral",
    "only",
    "union",
    "intersect",
    "except",
    "order",
    "group",
    // @see joins
    "on",
    "using",
    "left",
    "right",
    "full",
    "inner",
    "cross",
    "join"
];
