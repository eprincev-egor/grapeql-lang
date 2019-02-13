"use strict";

const {Coach} = require("lang-coach");

class GrapeQLCoach extends Coach {}

GrapeQLCoach.syntax( require("./syntax/PgNull") );
GrapeQLCoach.syntax( require("./syntax/Boolean") );
GrapeQLCoach.syntax( require("./syntax/Comment") );
GrapeQLCoach.syntax( require("./syntax/PgNumber") );
GrapeQLCoach.syntax( require("./syntax/DollarString") );
GrapeQLCoach.syntax( require("./syntax/SingleQuotesString") );
GrapeQLCoach.syntax( require("./syntax/DoubleQuotes") );
GrapeQLCoach.syntax( require("./syntax/ObjectName") );
GrapeQLCoach.syntax( require("./syntax/ObjectLink") );

module.exports = GrapeQLCoach;