

import GrapeQLCoach from "../../lib/GrapeQLCoach";
import assert from "assert";
import SystemVariable from "../../lib/syntax/SystemVariable";

describe("SystemVariable", () => {

    GrapeQLCoach.test(SystemVariable, {
        str: "$x",
        result: {name: "x"}
    });

    GrapeQLCoach.test(SystemVariable, {
        str: "$X",
        result: {name: "X"}
    });

    GrapeQLCoach.test(SystemVariable, {
        str: "$_",
        result: {name: "_"}
    });

    GrapeQLCoach.test(SystemVariable, {
        str: "$x1",
        result: {name: "x1"}
    });

    GrapeQLCoach.test(SystemVariable, {
        str: "$Ёё",
        result: {name: "Ёё"}
    });

    GrapeQLCoach.test(SystemVariable, {
        str: "$Привет",
        result: {name: "Привет"}
    });

    GrapeQLCoach.test(SystemVariable, {
        str: "$$Any_Variable",
        error: /forbidden symbol \$ in variable name/
    });

    GrapeQLCoach.test(SystemVariable, {
        str: "$",
        error: /expect variable name/
    });

    it("toLowerCase()", () => {
        const coach = new GrapeQLCoach("$HELLO");
        const sysVar = coach.parse(SystemVariable);

        assert.equal( sysVar.toLowerCase(), "hello" );
    });

});
