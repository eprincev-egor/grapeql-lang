
import {testSyntax} from "../testSyntax";
import {ForeignKeyConstraint} from "../../lib/syntax/ForeignKeyConstraint";

describe("ForeignKeyConstraint", () => {
    
    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company (id)
        `,
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            referenceColumns: [
                {word: "id"}
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
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: {word: "client"},
            column: null,
            columns: [
                {word: "id_client"},
                {word: "x"}
            ],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            referenceColumns: [
                {word: "id"},
                {word: "y"}
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
        shouldBe: {
            name: null,
            column: {
                word: "id_company",
                content: null
            },
            columns: [{word: "id_company"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: null,
            column: {
                word: "id_company",
                content: null
            },
            columns: [{word: "id_company"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
        shouldBe: {
            name: null,
            column: {
                word: "id_company",
                content: null
            },
            columns: [{word: "id_company"}],
            referenceTable: {star: false, link: [
                {word: "company"}
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
