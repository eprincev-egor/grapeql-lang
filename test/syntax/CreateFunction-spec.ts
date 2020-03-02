
import CreateFunction from "../../lib/syntax/CreateFunction";
import testSyntax from "../testSyntax";
import {GrapeQLCoach} from "../../lib/GrapeQLCoach";
import assert from "assert";

describe("CreateFunction", () => {

    testSyntax(CreateFunction, {
        str: `create or replace function 
            TEST_NAME(xid integer, names text[])
            returns table(
                id integer, 
                sum numeric
            ) as $body$begin;end$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_name",
            args: [
                {
                    name: "xid",
                    type: "integer",
                    out: null,
                    in: null,
                    default: null
                },
                {
                    name: "names",
                    type: "text[]",
                    out: null,
                    in: null,
                    default: null
                }
            ],
            returns: {
                setof: null,
                type: null,
                table: [
                    {
                        name: "id",
                        type: "integer",
                        out: null,
                        in: null,
                        default: null
                    },
                    {
                        name: "sum",
                        type: "numeric",
                        out: null,
                        in: null,
                        default: null
                    }
                ]
            },
            body: {
                content: "begin;end"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function 
            TEST_NAME(id integer)
            returns table(
                id integer
            ) as $body$begin;end$body$
            language plpgsql;
        `,
        error: /parameter name "id" used more than once/
    });

    testSyntax(CreateFunction, {
        str: `create or replace function 
            TEST_NAME()
            returns table(
                id integer,
                id text
            ) as $body$begin;end$body$
            language plpgsql;
        `,
        error: /parameter name "id" used more than once/
    });

    testSyntax(CreateFunction, {
        str: `create or replace function 
            TEST_NAME(id integer, id text)
            returns integer as $body$begin;end$body$
            language plpgsql;
        `,
        error: /parameter name "id" used more than once/
    });

    testSyntax(CreateFunction, {
        str: `create or replace function 
            TEST_NAME(xid integer, names text[])
            returns table(
                id integer, 
                sum numeric
            ) 
            language plpgsql
            as $body$begin;end$body$
            ;
        `,
        result: {
            schema: "public",
            name: "test_name",
            args: [
                {
                    name: "xid",
                    type: "integer",
                    out: null,
                    in: null,
                    default: null
                },
                {
                    name: "names",
                    type: "text[]",
                    out: null,
                    in: null,
                    default: null
                }
            ],
            returns: {
                setof: null,
                type: null,
                table: [
                    {
                        name: "id",
                        type: "integer",
                        out: null,
                        in: null,
                        default: null
                    },
                    {
                        name: "sum",
                        type: "numeric",
                        out: null,
                        in: null,
                        default: null
                    }
                ]
            },
            body: {
                content: "begin;end"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function TEST_NAME()
            returns trigger as $body$begin;end$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_name",
            args: [],
            returns: {
                setof: null,
                table: null,
                type: "trigger"
            },
            body: {
                content: "begin;end"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create Function TEST_NAME()
            returns trigger as $body$begin;end$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_name",
            args: [],
            returns: {
                setof: null,
                table: null,
                type: "trigger"
            },
            body: {
                content: "begin;end"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create Function TEST_NAME()
            returns void as $body$begin;end$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_name",
            args: [],
            returns: {
                setof: null,
                table: null,
                type: "void"
            },
            body: {
                content: "begin;end"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create Function TEST_NAME(
            a text default 'hi'
        )
            returns void as $body$begin;end$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_name",
            args: [
                {
                    name: "a",
                    type: "text",
                    default: "'hi'",
                    out: null,
                    in: null
                }
            ],
            returns: {
                setof: null,
                table: null,
                type: "void"
            },
            body: {
                content: "begin;end"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });
    
    testSyntax(CreateFunction, {
        str: `create Function test(
            a text default null,
            b integer
        )
            returns void as $body$begin;end$body$
            language plpgsql;
        `,
        error: /input parameters after one with a default value must also have defaults/
    });


    testSyntax(CreateFunction, {
        str: `create function test_sql_lang()
            returns integer as $body$select 1$body$
            language sql;
        `,
        result: {
            schema: "public",
            name: "test_sql_lang",
            language: "sql",
            args: [],
            returns: {
                setof: null,
                table: null,
                type: "integer"
            },
            body: {
                content: "select 1"
            },

            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create function some_func()
            returns integer as $body$begin\nend$body$
            language plpgsql
            immutable;
        `,
        result: {
            schema: "public",
            name: "some_func",
            language: "plpgsql",
            args: [],
            returns: {
                setof: null,
                table: null,
                type: "integer"
            },
            body: {
                content: "begin\nend"
            },
            immutable: true,

            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create function some_func()
            returns integer as $body$begin\nend$body$
            language plpgsql
            stable;
        `,
        result: {
            schema: "public",
            name: "some_func",
            language: "plpgsql",
            args: [],
            returns: {
                setof: null,
                table: null,
                type: "integer"
            },
            body: {
                content: "begin\nend"
            },
            stable: true,

            immutable: null,
            returnsNullOnNull: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create function some_func()
            returns integer as $body$begin\nend$body$
            language plpgsql
            volatile;
        `,
        result: {
            schema: "public",
            name: "some_func",
            language: "plpgsql",
            args: [],
            returns: {
                setof: null,
                table: null,
                type: "integer"
            },
            body: {
                content: "begin\nend"
            },

            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create function some_func()
            returns integer as $body$begin\nend$body$
            language plpgsql
            cost 101;
        `,
        result: {
            schema: "public",
            name: "some_func",
            language: "plpgsql",
            args: [],
            returns: {
                setof: null,
                table: null,
                type: "integer"
            },
            body: {
                content: "begin\nend"
            },
            cost: 101,

            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create function some_func()
            returns integer as $body$begin\nend$body$
            language plpgsql
            volatile
            cost 101;
        `,
        result: {
            schema: "public",
            name: "some_func",
            language: "plpgsql",
            args: [],
            returns: {
                setof: null,
                table: null,
                type: "integer"
            },
            body: {
                content: "begin\nend"
            },
            cost: 101,

            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create function some_func()
            returns integer as $body$begin\nend$body$
            language plpgsql
            stable
            cost 101;
        `,
        result: {
            schema: "public",
            name: "some_func",
            language: "plpgsql",
            args: [],
            returns: {
                setof: null,
                table: null,
                type: "integer"
            },
            body: {
                content: "begin\nend"
            },
            stable: true,
            cost: 101,

            immutable: null,
            returnsNullOnNull: null,
            strict: null,
            parallel: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create function some_func()
            returns integer 
            language plpgsql
            stable
            cost 101
            as $body$begin\nend$body$;
        `,
        result: {
            schema: "public",
            name: "some_func",
            language: "plpgsql",
            args: [],
            returns: {
                setof: null,
                table: null,
                type: "integer"
            },
            body: {
                content: "begin\nend"
            },
            stable: true,
            cost: 101,

            immutable: null,
            returnsNullOnNull: null,
            strict: null,
            parallel: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function test_func()
            returns some_schema.some_table
            as $body$begin\nend$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_func",
            args: [],
            returns: {
                setof: null,
                table: null,
                type: "some_schema.some_table"
            },
            body: {
                content: "begin\nend"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function test_func()
            returns setof some_schema.some_table
            as $body$begin\nend$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_func",
            args: [],
            returns: {
                table: null,
                setof: true,
                type: "some_schema.some_table"
            },
            body: {
                content: "begin\nend"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function test_func(company public.company)
            returns setof some_schema.some_table
            as $body$begin\nend$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_func",
            args: [
                {
                    name: "company",
                    type: "public.company",
                    out: null,
                    in: null,
                    default: null
                }
            ],
            returns: {
                table: null,
                setof: true,
                type: "some_schema.some_table"
            },
            body: {
                content: "begin\nend"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function test_func(companies public.company[])
            returns public.company[]
            as $body$begin\nend$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_func",
            args: [
                {
                    name: "companies",
                    type: "public.company[]",
                    out: null,
                    in: null,
                    default: null
                }
            ],
            returns: {
                setof: null,
                table: null,
                type: "public.company[]"
            },
            body: {
                content: "begin\nend"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function test_func(text, integer)
            returns void
            as $body$begin\nend$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_func",
            args: [
                {
                    name: null,
                    type: "text",
                    out: null,
                    in: null,
                    default: null
                },
                {
                    name: null,
                    type: "integer",
                    out: null,
                    in: null,
                    default: null
                }
            ],
            returns: {
                setof: null,
                table: null,
                type: "void"
            },
            body: {
                content: "begin\nend"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function test_func()
            returns void
            parallel safe
            as $body$begin\nend$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_func",
            args: [],
            parallel: "safe",
            returns: {
                setof: null,
                table: null,
                type: "void"
            },
            body: {
                content: "begin\nend"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function test_func()
            returns void
            parallel restricted
            as $body$begin\nend$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_func",
            args: [],
            parallel: "restricted",
            returns: {
                setof: null,
                table: null,
                type: "void"
            },
            body: {
                content: "begin\nend"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function test_func()
            returns void
            parallel unsafe
            as $body$begin\nend$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_func",
            args: [],
            parallel: "unsafe",
            returns: {
                setof: null,
                table: null,
                type: "void"
            },
            body: {
                content: "begin\nend"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function test_func()
            returns void
            parallel safe
            cost 12
            as $body$begin\nend$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_func",
            args: [],
            parallel: "safe",
            cost: 12,
            returns: {
                setof: null,
                table: null,
                type: "void"
            },
            body: {
                content: "begin\nend"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function test_func()
            returns void
            CALLED ON NULL INPUT
            as $body$begin\nend$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_func",
            args: [],
            returns: {
                setof: null,
                table: null,
                type: "void"
            },
            body: {
                content: "begin\nend"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function test_func()
            returns void
            RETURNS NULL ON NULL INPUT
            as $body$begin\nend$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_func",
            args: [],
            returnsNullOnNull: true,
            returns: {
                setof: null,
                table: null,
                type: "void"
            },
            body: {
                content: "begin\nend"
            },

            language: "plpgsql",
            immutable: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function test_func()
            returns void
            STRICT
            as $body$begin\nend$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_func",
            args: [],
            strict: true,
            returns: {
                setof: null,
                table: null,
                type: "void"
            },
            body: {
                content: "begin\nend"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function 
            TEST_NAME()
            returns table(
                some_arg character varying[]
            ) as $body$begin;end$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_name",
            args: [],
            returns: {
                setof: null,
                type: null,
                table: [
                    {
                        name: "some_arg",
                        type: "character varying[]",
                        in: null,
                        out: null,
                        default: null
                    }
                ]
            },
            body: {
                content: "begin;end"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create or replace function test_func()
            returns void
            as 'begin\nend'
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_func",
            args: [],
            strict: null,
            returns: {
                setof: null,
                table: null,
                type: "void"
            },
            body: {
                content: "begin\nend"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

    testSyntax(CreateFunction, {
        str: `create Function test()
            returns void as $body$begin;end$body$
            language something;
        `,
        error: /expected language plpgsql or sql/
    });

    testSyntax(CreateFunction, {
        str: `create or replace function 
            TEST_NAME(xid integer, names text[])
            returns table(
                id integer, 
                sum numeric
            ) as $body$begin;end$body$
            language plpgsql;

            comment on function test_name(integer, text[]) is 'test';
        `,
        result: {
            schema: "public",
            name: "test_name",
            args: [
                {
                    name: "xid",
                    type: "integer",
                    out: null,
                    in: null,
                    default: null
                },
                {
                    name: "names",
                    type: "text[]",
                    out: null,
                    in: null,
                    default: null
                }
            ],
            returns: {
                setof: null,
                type: null,
                table: [
                    {
                        name: "id",
                        type: "integer",
                        out: null,
                        in: null,
                        default: null
                    },
                    {
                        name: "sum",
                        type: "numeric",
                        out: null,
                        in: null,
                        default: null
                    }
                ]
            },
            body: {
                content: "begin;end"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: {
                comment: {
                    content: "test"
                },
                function: {
                    name: "test_name",
                    schema: "public",
                    args: ["integer", "text[]"]
                }
            }
        }
    });
    
    testSyntax(CreateFunction, {
        str: `create or replace function 
            test()
            returns void as $body$begin;end$body$
            language plpgsql;

            comment on function wrong_name() is 'test';
        `,
        error: /comment after function has wrong identify/
    });

    it(`using toIdentify()`, () => {
        const coach = new GrapeQLCoach(`create function test()
            returns void as $body$select 1$body$
            language sql
        `);
        const func = coach.parse(CreateFunction);
        const identify = func.toIdentify();

        assert.deepStrictEqual(identify.toJSON(), {
            schema: "public",
            name: "test",
            args: []
        });
    });

    it(`using toIdentify() without args`, () => {
        
        const func = new CreateFunction({
            schema: "public",
            name: "test"
        });
        const identify = func.toIdentify();

        assert.deepStrictEqual(identify.toJSON(), {
            schema: "public",
            name: "test",
            args: []
        });
    });

    
    testSyntax(CreateFunction, {
        str: `create /* multi */ or /* line */ replace /* comment */ function /* here */
            TEST_NAME(xid integer, names text[] /* or here */)
            -- returns table(
            returns table(
                id integer, 
                -- inline comment here
                sum numeric
                -- inline comment here
            ) as $body$begin;/* but not here */end$body$
            language plpgsql;
        `,
        result: {
            schema: "public",
            name: "test_name",
            args: [
                {
                    name: "xid",
                    type: "integer",
                    out: null,
                    in: null,
                    default: null
                },
                {
                    name: "names",
                    type: "text[]",
                    out: null,
                    in: null,
                    default: null
                }
            ],
            returns: {
                setof: null,
                type: null,
                table: [
                    {
                        name: "id",
                        type: "integer",
                        out: null,
                        in: null,
                        default: null
                    },
                    {
                        name: "sum",
                        type: "numeric",
                        out: null,
                        in: null,
                        default: null
                    }
                ]
            },
            body: {
                content: "begin;/* but not here */end"
            },

            language: "plpgsql",
            immutable: null,
            returnsNullOnNull: null,
            stable: null,
            strict: null,
            parallel: null,
            cost: null,
            comment: null
        }
    });

});
