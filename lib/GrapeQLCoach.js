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

module.exports = GrapeQLCoach;