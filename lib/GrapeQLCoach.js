"use strict";

const {Coach} = require("lang-coach");

class GrapeQLCoach extends Coach {}

GrapeQLCoach.syntax( require("./syntax/PgNull") );
GrapeQLCoach.syntax( require("./syntax/Boolean") );
GrapeQLCoach.syntax( require("./syntax/Comment") );
GrapeQLCoach.syntax( require("./syntax/PgNumber") );
GrapeQLCoach.syntax( require("./syntax/DollarString") );
GrapeQLCoach.syntax( require("./syntax/SingleQuotesString") );
GrapeQLCoach.syntax( require("./syntax/ByteString") );
GrapeQLCoach.syntax( require("./syntax/DoubleQuotes") );
GrapeQLCoach.syntax( require("./syntax/ObjectName") );
GrapeQLCoach.syntax( require("./syntax/ObjectLink") );
GrapeQLCoach.syntax( require("./syntax/ColumnLink") );
GrapeQLCoach.syntax( require("./syntax/TableLink") );
GrapeQLCoach.syntax( require("./syntax/Operator") );
GrapeQLCoach.syntax( require("./syntax/DataType") );
GrapeQLCoach.syntax( require("./syntax/SystemVariable") );
GrapeQLCoach.syntax( require("./syntax/ExpressionElement") );
GrapeQLCoach.syntax( require("./syntax/Expression") );
GrapeQLCoach.syntax( require("./syntax/Cast") );
GrapeQLCoach.syntax( require("./syntax/PgArray") );
GrapeQLCoach.syntax( require("./syntax/CaseWhenElement") );
GrapeQLCoach.syntax( require("./syntax/CaseWhen") );
GrapeQLCoach.syntax( require("./syntax/Extract") );
GrapeQLCoach.syntax( require("./syntax/Substring") );
GrapeQLCoach.syntax( require("./syntax/FunctionLink") );
GrapeQLCoach.syntax( require("./syntax/OrderByElement") );
GrapeQLCoach.syntax( require("./syntax/WindowDefinitionFrameElement") );
GrapeQLCoach.syntax( require("./syntax/WindowDefinitionFrame") );
GrapeQLCoach.syntax( require("./syntax/WindowDefinition") );
GrapeQLCoach.syntax( require("./syntax/FunctionCall") );
GrapeQLCoach.syntax( require("./syntax/SquareBrackets") );
GrapeQLCoach.syntax( require("./syntax/Between") );
GrapeQLCoach.syntax( require("./syntax/Column") );
GrapeQLCoach.syntax( require("./syntax/GroupByElementContent") );
GrapeQLCoach.syntax( require("./syntax/GroupByElement") );
GrapeQLCoach.syntax( require("./syntax/WindowItem") );
GrapeQLCoach.syntax( require("./syntax/FilePathElement") );
GrapeQLCoach.syntax( require("./syntax/File") );

module.exports = GrapeQLCoach;