
import ForeignKeyConstraint from "../../lib/syntax/ForeignKeyConstraint";
import testSyntax from "../testSyntax";

describe("ForeignKeyConstraint", () => {
    
    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company (id)
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [{word: "id_client", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: [
                {word: "id", content: null}
            ],
            match: null,
            onDelete: null,
            onUpdate: null
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [{word: "id_client", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: null,
            match: null,
            onDelete: null,
            onUpdate: null
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company match simple
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [{word: "id_client", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: null,
            match: "simple",
            onDelete: null,
            onUpdate: null
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company match full
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [{word: "id_client", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: null,
            match: "full",
            onDelete: null,
            onUpdate: null
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company match partial
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [{word: "id_client", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: null,
            match: "partial",
            onDelete: null,
            onUpdate: null
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on delete no action
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [{word: "id_client", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: null,
            match: null,
            onDelete: "no action",
            onUpdate: null
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on update no action
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [{word: "id_client", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: null,
            match: null,
            onDelete: null,
            onUpdate: "no action"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on delete cascade
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [{word: "id_client", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: null,
            match: null,
            onDelete: "cascade",
            onUpdate: null
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on delete set null
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [{word: "id_client", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: null,
            match: null,
            onDelete: "set null",
            onUpdate: null
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on delete set default
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [{word: "id_client", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: null,
            match: null,
            onDelete: "set default",
            onUpdate: null
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on update set null
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [{word: "id_client", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: null,
            match: null,
            onDelete: null,
            onUpdate: "set null"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on update set default
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [{word: "id_client", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: null,
            match: null,
            onDelete: null,
            onUpdate: "set default"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on update cascade
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [{word: "id_client", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: null,
            match: null,
            onDelete: null,
            onUpdate: "cascade"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on update set default on delete set default
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [{word: "id_client", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: null,
            match: null,
            onDelete: "set default",
            onUpdate: "set default"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on delete set default on update set default 
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [{word: "id_client", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: null,
            match: null,
            onDelete: "set default",
            onUpdate: "set default"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client, x)
            references company (id, y) 
            match full
            on delete set default 
            on update set default 
        `,
        result: {
            name: {word: "client", content: null},
            column: null,
            columns: [
                {word: "id_client", content: null},
                {word: "x", content: null}
            ],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: [
                {word: "id", content: null},
                {word: "y", content: null}
            ],
            match: "full",
            onDelete: "set default",
            onUpdate: "set default"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `references company`,
        options: {
            column: {
                word: "id_company",
                content: null
            }
        },
        result: {
            name: null,
            column: {
                word: "id_company",
                content: null
            },
            columns: [{word: "id_company", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: null,
            match: null,
            onDelete: null,
            onUpdate: null
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `references company (id)`,
        options: {
            column: {
                word: "id_company",
                content: null
            }
        },
        result: {
            name: null,
            column: {
                word: "id_company",
                content: null
            },
            columns: [{word: "id_company", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: [{
                word: "id",
                content: null
            }],
            match: null,
            onDelete: null,
            onUpdate: null
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `references company (id)
            match full
            on delete set default 
            on update set default `,
        options: {
            column: {
                word: "id_company",
                content: null
            }
        },
        result: {
            name: null,
            column: {
                word: "id_company",
                content: null
            },
            columns: [{word: "id_company", content: null}],
            referenceTable: {star: false, link: [
                {word: "company", content: null}
            ]},
            referenceColumns: [{
                word: "id",
                content: null
            }],
            match: "full",
            onDelete: "set default",
            onUpdate: "set default"
        }
    });

});
