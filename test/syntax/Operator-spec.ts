
import Operator from "../../lib/syntax/Operator";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("Operator", () => {

    GrapeQLCoach.test(Operator, {
        str: "-+-",
        result: {operator: "-"}
    });

    GrapeQLCoach.test(Operator, {
        str: "+-",
        result: {operator: "+"}
    });

    GrapeQLCoach.test(Operator, {
        str: "::",
        result: {operator: "::"}
    });
    


    GrapeQLCoach.test(Operator, {
        str: "=",
        result: {operator: "="}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "<>",
        result: {operator: "<>"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "!=",
        result: {operator: "!="}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "<",
        result: {operator: "<"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: ">",
        result: {operator: ">"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "<=",
        result: {operator: "<="}
    });
    
    GrapeQLCoach.test(Operator, {
        str: ">=",
        result: {operator: ">="}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "||",
        result: {operator: "||"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "!",
        result: {operator: "!"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "!!",
        result: {operator: "!!"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "%",
        result: {operator: "%"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "@",
        result: {operator: "@"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "-",
        result: {operator: "-"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "<<",
        result: {operator: "<<"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "&<",
        result: {operator: "&<"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "&>",
        result: {operator: "&>"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: ">>",
        result: {operator: ">>"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "<@",
        result: {operator: "<@"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "@>",
        result: {operator: "@>"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "~=",
        result: {operator: "~="}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "&&",
        result: {operator: "&&"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: ">^",
        result: {operator: ">^"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "<^",
        result: {operator: "<^"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "@@",
        result: {operator: "@@"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "*",
        result: {operator: "*"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "<->",
        result: {operator: "<->"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "/",
        result: {operator: "/"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "+",
        result: {operator: "+"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "#=",
        result: {operator: "#="}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "#<>",
        result: {operator: "#<>"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "#<",
        result: {operator: "#<"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "#>",
        result: {operator: "#>"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "#<=",
        result: {operator: "#<="}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "#>=",
        result: {operator: "#>="}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "<?>",
        result: {operator: "<?>"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "|/",
        result: {operator: "|/"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "||/",
        result: {operator: "||/"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "|",
        result: {operator: "|"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "<#>",
        result: {operator: "<#>"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "~",
        result: {operator: "~"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "!~",
        result: {operator: "!~"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "#",
        result: {operator: "#"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "?#",
        result: {operator: "?#"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "@-@",
        result: {operator: "@-@"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "?-",
        result: {operator: "?-"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "?|",
        result: {operator: "?|"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "^",
        result: {operator: "^"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "~~",
        result: {operator: "~~"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "!~~",
        result: {operator: "!~~"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "~*",
        result: {operator: "~*"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "!~*",
        result: {operator: "!~*"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "|>>",
        result: {operator: "|>>"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "<<|",
        result: {operator: "<<|"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "?||",
        result: {operator: "?||"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "?-|",
        result: {operator: "?-|"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "##",
        result: {operator: "##"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "&",
        result: {operator: "&"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "<<=",
        result: {operator: "<<="}
    });
    
    GrapeQLCoach.test(Operator, {
        str: ">>=",
        result: {operator: ">>="}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "~~*",
        result: {operator: "~~*"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "!~~*",
        result: {operator: "!~~*"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "~<~",
        result: {operator: "~<~"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "~<=~",
        result: {operator: "~<=~"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "~>=~",
        result: {operator: "~>=~"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "~>~",
        result: {operator: "~>~"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "&<|",
        result: {operator: "&<|"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "|&>",
        result: {operator: "|&>"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "@@@",
        result: {operator: "@@@"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "*=",
        result: {operator: "*="}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "*<>",
        result: {operator: "*<>"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "*<",
        result: {operator: "*<"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "*>",
        result: {operator: "*>"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "*<=",
        result: {operator: "*<="}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "*>=",
        result: {operator: "*>="}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "-|-",
        result: {operator: "-|-"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "->",
        result: {operator: "->"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "->>",
        result: {operator: "->>"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "#>>",
        result: {operator: "#>>"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "?",
        result: {operator: "?"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "?&",
        result: {operator: "?&"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "#-",
        result: {operator: "#-"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "and",
        result: {operator: "and"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "or",
        result: {operator: "or"}
    });
    
    GrapeQLCoach.test(Operator, {
        str: "not",
        result: {operator: "not"}
    });

    GrapeQLCoach.test(Operator, {
        str: "is",
        result: {operator: "is"}
    });

    GrapeQLCoach.test(Operator, {
        str: "is  Not null",
        result: {operator: "is not"}
    });

    GrapeQLCoach.test(Operator, {
        str: "is Distinct from",
        result: {operator: "is distinct from"}
    });

    GrapeQLCoach.test(Operator, {
        str: "operator( pg_catalog.+  )",
        result: {operator: "operator(pg_catalog.+)"}
    });

    GrapeQLCoach.test(Operator, {
        str: "isnull some",
        result: {operator: "isnull"}
    });

    GrapeQLCoach.test(Operator, {
        str: "notnull some",
        result: {operator: "notnull"}
    });

    GrapeQLCoach.test(Operator, {
        str: "is not distinct from",
        result: {operator: "is not distinct from"}
    });

    GrapeQLCoach.test(Operator, {
        str: "is unknown",
        result: {operator: "is unknown"}
    });

    GrapeQLCoach.test(Operator, {
        str: "is not  unknown",
        result: {operator: "is not unknown"}
    });

    GrapeQLCoach.test(Operator, {
        str: "sImilar  To",
        result: {operator: "similar to"}
    });

    GrapeQLCoach.test(Operator, {
        str: "iLike",
        result: {operator: "ilike"}
    });

    GrapeQLCoach.test(Operator, {
        str: "likE",
        result: {operator: "like"}
    });


    GrapeQLCoach.test(Operator, {
        str: "operator(  )",
        error: /invalid operator/
    });

});
