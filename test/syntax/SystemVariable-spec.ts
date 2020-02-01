

import GrapeQLCoach from "../../lib/GrapeQLCoach";
import assert from "assert";
import SystemVariable from "../../lib/syntax/SystemVariable";
import testSyntax from "../testSyntax";

describe("SystemVariable", () => {

    testSyntax(SystemVariable, {
        str: "$x",
        result: {name: "x"}
    });

    testSyntax(SystemVariable, {
        str: "$X",
        result: {name: "X"}
    });

    testSyntax(SystemVariable, {
        str: "$_",
        result: {name: "_"}
    });

    testSyntax(SystemVariable, {
        str: "$x1",
        result: {name: "x1"}
    });

    testSyntax(SystemVariable, {
        str: "$Ёё",
        result: {name: "Ёё"}
    });

    testSyntax(SystemVariable, {
        str: "$Привет",
        result: {name: "Привет"}
    });

    testSyntax(SystemVariable, {
        str: "$$Any_Variable",
        error: /forbidden symbol \$ in variable name/
    });

    testSyntax(SystemVariable, {
        str: "$",
        error: /expect variable name/
    });

    it("toLowerCase()", () => {
        const coach = new GrapeQLCoach("$HELLO");
        const sysVar = coach.parse(SystemVariable);

        assert.equal( sysVar.toLowerCase(), "hello" );
    });

});
