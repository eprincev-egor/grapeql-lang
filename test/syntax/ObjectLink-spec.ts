


import ObjectLink from "../../lib/syntax/ObjectLink";
import ObjectName from "../../lib/syntax/ObjectName";

import GrapeQLCoach from "../../lib/GrapeQLCoach";
import assert from "assert";

describe("ObjectLink", () => {

    GrapeQLCoach.test(ObjectLink, {
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

    GrapeQLCoach.test(ObjectLink, {
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

    GrapeQLCoach.test(ObjectLink, {
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
    
    GrapeQLCoach.test(ObjectLink, {
        str: "*",
        options: {
            availableStar: true
        },
        result: {
            star: true,
            link: []
        }
    });

    GrapeQLCoach.test(ObjectLink, {
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
    
    GrapeQLCoach.test(ObjectLink, {
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
        let objectLink = coach.parse(ObjectLink, {
            availableStar: true
        });

        assert.ok( objectLink.isStar() );


        coach = new GrapeQLCoach("schema.table");
        objectLink = coach.parse(ObjectLink, {
            availableStar: true
        });

        assert.ok( !objectLink.isStar() );
    });

    it("objectLink.first(), objectLink.last()", () => {
        const coach = new GrapeQLCoach("schema.table");
        const objectLink = coach.parse(ObjectLink);


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
        const coach = new GrapeQLCoach("public.table");
        const objectLink = coach.parse(ObjectLink);

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
        const coach = new GrapeQLCoach("public");
        const objectLink = coach.parse(ObjectLink);

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
        const objectName = new ObjectName({
            word: "id"
        });

        objectLink.push( objectName );
        assert.equal( objectLink.toString(), "public.table.id" );

        assert.equal(counter, 2);
    });

});
