

import ObjectName from "../../lib/syntax/ObjectName";
import GrapeQLCoach from "../../lib/GrapeQLCoach";

import assert from "assert";

describe("ObjectName", () => {

    GrapeQLCoach.test(ObjectName, {
        str: "\"Nice\"",
        result: {
            content: "Nice",
            word: null
        }
    });

    GrapeQLCoach.test(ObjectName, {
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
