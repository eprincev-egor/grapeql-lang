
import {Coach} from "lang-coach";
import allSyntax from "./allSyntax";

import {Any} from "./syntax/Any";
import {Between} from "./syntax/Between";
import {Boolean} from "./syntax/Boolean";
import {ByteString} from "./syntax/ByteString";
import {CacheFor} from "./syntax/CacheFor";
import {CaseWhen} from "./syntax/CaseWhen";
import {CaseWhenElement} from "./syntax/CaseWhenElement";
import {Cast} from "./syntax/Cast";
import {Column} from "./syntax/Column";
import {ColumnLink} from "./syntax/ColumnLink";
import {Comment} from "./syntax/Comment";
import {DataType} from "./syntax/DataType";
import {DollarString} from "./syntax/DollarString";
import {DoubleQuotes} from "./syntax/DoubleQuotes";
import {Exists} from "./syntax/Exists";
import {Expression} from "./syntax/Expression";
import {ExpressionElement} from "./syntax/ExpressionElement";
import {Extract} from "./syntax/Extract";
import {File} from "./syntax/File";
import {FilePathElement} from "./syntax/FilePathElement";
import {FromItem} from "./syntax/FromItem";
import {FunctionCall} from "./syntax/FunctionCall";
import {FunctionLink} from "./syntax/FunctionLink";
import {GroupByElement} from "./syntax/GroupByElement";
import {GroupByElementContent} from "./syntax/GroupByElementContent";
import {In} from "./syntax/In";
import {Interval} from "./syntax/Interval";
import {Join} from "./syntax/Join";
import {ObjectLink} from "./syntax/ObjectLink";
import {ObjectName} from "./syntax/ObjectName";
import {Operator} from "./syntax/Operator";
import {OrderByElement} from "./syntax/OrderByElement";
import {PgArray} from "./syntax/PgArray";
import {PgNull} from "./syntax/PgNull";
import {PgNumber} from "./syntax/PgNumber";
import {SchemaName} from "./syntax/SchemaName";
import {SchemaTable} from "./syntax/SchemaTable";
import {Select} from "./syntax/Select";
import {SelectFetch} from "./syntax/SelectFetch";
import {SingleQuotesString} from "./syntax/SingleQuotesString";
import {SquareBrackets} from "./syntax/SquareBrackets";
import {Substring} from "./syntax/Substring";
import {SystemVariable} from "./syntax/SystemVariable";
import {TableLink} from "./syntax/TableLink";
import {Union} from "./syntax/Union";
import {ValueItem} from "./syntax/ValueItem";
import {ValuesRow} from "./syntax/ValuesRow";
import {WindowDefinition} from "./syntax/WindowDefinition";
import {WindowDefinitionFrame} from "./syntax/WindowDefinitionFrame";
import {WindowDefinitionFrameElement} from "./syntax/WindowDefinitionFrameElement";
import {WindowItem} from "./syntax/WindowItem";
import {With} from "./syntax/With";
import {WithQuery} from "./syntax/WithQuery";
import {PgArgument} from "./syntax/PgArgument";
import {PgReturns} from "./syntax/PgReturns";
import {FunctionIdentify} from "./syntax/FunctionIdentify";
import {TriggerIdentify} from "./syntax/TriggerIdentify";
import {CommentOn} from "./syntax/CommentOn";
import {CommentOnFunction} from "./syntax/CommentOnFunction";
import {CommentOnTrigger} from "./syntax/CommentOnTrigger";
import {CreateFunction} from "./syntax/CreateFunction";
import {CreateTrigger} from "./syntax/CreateTrigger";
import {CreateView} from "./syntax/CreateView";
import {Constraint} from "./syntax/Constraint";
import {CheckConstraint} from "./syntax/CheckConstraint";
import {PrimaryKeyConstraint} from "./syntax/PrimaryKeyConstraint";
import {UniqueConstraint} from "./syntax/UniqueConstraint";
import {ForeignKeyConstraint} from "./syntax/ForeignKeyConstraint";
import {ColumnDefinition} from "./syntax/ColumnDefinition";
import {CreateTableElement} from "./syntax/CreateTableElement";
import {CreateTable} from "./syntax/CreateTable";
import {Extension} from "./syntax/Extension";
import {SetItem} from "./syntax/SetItem";
import {Returning} from "./syntax/Returning";
import {Update} from "./syntax/Update";
import {Delete} from "./syntax/Delete";
import {ConflictTargetItem} from "./syntax/ConflictTargetItem";
import {OnConflict} from "./syntax/OnConflict";
import {Insert} from "./syntax/Insert";
import {AssignVarStatement} from "./syntax/AssignVarStatement";
import {ReturnStatement} from "./syntax/ReturnStatement";
import {IfStatement} from "./syntax/IfStatement";
import {ElseIfStatement} from "./syntax/ElseIfStatement";
import {RaiseUsing} from "./syntax/RaiseUsing";
import {Raise} from "./syntax/Raise";
import {BodyStatement} from "./syntax/BodyStatement";
import {VariableDefinition} from "./syntax/VariableDefinition";
import {Declare} from "./syntax/Declare";
import {FunctionBody} from "./syntax/FunctionBody";
import {CacheIndex} from "./syntax/CacheIndex";
import {Collate} from "./syntax/Collate";
import {WithoutTriggersOn} from "./syntax/WithoutTriggersOn";
import {WithoutInsertOn} from "./syntax/WithoutInsertOn";
import {Position} from "./syntax/Position";
import {Overlay} from "./syntax/Overlay";
import {MakeIntervalArg} from "./syntax/MakeIntervalArg";
import {MakeInterval} from "./syntax/MakeInterval";

export class GrapeQLCoach extends Coach {
    syntax = {
        Any,
        Between,
        Boolean,
        ByteString,
        CacheFor,
        CaseWhen,
        CaseWhenElement,
        Cast,
        Column,
        ColumnLink,
        Comment,
        DataType,
        DollarString,
        DoubleQuotes,
        Exists,
        Expression,
        ExpressionElement,
        Extract,
        File,
        FilePathElement,
        FromItem,
        FunctionCall,
        FunctionLink,
        GroupByElement,
        GroupByElementContent,
        In,
        Interval,
        Join,
        ObjectLink,
        ObjectName,
        Operator,
        OrderByElement,
        PgArray,
        PgNull,
        PgNumber,
        SchemaName,
        SchemaTable,
        Select,
        SelectFetch,
        SingleQuotesString,
        SquareBrackets,
        Substring,
        SystemVariable,
        TableLink,
        Union,
        ValueItem,
        ValuesRow,
        WindowDefinition,
        WindowDefinitionFrame,
        WindowDefinitionFrameElement,
        WindowItem,
        With,
        WithQuery,
        PgArgument,
        PgReturns,
        FunctionIdentify,
        TriggerIdentify,
        CommentOnFunction,
        CommentOnTrigger,
        CreateFunction,
        CreateTrigger,
        CreateView,
        Constraint,
        CheckConstraint,
        PrimaryKeyConstraint,
        UniqueConstraint,
        ForeignKeyConstraint,
        ColumnDefinition,
        CreateTableElement,
        CreateTable,
        Extension,
        SetItem,
        Returning,
        Update,
        Delete,
        ConflictTargetItem,
        OnConflict,
        Insert,
        AssignVarStatement,
        ReturnStatement,
        IfStatement,
        ElseIfStatement,
        RaiseUsing,
        Raise,
        BodyStatement,
        VariableDefinition,
        Declare,
        FunctionBody,
        CacheIndex,
        Collate,
        WithoutTriggersOn,
        Position,
        Overlay,
        WithoutInsertOn,
        MakeIntervalArg,
        MakeInterval
    };

    parseType(): string {
        const dataType = this.parse(DataType as this["syntax"]["DataType"]);
        return dataType.get("type")!;
    }

    skipSpace(): void {
        for (; this.i < this.n; this.i++) {
            const symbol = this.str[ this.i ];

            // skip spacing symbols
            if ( /\s/.test(symbol) ) {
                continue;
            }

            // skip comments
            if ( this.is(Comment as this["syntax"]["Comment"]) ) {
                this.parse(Comment as this["syntax"]["Comment"]);
            }

            break;
        }
    }
}

// need for cycle recursion structure inside some syntaxes
const coach = new GrapeQLCoach("");
for (const key in coach.syntax) {
    allSyntax[ key ] = (coach.syntax as any)[ key ];
}

export {Any};
export {Between};
export {Boolean};
export {ByteString};
export {CacheFor};
export {CaseWhen};
export {CaseWhenElement};
export {Cast};
export {Column};
export {ColumnLink};
export {Comment};
export {DataType};
export {DollarString};
export {DoubleQuotes};
export {Exists};
export {Expression};
export {ExpressionElement};
export {Extract};
export {File};
export {FilePathElement};
export {FromItem};
export {FunctionCall};
export {FunctionLink};
export {GroupByElement};
export {GroupByElementContent};
export {In};
export {Interval};
export {Join};
export {ObjectLink};
export {ObjectName};
export {Operator};
export {OrderByElement};
export {PgArray};
export {PgNull};
export {PgNumber};
export {SchemaName};
export {SchemaTable};
export {Select};
export {SelectFetch};
export {SingleQuotesString};
export {SquareBrackets};
export {Substring};
export {SystemVariable};
export {TableLink};
export {Union};
export {ValueItem};
export {ValuesRow};
export {WindowDefinition};
export {WindowDefinitionFrame};
export {WindowDefinitionFrameElement};
export {WindowItem};
export {With};
export {WithQuery};
export {PgArgument};
export {PgReturns};
export {FunctionIdentify};
export {TriggerIdentify};
export {CommentOn};
export {CommentOnFunction};
export {CommentOnTrigger};
export {CreateFunction};
export {CreateTrigger};
export {CreateView};
export {Constraint};
export {CheckConstraint};
export {PrimaryKeyConstraint};
export {UniqueConstraint};
export {ForeignKeyConstraint};
export {ColumnDefinition};
export {CreateTableElement};
export {CreateTable};
export {Extension};
export {SetItem};
export {Returning};
export {Update};
export {Delete};
export {ConflictTargetItem};
export {OnConflict};
export {Insert};
export {AssignVarStatement};
export {ReturnStatement};
export {IfStatement};
export {ElseIfStatement};
export {RaiseUsing};
export {Raise};
export {BodyStatement};
export {VariableDefinition};
export {Declare};
export {FunctionBody};
export {CacheIndex};
export {Collate};
export {WithoutTriggersOn};
export {Position};
export {Overlay};
export {WithoutInsertOn};
export {MakeIntervalArg};
export {MakeInterval};
