
import {testSyntax} from "../testSyntax";
import {Operator} from "../../lib/syntax/Operator";

describe("Operator", () => {

    testSyntax(Operator, {
        str: "-+-",
        shouldBe: {operator: "-"}
    });

    testSyntax(Operator, {
        str: "+-",
        shouldBe: {operator: "+"}
    });

    testSyntax(Operator, {
        str: "::",
        shouldBe: {operator: "::"}
    });
    


    testSyntax(Operator, {
        str: "=",
        shouldBe: {operator: "="}
    });
    
    testSyntax(Operator, {
        str: "<>",
        shouldBe: {operator: "<>"}
    });
    
    testSyntax(Operator, {
        str: "!=",
        shouldBe: {operator: "!="}
    });
    
    testSyntax(Operator, {
        str: "<",
        shouldBe: {operator: "<"}
    });
    
    testSyntax(Operator, {
        str: ">",
        shouldBe: {operator: ">"}
    });
    
    testSyntax(Operator, {
        str: "<=",
        shouldBe: {operator: "<="}
    });
    
    testSyntax(Operator, {
        str: ">=",
        shouldBe: {operator: ">="}
    });
    
    testSyntax(Operator, {
        str: "||",
        shouldBe: {operator: "||"}
    });
    
    testSyntax(Operator, {
        str: "!",
        shouldBe: {operator: "!"}
    });
    
    testSyntax(Operator, {
        str: "!!",
        shouldBe: {operator: "!!"}
    });
    
    testSyntax(Operator, {
        str: "%",
        shouldBe: {operator: "%"}
    });
    
    testSyntax(Operator, {
        str: "@",
        shouldBe: {operator: "@"}
    });
    
    testSyntax(Operator, {
        str: "-",
        shouldBe: {operator: "-"}
    });
    
    testSyntax(Operator, {
        str: "<<",
        shouldBe: {operator: "<<"}
    });
    
    testSyntax(Operator, {
        str: "&<",
        shouldBe: {operator: "&<"}
    });
    
    testSyntax(Operator, {
        str: "&>",
        shouldBe: {operator: "&>"}
    });
    
    testSyntax(Operator, {
        str: ">>",
        shouldBe: {operator: ">>"}
    });
    
    testSyntax(Operator, {
        str: "<@",
        shouldBe: {operator: "<@"}
    });
    
    testSyntax(Operator, {
        str: "@>",
        shouldBe: {operator: "@>"}
    });
    
    testSyntax(Operator, {
        str: "~=",
        shouldBe: {operator: "~="}
    });
    
    testSyntax(Operator, {
        str: "&&",
        shouldBe: {operator: "&&"}
    });
    
    testSyntax(Operator, {
        str: ">^",
        shouldBe: {operator: ">^"}
    });
    
    testSyntax(Operator, {
        str: "<^",
        shouldBe: {operator: "<^"}
    });
    
    testSyntax(Operator, {
        str: "@@",
        shouldBe: {operator: "@@"}
    });
    
    testSyntax(Operator, {
        str: "*",
        shouldBe: {operator: "*"}
    });
    
    testSyntax(Operator, {
        str: "<->",
        shouldBe: {operator: "<->"}
    });
    
    testSyntax(Operator, {
        str: "/",
        shouldBe: {operator: "/"}
    });
    
    testSyntax(Operator, {
        str: "+",
        shouldBe: {operator: "+"}
    });
    
    testSyntax(Operator, {
        str: "#=",
        shouldBe: {operator: "#="}
    });
    
    testSyntax(Operator, {
        str: "#<>",
        shouldBe: {operator: "#<>"}
    });
    
    testSyntax(Operator, {
        str: "#<",
        shouldBe: {operator: "#<"}
    });
    
    testSyntax(Operator, {
        str: "#>",
        shouldBe: {operator: "#>"}
    });
    
    testSyntax(Operator, {
        str: "#<=",
        shouldBe: {operator: "#<="}
    });
    
    testSyntax(Operator, {
        str: "#>=",
        shouldBe: {operator: "#>="}
    });
    
    testSyntax(Operator, {
        str: "<?>",
        shouldBe: {operator: "<?>"}
    });
    
    testSyntax(Operator, {
        str: "|/",
        shouldBe: {operator: "|/"}
    });
    
    testSyntax(Operator, {
        str: "||/",
        shouldBe: {operator: "||/"}
    });
    
    testSyntax(Operator, {
        str: "|",
        shouldBe: {operator: "|"}
    });
    
    testSyntax(Operator, {
        str: "<#>",
        shouldBe: {operator: "<#>"}
    });
    
    testSyntax(Operator, {
        str: "~",
        shouldBe: {operator: "~"}
    });
    
    testSyntax(Operator, {
        str: "!~",
        shouldBe: {operator: "!~"}
    });
    
    testSyntax(Operator, {
        str: "#",
        shouldBe: {operator: "#"}
    });
    
    testSyntax(Operator, {
        str: "?#",
        shouldBe: {operator: "?#"}
    });
    
    testSyntax(Operator, {
        str: "@-@",
        shouldBe: {operator: "@-@"}
    });
    
    testSyntax(Operator, {
        str: "?-",
        shouldBe: {operator: "?-"}
    });
    
    testSyntax(Operator, {
        str: "?|",
        shouldBe: {operator: "?|"}
    });
    
    testSyntax(Operator, {
        str: "^",
        shouldBe: {operator: "^"}
    });
    
    testSyntax(Operator, {
        str: "~~",
        shouldBe: {operator: "~~"}
    });
    
    testSyntax(Operator, {
        str: "!~~",
        shouldBe: {operator: "!~~"}
    });
    
    testSyntax(Operator, {
        str: "~*",
        shouldBe: {operator: "~*"}
    });
    
    testSyntax(Operator, {
        str: "!~*",
        shouldBe: {operator: "!~*"}
    });
    
    testSyntax(Operator, {
        str: "|>>",
        shouldBe: {operator: "|>>"}
    });
    
    testSyntax(Operator, {
        str: "<<|",
        shouldBe: {operator: "<<|"}
    });
    
    testSyntax(Operator, {
        str: "?||",
        shouldBe: {operator: "?||"}
    });
    
    testSyntax(Operator, {
        str: "?-|",
        shouldBe: {operator: "?-|"}
    });
    
    testSyntax(Operator, {
        str: "##",
        shouldBe: {operator: "##"}
    });
    
    testSyntax(Operator, {
        str: "&",
        shouldBe: {operator: "&"}
    });
    
    testSyntax(Operator, {
        str: "<<=",
        shouldBe: {operator: "<<="}
    });
    
    testSyntax(Operator, {
        str: ">>=",
        shouldBe: {operator: ">>="}
    });
    
    testSyntax(Operator, {
        str: "~~*",
        shouldBe: {operator: "~~*"}
    });
    
    testSyntax(Operator, {
        str: "!~~*",
        shouldBe: {operator: "!~~*"}
    });
    
    testSyntax(Operator, {
        str: "~<~",
        shouldBe: {operator: "~<~"}
    });
    
    testSyntax(Operator, {
        str: "~<=~",
        shouldBe: {operator: "~<=~"}
    });
    
    testSyntax(Operator, {
        str: "~>=~",
        shouldBe: {operator: "~>=~"}
    });
    
    testSyntax(Operator, {
        str: "~>~",
        shouldBe: {operator: "~>~"}
    });
    
    testSyntax(Operator, {
        str: "&<|",
        shouldBe: {operator: "&<|"}
    });
    
    testSyntax(Operator, {
        str: "|&>",
        shouldBe: {operator: "|&>"}
    });
    
    testSyntax(Operator, {
        str: "@@@",
        shouldBe: {operator: "@@@"}
    });
    
    testSyntax(Operator, {
        str: "*=",
        shouldBe: {operator: "*="}
    });
    
    testSyntax(Operator, {
        str: "*<>",
        shouldBe: {operator: "*<>"}
    });
    
    testSyntax(Operator, {
        str: "*<",
        shouldBe: {operator: "*<"}
    });
    
    testSyntax(Operator, {
        str: "*>",
        shouldBe: {operator: "*>"}
    });
    
    testSyntax(Operator, {
        str: "*<=",
        shouldBe: {operator: "*<="}
    });
    
    testSyntax(Operator, {
        str: "*>=",
        shouldBe: {operator: "*>="}
    });
    
    testSyntax(Operator, {
        str: "-|-",
        shouldBe: {operator: "-|-"}
    });
    
    testSyntax(Operator, {
        str: "->",
        shouldBe: {operator: "->"}
    });
    
    testSyntax(Operator, {
        str: "->>",
        shouldBe: {operator: "->>"}
    });
    
    testSyntax(Operator, {
        str: "#>>",
        shouldBe: {operator: "#>>"}
    });
    
    testSyntax(Operator, {
        str: "?",
        shouldBe: {operator: "?"}
    });
    
    testSyntax(Operator, {
        str: "?&",
        shouldBe: {operator: "?&"}
    });
    
    testSyntax(Operator, {
        str: "#-",
        shouldBe: {operator: "#-"}
    });
    
    testSyntax(Operator, {
        str: "and",
        shouldBe: {operator: "and"}
    });
    
    testSyntax(Operator, {
        str: "or",
        shouldBe: {operator: "or"}
    });
    
    testSyntax(Operator, {
        str: "not",
        shouldBe: {operator: "not"}
    });

    testSyntax(Operator, {
        str: "is",
        shouldBe: {operator: "is"}
    });

    testSyntax(Operator, {
        str: "is  Not null",
        shouldBe: {operator: "is not"}
    });

    testSyntax(Operator, {
        str: "is Distinct from",
        shouldBe: {operator: "is distinct from"}
    });

    testSyntax(Operator, {
        str: "operator( pg_catalog.+  )",
        shouldBe: {operator: "operator(pg_catalog.+)"}
    });

    testSyntax(Operator, {
        str: "isnull some",
        shouldBe: {operator: "isnull"}
    });

    testSyntax(Operator, {
        str: "notnull some",
        shouldBe: {operator: "notnull"}
    });

    testSyntax(Operator, {
        str: "is not distinct from",
        shouldBe: {operator: "is not distinct from"}
    });

    testSyntax(Operator, {
        str: "is unknown",
        shouldBe: {operator: "is unknown"}
    });

    testSyntax(Operator, {
        str: "is not  unknown",
        shouldBe: {operator: "is not unknown"}
    });

    testSyntax(Operator, {
        str: "sImilar  To",
        shouldBe: {operator: "similar to"}
    });

    testSyntax(Operator, {
        str: "iLike",
        shouldBe: {operator: "ilike"}
    });

    testSyntax(Operator, {
        str: "likE",
        shouldBe: {operator: "like"}
    });


    testSyntax(Operator, {
        str: "operator(  )",
        error: /invalid operator/
    });

});
