
import CreateView from "../../lib/syntax/CreateView";
import testSyntax from "../testSyntax";
import assert from "assert";
import { GrapeQLCoach } from "../../lib/GrapeQLCoach";

describe("CreateView", () => {

    testSyntax(CreateView, {
        str: "create view test as select 1",
        result: {
            schema: null,
            name: {
                word: "test",
                content: null
            },
            select: {
                with: null,
                columns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]},
                        as: null
                    }
                ],
                from: null,
                where: null,
                groupBy: null,
                having: null,
                window: null,
                orderBy: null,
                union: null,
                offset: null,
                offsetRow: null,
                offsetRows: null,
                limit: null,
                fetch: null
            }
        }
    });
    
    testSyntax(CreateView, {
        str: "create view public.test as select 1",
        result: {
            schema: {
                word: "public",
                content: null
            },
            name: {
                word: "test",
                content: null
            },
            select: {
                with: null,
                columns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]},
                        as: null
                    }
                ],
                from: null,
                where: null,
                groupBy: null,
                having: null,
                window: null,
                orderBy: null,
                union: null,
                offset: null,
                offsetRow: null,
                offsetRows: null,
                limit: null,
                fetch: null
            }
        }
    });
    
    testSyntax(CreateView, {
        str: "view public.test as select 1",
        result: {
            schema: {
                word: "public",
                content: null
            },
            name: {
                word: "test",
                content: null
            },
            select: {
                with: null,
                columns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]},
                        as: null
                    }
                ],
                from: null,
                where: null,
                groupBy: null,
                having: null,
                window: null,
                orderBy: null,
                union: null,
                offset: null,
                offsetRow: null,
                offsetRows: null,
                limit: null,
                fetch: null
            }
        }
    });
    
    testSyntax(CreateView, {
        str: "view test as select 1",
        result: {
            schema: null,
            name: {
                word: "test",
                content: null
            },
            select: {
                with: null,
                columns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]},
                        as: null
                    }
                ],
                from: null,
                where: null,
                groupBy: null,
                having: null,
                window: null,
                orderBy: null,
                union: null,
                offset: null,
                offsetRow: null,
                offsetRows: null,
                limit: null,
                fetch: null
            }
        }
    });
    
    testSyntax(CreateView, {
        str: "create or replace view test as select 1",
        result: {
            schema: null,
            name: {
                word: "test",
                content: null
            },
            select: {
                with: null,
                columns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]},
                        as: null
                    }
                ],
                from: null,
                where: null,
                groupBy: null,
                having: null,
                window: null,
                orderBy: null,
                union: null,
                offset: null,
                offsetRow: null,
                offsetRows: null,
                limit: null,
                fetch: null
            }
        }
    });

    testSyntax(CreateView, {
        str: `create/*ignore me*/ view/****/ test as 
        -- inline comment
        select /* multi  
        line */ 1`,
        result: {
            schema: null,
            name: {
                word: "test",
                content: null
            },
            select: {
                with: null,
                columns: [
                    {
                        expression: {elements: [
                            {number: "1"}
                        ]},
                        as: null
                    }
                ],
                from: null,
                where: null,
                groupBy: null,
                having: null,
                window: null,
                orderBy: null,
                union: null,
                offset: null,
                offsetRow: null,
                offsetRows: null,
                limit: null,
                fetch: null
            }
        }
    });

    
    it("CreateView.is('create or replace function')", () => {
        const coach = new GrapeQLCoach("-- create or replace function");

        const actual = coach.is(CreateView);
        assert.strictEqual(actual, false);
    });
});
