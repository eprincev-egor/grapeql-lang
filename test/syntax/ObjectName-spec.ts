
import {GrapeQLCoach} from "../../lib/GrapeQLCoach";
import {testSyntax} from "../testSyntax";
import assert from "assert";
import {ObjectName} from "../../lib/syntax/ObjectName";

describe("ObjectName", () => {

    testSyntax(ObjectName, {
        str: "\"Nice\"",
        shouldBe: {
            content: "Nice"
        }
    });

    testSyntax(ObjectName, {
        str: "NICE",
        shouldBe: {
            word: "nice"
        }
    });

    it(" word .toLowerCase()", () => {
        const coach = new GrapeQLCoach("SomE");
        const objectName = coach.parse(ObjectName);

        assert.equal(
            objectName.toLowerCase(),
            "some"
        );
    });
    

    it(" \"Content\" .toLowerCase()", () => {
        const coach = new GrapeQLCoach("\"Content\"");
        const objectName = coach.parse(ObjectName);

        assert.equal(
            objectName.toLowerCase(),
            "Content"
        );
    });
});
