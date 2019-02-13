"use strict";
"use strict";

const ObjectName = require("../../lib/syntax/ObjectName");
const GrapeQLCoach = require("../../lib/GrapeQLCoach");
const testSyntax = require("../testSyntax");
const assert = require("assert");

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
        let coach = new GrapeQLCoach("SomE");
        let objectName = coach.parseObjectName();

        assert.equal(
            objectName.toLowerCase(),
            "some"
        );
    });
    

    it(" \"Content\" .toLowerCase()", () => {
        let coach = new GrapeQLCoach("\"Content\"");
        let objectName = coach.parseObjectName();

        assert.equal(
            objectName.toLowerCase(),
            "Content"
        );
    });
});