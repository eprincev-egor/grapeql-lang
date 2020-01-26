
import File from "../../lib/syntax/File";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("File", () => {

    GrapeQLCoach.test(File, {
        str: "file )",
        error: /expected file path/
    });

    GrapeQLCoach.test(File, {
        str: ")",
        error: /expected word: file/
    });

    GrapeQLCoach.test(File, {
        str: "file Order",
        result: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "Order", content: null}
            ]
        }
    });

    GrapeQLCoach.test(File, {
        str: "./Order",
        result: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "Order", content: null}
            ]
        }
    });

    GrapeQLCoach.test(File, {
        str: "../Order",
        result: {
            relative: true,
            path: [
                {name: "..", content: null},
                {name: "Order", content: null}
            ]
        }
    });

    GrapeQLCoach.test(File, {
        str: "file Order.sql",
        result: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "Order.sql", content: null}
            ]
        }
    });

    GrapeQLCoach.test(File, {
        str: "file \" nice \"",
        result: {
            relative: true,
            path: [
                {name: ".", content: null},
                {content: " nice ", name: null}
            ]
        }
    });

    GrapeQLCoach.test(File, {
        str: "file some / file on",
        result: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "some", content: null},
                {name: "file", content: null}
            ]
        }
    });

    GrapeQLCoach.test(File, {
        str: "file /root.sql",
        result: {
            relative: false,
            path: [
                {name: "root.sql", content: null}
            ]
        }
    });

    GrapeQLCoach.test(File, {
        str: "/root.sql",
        result: {
            relative: false,
            path: [
                {name: "root.sql", content: null}
            ]
        }
    });

    GrapeQLCoach.test(File, {
        str: "file ./company",
        result: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "company", content: null}
            ]
        }
    });

    GrapeQLCoach.test(File, {
        str: "./Country)",
        result: {
            relative: true,
            path: [
                {name: ".", content: null},
                {name: "Country", content: null}
            ]
        }
    });

});
