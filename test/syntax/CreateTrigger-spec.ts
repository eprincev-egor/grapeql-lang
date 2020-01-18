
import CreateTrigger from "../../lib/syntax/CreateTrigger";
import testSyntax from "../testSyntax";

describe("CreateTrigger", () => {

    testSyntax(CreateTrigger, {
        str: `create trigger test 
            before insert
            on public.company
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },
            
            before: true,
            insert: true,

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            after: null,
            delete: null,
            update: null,
            updateOf: null,
            
            constraint: null,
            deferrable: null,
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });
    

    testSyntax(CreateTrigger, {
        str: `create trigger test 
            before insert
            on public.company
            for each STATEMENT
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },
            
            before: true,
            insert: true,
            
            statement: true,

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            after: null,
            delete: null,
            update: null,
            updateOf: null,
            
            constraint: null,
            deferrable: null,
            initially: null,
            when: null,
            comment: null
        }
    });

    testSyntax(CreateTrigger, {
        str: `create trigger test 
            after insert
            on public.company
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },
            
            after: true,
            insert: true,

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            before: null,
            delete: null,
            update: null,
            updateOf: null,
            
            constraint: null,
            deferrable: null,
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });

    testSyntax(CreateTrigger, {
        str: `create trigger test 
            before delete
            on public.company
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            before: true,
            delete: true,

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            after: null,
            insert: null,
            update: null,
            updateOf: null,
            
            constraint: null,
            deferrable: null,
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });

    testSyntax(CreateTrigger, {
        str: `create trigger test 
            after delete
            on public.company
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            after: true,
            delete: true,

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            before: null,
            insert: null,
            update: null,
            updateOf: null,
            
            constraint: null,
            deferrable: null,
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });

    testSyntax(CreateTrigger, {
        str: `create trigger test 
            before update
            on public.company
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },
            
            before: true,
            update: true,

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            after: null,
            insert: null,
            delete: null,
            updateOf: null,
            
            constraint: null,
            deferrable: null,
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });

    testSyntax(CreateTrigger, {
        str: `create trigger test 
            before insert or delete
            on public.company
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            before: true,
            insert: true,
            delete: true,

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            after: null,
            update: null,
            updateOf: null,
            
            constraint: null,
            deferrable: null,
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });

    testSyntax(CreateTrigger, {
        str: `create trigger test 
            after insert or delete
            on public.company
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            after: true,
            insert: true,
            delete: true,

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            before: null,
            update: null,
            updateOf: null,
            
            constraint: null,
            deferrable: null,
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });

    testSyntax(CreateTrigger, {
        str: `create trigger test 
            after delete or insert
            on public.company
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            after: true,
            insert: true,
            delete: true,

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            before: null,
            update: null,
            updateOf: null,
            
            constraint: null,
            deferrable: null,
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });

    testSyntax(CreateTrigger, {
        str: `create trigger test 
            before delete or insert
            on public.company
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            before: true,
            insert: true,
            delete: true,

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            after: null,
            update: null,
            updateOf: null,
            
            constraint: null,
            deferrable: null,
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });
    

    testSyntax(CreateTrigger, {
        str: `create trigger test 
            before delete or insert or update
            on public.company
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            before: true,
            insert: true,
            delete: true,
            update: true,

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            after: null,
            updateOf: null,
            
            constraint: null,
            deferrable: null,
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });
    

    testSyntax(CreateTrigger, {
        str: `create trigger test 
            after delete or insert or update
            on public.company
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            after: true,
            insert: true,
            delete: true,
            update: true,

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            before: null,
            updateOf: null,
            
            constraint: null,
            deferrable: null,
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });

    testSyntax(CreateTrigger, {
        str: `create trigger test 
            after update of name, deleted
            on public.company
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            after: true,
            update: true,
            updateOf: ["deleted", "name"],

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            before: null,
            insert: null,
            delete: null,
            
            constraint: null,
            deferrable: null,
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });
    

    testSyntax(CreateTrigger, {
        str: `create trigger test 
            after update of name, deleted or insert
            on public.company
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            after: true,
            insert: true,
            update: true,
            updateOf: ["deleted", "name"],

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            before: null,
            delete: null,
            
            constraint: null,
            deferrable: null,
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });
    

    testSyntax(CreateTrigger, {
        str: `create trigger test 
            after insert
            on public.company
            for each row
            when (pg_trigger_depth() = 0)
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            after: true,
            insert: true,
            
            when: "pg_trigger_depth() = 0",

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            before: null,
            delete: null,
            update: null,
            updateOf: null,
            
            constraint: null,
            deferrable: null,
            statement: null,
            initially: null,
            comment: null
        }
    });
    

    testSyntax(CreateTrigger, {
        str: `create constraint trigger test 
            after insert
            on public.company
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            after: true,
            insert: true,

            constraint: true,
            
            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            before: null,
            delete: null,
            update: null,
            updateOf: null,
            
            deferrable: null,
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });
    

    testSyntax(CreateTrigger, {
        str: `create constraint trigger test 
            after insert
            on public.company
            NOT DEFERRABLE
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            after: true,
            insert: true,

            constraint: true,
            deferrable: false,
            
            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            before: null,
            delete: null,
            update: null,
            updateOf: null,
            
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });
    

    testSyntax(CreateTrigger, {
        str: `create constraint trigger test 
            after insert
            on public.company
            DEFERRABLE
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            after: true,
            insert: true,

            constraint: true,
            deferrable: true,
            
            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            before: null,
            delete: null,
            update: null,
            updateOf: null,
            
            statement: null,
            initially: null,
            when: null,
            comment: null
        }
    });
    

    testSyntax(CreateTrigger, {
        str: `create constraint trigger test 
            after insert
            on public.company
            DEFERRABLE initially IMMEDIATE
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            after: true,
            insert: true,

            constraint: true,
            deferrable: true,
            initially: "immediate",
            
            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            before: null,
            delete: null,
            update: null,
            updateOf: null,
            
            statement: null,
            when: null,
            comment: null
        }
    });
    

    testSyntax(CreateTrigger, {
        str: `create constraint trigger test 
            after insert
            on public.company
            DEFERRABLE initially DEFERRED
            for each row
            execute procedure public.test()
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },

            after: true,
            insert: true,

            constraint: true,
            deferrable: true,
            initially: "deferred",
            
            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            before: null,
            delete: null,
            update: null,
            updateOf: null,
            
            statement: null,
            when: null,
            comment: null
        }
    });
   
    testSyntax(CreateTrigger, {
        str: `create trigger test 
            before insert
            on public.company
            for each row
            execute procedure public.test();

            comment on trigger Test on company is 'test';
        `,
        result: {
            name: "test",
            table: {
                schema: "public",
                name: "company"
            },
            
            before: true,
            insert: true,

            procedure: {
                args: [],
                schema: "public",
                name: "test"
            },
            
            after: null,
            delete: null,
            update: null,
            updateOf: null,
            
            constraint: null,
            deferrable: null,
            statement: null,
            initially: null,
            when: null,
            
            comment: {
                comment: {
                    content: "test"
                },
                trigger: {
                    name: "test",
                    schema: "public",
                    table: "company"
                }
            }
        }
    });

    testSyntax(CreateTrigger, {
        str: `
        create trigger test 
            before insert
            on public.company
            for each row
            execute procedure public.test();

            comment on trigger wrong_name on company is 'test';
        `,
        error: /comment after trigger has wrong identify/
    });
    
});
