"use strict";

import {Coach} from "lang-coach";

import Any from "./syntax/Any";
import Between from "./syntax/Between";
import Boolean from "./syntax/Boolean";
import ByteString from "./syntax/ByteString";
import CacheFor from "./syntax/CacheFor";
import CacheReverseExpression from "./syntax/CacheReverseExpression";
import CaseWhen from "./syntax/CaseWhen";
import CaseWhenElement from "./syntax/CaseWhenElement";
import Cast from "./syntax/Cast";
import Column from "./syntax/Column";
import ColumnLink from "./syntax/ColumnLink";
import Comment from "./syntax/Comment";
import DataType from "./syntax/DataType";
import DollarString from "./syntax/DollarString";
import DoubleQuotes from "./syntax/DoubleQuotes";
import Exists from "./syntax/Exists";
import Expression from "./syntax/Expression";
import ExpressionElement from "./syntax/ExpressionElement";
import Extract from "./syntax/Extract";
import File from "./syntax/File";
import FilePathElement from "./syntax/FilePathElement";
import FromItem from "./syntax/FromItem";
import FunctionCall from "./syntax/FunctionCall";
import FunctionLink from "./syntax/FunctionLink";
import GroupByElement from "./syntax/GroupByElement";
import GroupByElementContent from "./syntax/GroupByElementContent";
import In from "./syntax/In";
import Interval from "./syntax/Interval";
import Join from "./syntax/Join";
import ObjectLink from "./syntax/ObjectLink";
import ObjectName from "./syntax/ObjectName";
import Operator from "./syntax/Operator";
import OrderByElement from "./syntax/OrderByElement";
import PgArray from "./syntax/PgArray";
import PgNull from "./syntax/PgNull";
import PgNumber from "./syntax/PgNumber";
import SchemaName from "./syntax/SchemaName";
import SchemaTable from "./syntax/SchemaTable";
import Select from "./syntax/Select";
import SelectFetch from "./syntax/SelectFetch";
import SingleQuotesString from "./syntax/SingleQuotesString";
import SquareBrackets from "./syntax/SquareBrackets";
import Substring from "./syntax/Substring";
import SystemVariable from "./syntax/SystemVariable";
import TableLink from "./syntax/TableLink";
import Union from "./syntax/Union";
import ValueItem from "./syntax/ValueItem";
import ValuesRow from "./syntax/ValuesRow";
import WindowDefinition from "./syntax/WindowDefinition";
import WindowDefinitionFrame from "./syntax/WindowDefinitionFrame";
import WindowDefinitionFrameElement from "./syntax/WindowDefinitionFrameElement";
import WindowItem from "./syntax/WindowItem";
import With from "./syntax/With";
import WithQuery from "./syntax/WithQuery";
import PgArgument from "./syntax/PgArgument";
import PgReturns from "./syntax/PgReturns";
import FunctionIdentify from "./syntax/FunctionIdentify";
import TriggerIdentify from "./syntax/TriggerIdentify";
import CommentOn from "./syntax/CommentOn";
import CommentOnFunction from "./syntax/CommentOnFunction";
import CommentOnTrigger from "./syntax/CommentOnTrigger";
import CreateFunction from "./syntax/CreateFunction";

export default class GrapeQLCoach extends Coach {
    syntax = {
        Any,
        Between,
        Boolean,
        ByteString,
        CacheFor,
        CacheReverseExpression,
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
        CommentOn,
        CommentOnFunction,
        CommentOnTrigger,
        CreateFunction
    };

    parseType(): string {
        const dataType = this.parse(DataType as this["syntax"]["DataType"]);
        return dataType.get("type");
    }
}
