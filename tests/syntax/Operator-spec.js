"use strict";

const Operator = require("../../lib/syntax/Operator");
const testSyntax = require("../testSyntax");

describe("Operator", () => {

    testSyntax(Operator, {
        str: "-+-",
        result: {operator: "-"}
    });

    testSyntax(Operator, {
        str: "+-",
        result: {operator: "+"}
    });
    


    testSyntax(Operator, {
        str: "=",
        result: {operator: "="}
    });
    
    testSyntax(Operator, {
        str: "<>",
        result: {operator: "<>"}
    });
    
    testSyntax(Operator, {
        str: "!=",
        result: {operator: "!="}
    });
    
    testSyntax(Operator, {
        str: "<",
        result: {operator: "<"}
    });
    
    testSyntax(Operator, {
        str: ">",
        result: {operator: ">"}
    });
    
    testSyntax(Operator, {
        str: "<=",
        result: {operator: "<="}
    });
    
    testSyntax(Operator, {
        str: ">=",
        result: {operator: ">="}
    });
    
    testSyntax(Operator, {
        str: "||",
        result: {operator: "||"}
    });
    
    testSyntax(Operator, {
        str: "!",
        result: {operator: "!"}
    });
    
    testSyntax(Operator, {
        str: "!!",
        result: {operator: "!!"}
    });
    
    testSyntax(Operator, {
        str: "%",
        result: {operator: "%"}
    });
    
    testSyntax(Operator, {
        str: "@",
        result: {operator: "@"}
    });
    
    testSyntax(Operator, {
        str: "-",
        result: {operator: "-"}
    });
    
    testSyntax(Operator, {
        str: "<<",
        result: {operator: "<<"}
    });
    
    testSyntax(Operator, {
        str: "&<",
        result: {operator: "&<"}
    });
    
    testSyntax(Operator, {
        str: "&>",
        result: {operator: "&>"}
    });
    
    testSyntax(Operator, {
        str: ">>",
        result: {operator: ">>"}
    });
    
    testSyntax(Operator, {
        str: "<@",
        result: {operator: "<@"}
    });
    
    testSyntax(Operator, {
        str: "@>",
        result: {operator: "@>"}
    });
    
    testSyntax(Operator, {
        str: "~=",
        result: {operator: "~="}
    });
    
    testSyntax(Operator, {
        str: "&&",
        result: {operator: "&&"}
    });
    
    testSyntax(Operator, {
        str: ">^",
        result: {operator: ">^"}
    });
    
    testSyntax(Operator, {
        str: "<^",
        result: {operator: "<^"}
    });
    
    testSyntax(Operator, {
        str: "@@",
        result: {operator: "@@"}
    });
    
    testSyntax(Operator, {
        str: "*",
        result: {operator: "*"}
    });
    
    testSyntax(Operator, {
        str: "<->",
        result: {operator: "<->"}
    });
    
    testSyntax(Operator, {
        str: "/",
        result: {operator: "/"}
    });
    
    testSyntax(Operator, {
        str: "+",
        result: {operator: "+"}
    });
    
    testSyntax(Operator, {
        str: "#=",
        result: {operator: "#="}
    });
    
    testSyntax(Operator, {
        str: "#<>",
        result: {operator: "#<>"}
    });
    
    testSyntax(Operator, {
        str: "#<",
        result: {operator: "#<"}
    });
    
    testSyntax(Operator, {
        str: "#>",
        result: {operator: "#>"}
    });
    
    testSyntax(Operator, {
        str: "#<=",
        result: {operator: "#<="}
    });
    
    testSyntax(Operator, {
        str: "#>=",
        result: {operator: "#>="}
    });
    
    testSyntax(Operator, {
        str: "<?>",
        result: {operator: "<?>"}
    });
    
    testSyntax(Operator, {
        str: "|/",
        result: {operator: "|/"}
    });
    
    testSyntax(Operator, {
        str: "||/",
        result: {operator: "||/"}
    });
    
    testSyntax(Operator, {
        str: "|",
        result: {operator: "|"}
    });
    
    testSyntax(Operator, {
        str: "<#>",
        result: {operator: "<#>"}
    });
    
    testSyntax(Operator, {
        str: "~",
        result: {operator: "~"}
    });
    
    testSyntax(Operator, {
        str: "!~",
        result: {operator: "!~"}
    });
    
    testSyntax(Operator, {
        str: "#",
        result: {operator: "#"}
    });
    
    testSyntax(Operator, {
        str: "?#",
        result: {operator: "?#"}
    });
    
    testSyntax(Operator, {
        str: "@-@",
        result: {operator: "@-@"}
    });
    
    testSyntax(Operator, {
        str: "?-",
        result: {operator: "?-"}
    });
    
    testSyntax(Operator, {
        str: "?|",
        result: {operator: "?|"}
    });
    
    testSyntax(Operator, {
        str: "^",
        result: {operator: "^"}
    });
    
    testSyntax(Operator, {
        str: "~~",
        result: {operator: "~~"}
    });
    
    testSyntax(Operator, {
        str: "!~~",
        result: {operator: "!~~"}
    });
    
    testSyntax(Operator, {
        str: "~*",
        result: {operator: "~*"}
    });
    
    testSyntax(Operator, {
        str: "!~*",
        result: {operator: "!~*"}
    });
    
    testSyntax(Operator, {
        str: "|>>",
        result: {operator: "|>>"}
    });
    
    testSyntax(Operator, {
        str: "<<|",
        result: {operator: "<<|"}
    });
    
    testSyntax(Operator, {
        str: "?||",
        result: {operator: "?||"}
    });
    
    testSyntax(Operator, {
        str: "?-|",
        result: {operator: "?-|"}
    });
    
    testSyntax(Operator, {
        str: "##",
        result: {operator: "##"}
    });
    
    testSyntax(Operator, {
        str: "&",
        result: {operator: "&"}
    });
    
    testSyntax(Operator, {
        str: "<<=",
        result: {operator: "<<="}
    });
    
    testSyntax(Operator, {
        str: ">>=",
        result: {operator: ">>="}
    });
    
    testSyntax(Operator, {
        str: "~~*",
        result: {operator: "~~*"}
    });
    
    testSyntax(Operator, {
        str: "!~~*",
        result: {operator: "!~~*"}
    });
    
    testSyntax(Operator, {
        str: "~<~",
        result: {operator: "~<~"}
    });
    
    testSyntax(Operator, {
        str: "~<=~",
        result: {operator: "~<=~"}
    });
    
    testSyntax(Operator, {
        str: "~>=~",
        result: {operator: "~>=~"}
    });
    
    testSyntax(Operator, {
        str: "~>~",
        result: {operator: "~>~"}
    });
    
    testSyntax(Operator, {
        str: "&<|",
        result: {operator: "&<|"}
    });
    
    testSyntax(Operator, {
        str: "|&>",
        result: {operator: "|&>"}
    });
    
    testSyntax(Operator, {
        str: "@@@",
        result: {operator: "@@@"}
    });
    
    testSyntax(Operator, {
        str: "*=",
        result: {operator: "*="}
    });
    
    testSyntax(Operator, {
        str: "*<>",
        result: {operator: "*<>"}
    });
    
    testSyntax(Operator, {
        str: "*<",
        result: {operator: "*<"}
    });
    
    testSyntax(Operator, {
        str: "*>",
        result: {operator: "*>"}
    });
    
    testSyntax(Operator, {
        str: "*<=",
        result: {operator: "*<="}
    });
    
    testSyntax(Operator, {
        str: "*>=",
        result: {operator: "*>="}
    });
    
    testSyntax(Operator, {
        str: "-|-",
        result: {operator: "-|-"}
    });
    
    testSyntax(Operator, {
        str: "->",
        result: {operator: "->"}
    });
    
    testSyntax(Operator, {
        str: "->>",
        result: {operator: "->>"}
    });
    
    testSyntax(Operator, {
        str: "#>>",
        result: {operator: "#>>"}
    });
    
    testSyntax(Operator, {
        str: "?",
        result: {operator: "?"}
    });
    
    testSyntax(Operator, {
        str: "?&",
        result: {operator: "?&"}
    });
    
    testSyntax(Operator, {
        str: "#-",
        result: {operator: "#-"}
    });
    
    testSyntax(Operator, {
        str: "and",
        result: {operator: "and"}
    });
    
    testSyntax(Operator, {
        str: "or",
        result: {operator: "or"}
    });
    
    testSyntax(Operator, {
        str: "not",
        result: {operator: "not"}
    });

    testSyntax(Operator, {
        str: "is",
        result: {operator: "is"}
    });

    testSyntax(Operator, {
        str: "is  Not null",
        result: {operator: "is not"}
    });

    testSyntax(Operator, {
        str: "is Distinct from",
        result: {operator: "is distinct from"}
    });

    testSyntax(Operator, {
        str: "operator( pg_catalog.+  )",
        result: {operator: "operator(pg_catalog.+)"}
    });

    testSyntax(Operator, {
        str: "isnull some",
        result: {operator: "isnull"}
    });

    testSyntax(Operator, {
        str: "notnull some",
        result: {operator: "notnull"}
    });

    testSyntax(Operator, {
        str: "is not distinct from",
        result: {operator: "is not distinct from"}
    });

    testSyntax(Operator, {
        str: "is unknown",
        result: {operator: "is unknown"}
    });

    testSyntax(Operator, {
        str: "is not  unknown",
        result: {operator: "is not unknown"}
    });

    testSyntax(Operator, {
        str: "sImilar  To",
        result: {operator: "similar to"}
    });

    testSyntax(Operator, {
        str: "iLike",
        result: {operator: "ilike"}
    });

    testSyntax(Operator, {
        str: "likE",
        result: {operator: "like"}
    });

});