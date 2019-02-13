"use strict";
"use strict";

const ObjectLink = require("../../lib/syntax/ObjectLink");
const ObjectName = require("../../lib/syntax/ObjectName");
const testSyntax = require("../testSyntax");
const GrapeQLCoach = require("../../lib/GrapeQLCoach");
const assert = require("assert");

describe("ObjectName", () => {

    testSyntax(ObjectLink, {
        str: "a.B.c",
        result: {
            star: false,
            link: [
                {
                    word: "a",
                    content: null
                },
                {
                    word: "b",
                    content: null
                },
                {
                    word: "c",
                    content: null
                }
            ]
        }
    });

    testSyntax(ObjectLink, {
        str: "a.b.c.d.e.f",
        result: {
            star: false,
            link: [
                {
                    word: "a",
                    content: null
                },
                {
                    word: "b",
                    content: null
                },
                {
                    word: "c",
                    content: null
                },
                {
                    word: "d",
                    content: null
                },
                {
                    word: "e",
                    content: null
                },
                {
                    word: "f",
                    content: null
                }
            ]
        }
    });

    testSyntax(ObjectLink, {
        str: `"Nice"
            .
            "test"   . X.y."some"
            `,
        result: {
            star: false,
            link: [
                {
                    word: null,
                    content: "Nice"
                },
                {
                    word: null,
                    content: "test"
                },
                {
                    word: "x",
                    content: null
                },
                {
                    word: "y",
                    content: null
                },
                {
                    word: null,
                    content: "some"
                }
            ]
        }
    });
    
    testSyntax(ObjectLink, {
        str: "*",
        options: {
            availableStar: true
        },
        result: {
            star: true,
            link: []
        }
    });

    testSyntax(ObjectLink, {
        str: "some.*",
        options: {
            availableStar: true
        },
        result: {
            star: true,
            link: [
                {
                    content: null,
                    word: "some"
                }
            ]
        }
    });
    
    testSyntax(ObjectLink, {
        str: "some . *",
        options: {
            availableStar: true
        },
        result: {
            star: true,
            link: [
                {
                    content: null,
                    word: "some"
                }
            ]
        }
    });

    it("objectLink.isStar()", () => {
        let coach = new GrapeQLCoach("table.*");
        let objectLink = coach.parseObjectLink({
            availableStar: true
        });

        assert.ok( objectLink.isStar() );


        coach = new GrapeQLCoach("schema.table");
        objectLink = coach.parseObjectLink({
            availableStar: true
        });

        assert.ok( !objectLink.isStar() );
    });

    it("objectLink.first(), objectLink.last()", () => {
        let coach = new GrapeQLCoach("schema.table");
        let objectLink = coach.parseObjectLink();


        assert.deepEqual( objectLink.first().toJSON(), {
            word: "schema",
            content: null
        });

        assert.deepEqual( objectLink.last().toJSON(), {
            word: "table",
            content: null
        });
    });
    
    it("objectLink.clear()", () => {
        let coach = new GrapeQLCoach("public.table");
        let objectLink = coach.parseObjectLink();

        assert.equal( objectLink.toString(), "public.table" );
        
        let counter = 0;
        objectLink.on("change", () => {
            counter++;
        });

        objectLink.clear();
        assert.equal( objectLink.toString(), "" );

        assert.equal(counter, 1);
    });

    it("objectLink.push()", () => {
        let coach = new GrapeQLCoach("public");
        let objectLink = coach.parseObjectLink();

        assert.equal( objectLink.toString(), "public" );
        
        let counter = 0;
        objectLink.on("change", () => {
            counter++;
        });

        // push string
        objectLink.push("table");
        assert.equal( objectLink.toString(), "public.table" );

        assert.equal(counter, 1);


        // push <ObjectName>
        let objectName = new ObjectName({
            word: "id"
        });

        objectLink.push( objectName );
        assert.equal( objectLink.toString(), "public.table.id" );

        assert.equal(counter, 2);
    });

});
