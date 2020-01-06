"use strict";

import {Syntax} from "lang-coach";
import With from "./With";
import Column from "./Column";
import Expression from "./Expression";
import FromItem from "./FromItem";
import GroupByElement from "./GroupByElement";
import WindowItem from "./WindowItem";
import OrderByElement from "./OrderByElement";
import Union from "./Union";
import SelectFetch from "./SelectFetch";

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

export default class Select extends Syntax<Select> {
    structure() {
        return {
            with: With,
            columns: [Column],
            from: [FromItem],
            where: Expression,
            groupBy: [GroupByElement],
            having: Expression,
            window: [WindowItem],
            orderBy: [OrderByElement],
            union: Union,
            offset: "string",
            offsetRow: "boolean",
            offsetRows: "boolean",
            limit: "string",
            fetch: SelectFetch
        };
    }

    parse(coach, data) {
        // options = options || {allowCustomReturning: false};

        Select.parseWith(coach, data);

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
        
        Select.parseColumns(coach, data);

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

        Select.parseFrom(coach, data);
        Select.parseWhere(coach, data);
        Select.parseGroupBy(coach, data);
        Select.parseHaving(coach, data);
        Select.parseWindow(coach, data);
        Select.parseOrderBy(coach, data);
        Select.parseOffsets(coach, data);
        Select.parseUnion(coach, data);

        validate(data);
    }

    parseColumns(coach, data) {
        if ( !coach.isColumn() ) {
            return;
        }

        data.columns = coach.parseComma("Column");
        coach.skipSpace();
    }

    parseWith(coach, data) {
        if ( !coach.isWith() ) {
            return;
        }
        data.with = coach.parseWith();

        coach.skipSpace();
    }

    parseFrom(coach, data) {
        if ( !coach.isWord("from") ) {
            return;
        }

        coach.expectWord("from");

        data.from = coach.parseComma("FromItem");

        coach.skipSpace();
    }

    parseWhere(coach, data) {
        data.where = null;

        if ( coach.isWord("where") ) {
            coach.expectWord("where");

            data.where = coach.parseExpression();

            coach.skipSpace();
        }
    }

    parseGroupBy(coach, data) {
        if ( !coach.isWord("group") ) {
            return;
        }

        coach.expectWord("group");
        coach.expectWord("by");

        data.groupBy = coach.parseComma("GroupByElement");

        coach.skipSpace();
    }

    parseHaving(coach, data) {
        if ( !coach.isWord("having") ) {
            return;
        }
        coach.expectWord("having");

        data.having = coach.parseExpression();

        coach.skipSpace();
    }

    parseWindow(coach, data) {
        if ( !coach.isWord("window") ) {
            return;
        }

        coach.expectWord("window");

        data.window = coach.parseComma("WindowItem");

        coach.skipSpace();
    }

    /*
        [ LIMIT { count | ALL } ]
        [ OFFSET start [ ROW | ROWS ] ]
        [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } ONLY ]
     */
    parseOffsets(coach, data) {

        let hasOffset; 
        let hasLimit; 
        let hasFetch;

        hasOffset = Select.parseOffset(coach, data);
        hasLimit = Select.parseLimit(coach, data);
        hasFetch = Select.parseFetch(coach, data);

        !hasOffset && Select.parseOffset(coach, data);
        !hasLimit && Select.parseLimit(coach, data);
        !hasFetch && Select.parseFetch(coach, data);

        !hasOffset && Select.parseOffset(coach, data);
        !hasLimit && Select.parseLimit(coach, data);
        !hasFetch && Select.parseFetch(coach, data);

        coach.skipSpace();
    }

    // [ OFFSET start [ ROW | ROWS ] ]
    parseOffset(coach, data) {
        if ( !coach.isWord("offset") ) {
            return;
        }
        coach.expectWord("offset");

        data.offset = +coach.expect(/\d+/);
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
    parseLimit(coach, data) {
        if ( !coach.isWord("limit") ) {
            return;
        }

        coach.expectWord("limit");

        data.limit = coach.expect(/all|\d+/i);

        coach.skipSpace();
        return true;
    }

    // [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } ONLY ]
    parseFetch(coach, data) {
        if ( !coach.isSelectFetch() ) {
            return;
        }

        data.fetch = coach.parseSelectFetch();
        return true;
    }

    // [ ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...] ]
    parseOrderBy(coach, data) {
        if ( !coach.isWord("order") ) {
            return;
        }

        coach.expectWord("order");
        coach.expectWord("by");

        data.orderBy = coach.parseComma("OrderByElement");

        coach.skipSpace();
    }

    // [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] select ]
    parseUnion(coach, data) {
        if ( !coach.isUnion() ) {
            return;
        }

        data.union = coach.parseUnion();
    }

    is(coach) {
        return coach.isWord("select") || coach.isWith();
    }

    toString() {
        let data = this.data;
        // options = options || {pg: false};
        let out = "";

        if ( data.with ) {
            out += data.with.toString();
            out += " ";
        }

        out += "select ";
        // if ( !options.pg ) {
        //     if ( this.returningObject ) {
        //         out += " row ";
        //     }
        //     else if ( this.returningValue ) {
        //         out += " value ";
        //     }
        // }
        
        if ( data.columns ) {
            out += data.columns.map(item => item.toString()).join(", ");
            out += " ";
        }

        if ( data.from ) {
            out += "from ";
            out += data.from.map(item => item.toString()).join(", ");
            out += " ";
        }

        if ( data.where ) {
            out += "where ";
            out += data.where.toString();
            out += " ";
        }

        if ( data.window ) {
            out += "window ";
            out += data.window.map(item => item.toString()).join(", ");
            out += " ";
        }

        if ( data.groupBy ) {
            out += "group by ";
            out += data.groupBy.map(item => item.toString()).join(", ");
            out += " ";
        }

        if ( data.having ) {
            out += "having ";
            out += data.having.toString();
            out += " ";
        }

        if ( data.orderBy ) {
            out += "order by ";
            out += data.orderBy.map(item => item.toString()).join(", ");
            out += " ";
        }

        if ( data.offset !== null ) {
            out += "offset " + data.offset;

            if ( data.offsetRows ) {
                out += " rows";
            }
            else if ( data.offsetRow ) {
                out += " row";
            }

            out += " ";
        }

        if ( data.limit !== null ) {
            out += "limit " + data.limit;
            out += " ";
        }

        if ( data.fetch ) {
            out += data.fetch;
            out += " ";
        }

        if ( data.union ) {
            out += " ";
            out += data.union.toString();
        }

        return out;
    }

}


function validate(data) {
    if ( !data.from ) {
        return;
    }

    // validate from items
    let fromMap = {};

    data.from.forEach(fromItem => {
        validateFromItem( fromMap, fromItem );
    });
}

function validateFromItem(fromMap, fromItem) {
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

        let tableLink = fromItem.get("table");
        let link = tableLink.get("link");

        name = tableLink.last();
        name = name.toLowerCase();

        if ( !(name in fromMap) ) {
            fromMap[ name ] = [fromItem];
        } else {
            let items = fromMap[ name ];
            if ( !Array.isArray(items) ) {
                throwFromUniqError(name);
            }

            let schema = null;
            if ( link.length > 1 ) {
                schema = link[ 0 ];
                schema = schema.toLowerCase();
            }

            items.forEach(item => {
                let itemSchema = null;
                if ( item.get("table").get("link").length > 1 ) {
                    itemSchema = item.get("table").first();
                    itemSchema = itemSchema.toLowerCase();
                }

                if ( itemSchema == schema ) {
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
Select.keywords = [
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

