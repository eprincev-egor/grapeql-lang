
import {testSyntax} from "../testSyntax";
import {ForeignKeyConstraint} from "../../lib/syntax/ForeignKeyConstraint";

describe("ForeignKeyConstraint", () => {
    
    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company (id)
        `,
        shouldBe: {
            name: {word: "client"},
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            referenceColumns: [
                {word: "id"}
            ]
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company
        `,
        shouldBe: {
            name: {word: "client"},
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]}
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company match simple
        `,
        shouldBe: {
            name: {word: "client"},
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            match: "simple"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company match full
        `,
        shouldBe: {
            name: {word: "client"},
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            match: "full"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company match partial
        `,
        shouldBe: {
            name: {word: "client"},
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            match: "partial"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on delete no action
        `,
        shouldBe: {
            name: {word: "client"},
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            onDelete: "no action"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on update no action
        `,
        shouldBe: {
            name: {word: "client"},
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            onUpdate: "no action"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on delete cascade
        `,
        shouldBe: {
            name: {word: "client"},
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            onDelete: "cascade"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on delete set null
        `,
        shouldBe: {
            name: {word: "client"},
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            onDelete: "set null"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on delete set default
        `,
        shouldBe: {
            name: {word: "client"},
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            onDelete: "set default"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on update set null
        `,
        shouldBe: {
            name: {word: "client"},
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            onUpdate: "set null"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on update set default
        `,
        shouldBe: {
            name: {word: "client"},
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            onUpdate: "set default"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on update cascade
        `,
        shouldBe: {
            name: {word: "client"},
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            onUpdate: "cascade"
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `constraint client foreign key (id_client)
            references company on update set default on delete set default
        `,
        shouldBe: {
            name: {word: "client"},
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
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
            columns: [{word: "id_client"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
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
            name: {word: "client"}
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
                word: "id_company"
            }
        },
        shouldBe: {
            column: {
                word: "id_company"
            },
            columns: [{word: "id_company"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]}
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `references company (id)`,
        options: {
            column: {
                word: "id_company"
            }
        },
        shouldBe: {
            column: {
                word: "id_company"
            },
            columns: [{word: "id_company"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            referenceColumns: [{
                word: "id"
            }]
        }
    });

    testSyntax(ForeignKeyConstraint, {
        str: `references company (id)
            match full
            on delete set default 
            on update set default `,
        options: {
            column: {
                word: "id_company"
            }
        },
        shouldBe: {
            column: {
                word: "id_company"
            },
            columns: [{word: "id_company"}],
            referenceTable: {star: false, link: [
                {word: "company"}
            ]},
            referenceColumns: [{
                word: "id"
            }],
            match: "full",
            onDelete: "set default",
            onUpdate: "set default"
        }
    });

});
