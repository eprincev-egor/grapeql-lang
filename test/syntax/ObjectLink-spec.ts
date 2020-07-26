
import {GrapeQLCoach} from "../../lib/GrapeQLCoach";
import {testSyntax} from "../testSyntax";
import assert from "assert";
import {ObjectLink} from "../../lib/syntax/ObjectLink";
import {ObjectName} from "../../lib/syntax/ObjectName";

describe("ObjectLink", () => {

    testSyntax(ObjectLink, {
        str: "a.B.c",
        shouldBe: {
            star: false,
            link: [
                {
                    word: "a"
                },
                {
                    word: "b"
                },
                {
                    word: "c"
                }
            ]
        }
    });

    testSyntax(ObjectLink, {
        str: "a.b.c.d.e.f",
        shouldBe: {
            star: false,
            link: [
                {
                    word: "a"
                },
                {
                    word: "b"
                },
                {
                    word: "c"
                },
                {
                    word: "d"
                },
                {
                    word: "e"
                },
                {
                    word: "f"
                }
            ]
        }
    });

    testSyntax(ObjectLink, {
        str: `"Nice"
            .
            "test"   . X.y."some"
            `,
        shouldBe: {
            star: false,
            link: [
                {
                    content: "Nice"
                },
                {
                    content: "test"
                },
                {
                    word: "x"
                },
                {
                    word: "y"
                },
                {
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
        shouldBe: {
            star: true,
            link: []
        }
    });

    testSyntax(ObjectLink, {
        str: "some.*",
        options: {
            availableStar: true
        },
        shouldBe: {
            star: true,
            link: [
                {
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
        shouldBe: {
            star: true,
            link: [
                {
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
