
import {GrapeQLCoach} from "../../lib/GrapeQLCoach";
import assert from "assert";
import {testSyntax} from "../testSyntax";
import {SystemVariable} from "../../lib/syntax/SystemVariable";

describe("SystemVariable", () => {

    testSyntax(SystemVariable, {
        str: "$x",
        shouldBe: {name: "x"}
    });

    testSyntax(SystemVariable, {
        str: "$X",
        shouldBe: {name: "X"}
    });

    testSyntax(SystemVariable, {
        str: "$_",
        shouldBe: {name: "_"}
    });

    testSyntax(SystemVariable, {
        str: "$x1",
        shouldBe: {name: "x1"}
    });

    testSyntax(SystemVariable, {
        str: "$Ёё",
        shouldBe: {name: "Ёё"}
    });

    testSyntax(SystemVariable, {
        str: "$Привет",
        shouldBe: {name: "Привет"}
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
