

import ObjectName from "../../lib/syntax/ObjectName";
import GrapeQLCoach from "../../lib/GrapeQLCoach";
import testSyntax from "../testSyntax";
import assert from "assert";

describe("ObjectName", () => {

    testSyntax(ObjectName, {
        str: "\"Nice\"",
        result: {
            content: "Nice",
            word: null
        }
    });

    testSyntax(ObjectName, {
        str: "NICE",
        result: {
            word: "nice",
            content: null
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
