
import FilePathElement from "../../lib/syntax/FilePathElement";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("FilePathElement", () => {

    GrapeQLCoach.test(FilePathElement, {
        str: "Order",
        result: {
            name: "Order",
            content: null
        }
    });

    GrapeQLCoach.test(FilePathElement, {
        str: "\"sOme\"",
        result: {
            name: null,
            content: "sOme"
        }
    });

    GrapeQLCoach.test(FilePathElement, {
        str: ")",
        error: /expected file path/
    });

});
