
import { GrapeQLCoach } from "../../lib/GrapeQLCoach";
import {testSyntax} from "../testSyntax";
import assert from "assert";
import {CreateView} from "../../lib/syntax/CreateView";

describe("CreateView", () => {

    testSyntax(CreateView, {
        str: "create view test as select 1",
        shouldBe: {
            name: {
                word: "test"
            },
            select: {
                columns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]}
                    }
                ]
            }
        }
    });
    
    testSyntax(CreateView, {
        str: "create view public.test as select 1",
        shouldBe: {
            schema: {
                word: "public"
            },
            name: {
                word: "test"
            },
            select: {
                columns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]}
                    }
                ]
            }
        }
    });
    
    testSyntax(CreateView, {
        str: "view public.test as select 1",
        shouldBe: {
            schema: {
                word: "public"
            },
            name: {
                word: "test"
            },
            select: {
                columns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]}
                    }
                ]
            }
        }
    });
    
    testSyntax(CreateView, {
        str: "view test as select 1",
        shouldBe: {
            name: {
                word: "test"
            },
            select: {
                columns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]}
                    }
                ]
            }
        }
    });
    
    testSyntax(CreateView, {
        str: "create or replace view test as select 1",
        shouldBe: {
            name: {
                word: "test"
            },
            select: {
                columns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]}
                    }
                ]
            }
        }
    });

    testSyntax(CreateView, {
        str: `create/*ignore me*/ view/****/ test as 
        -- inline comment
        select /* multi  
        line */ 1`,
        shouldBe: {
            name: {
                word: "test"
            },
            select: {
                columns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]}
                    }
                ]
            }
        }
    });

    
    it("CreateView.is('create or replace function')", () => {
        const coach = new GrapeQLCoach("-- create or replace function");

        const actual = coach.is(CreateView);
        assert.strictEqual(actual, false);
    });
});
