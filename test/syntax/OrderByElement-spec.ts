
import OrderByElement from "../../lib/syntax/OrderByElement";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("OrderByElement", () => {

    GrapeQLCoach.test(OrderByElement, {
        str: "id",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: "asc",
            using: null,
            nulls: null
        }
    });

    GrapeQLCoach.test(OrderByElement, {
        str: "id asc",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: "asc",
            using: null,
            nulls: null
        }
    });

    GrapeQLCoach.test(OrderByElement, {
        str: "id desc",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: "desc",
            using: null,
            nulls: null
        }
    });

    GrapeQLCoach.test(OrderByElement, {
        str: "id using >",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: null,
            using: {operator: ">"},
            nulls: null
        }
    });

    GrapeQLCoach.test(OrderByElement, {
        str: "id using <",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: null,
            using: {operator: "<"},
            nulls: null
        }
    });

    GrapeQLCoach.test(OrderByElement, {
        str: "id nulls first",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: "asc",
            using: null,
            nulls: "first"
        }
    });

    GrapeQLCoach.test(OrderByElement, {
        str: "id nulls last",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: "asc",
            using: null,
            nulls: "last"
        }
    });

    GrapeQLCoach.test(OrderByElement, {
        str: "id desc nulls first",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: "desc",
            using: null,
            nulls: "first"
        }
    });

    GrapeQLCoach.test(OrderByElement, {
        str: "id desc nulls last",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: "desc",
            using: null,
            nulls: "last"
        }
    });

    GrapeQLCoach.test(OrderByElement, {
        str: "id using > nulls last",
        result: {
            expression: {elements: [
                {
                    star: false,
                    link: [
                        {word: "id", content: null}
                    ]
                }
            ]},
            vector: null,
            using: {operator: ">"},
            nulls: "last"
        }
    });

});
