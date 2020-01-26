
import SchemaName from "../../lib/syntax/SchemaName";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("SchemaName", () => {

    GrapeQLCoach.test(SchemaName, {
        str: "x",
        result: {
            schema: "public",
            name: "x"
        }
    });

    GrapeQLCoach.test(SchemaName, {
        str: "x.y",
        result: {
            schema: "x",
            name: "y"
        }
    });

    GrapeQLCoach.test(SchemaName, {
        str: "x.y.z",
        error: /invalid name x\.y\.z/
    });

});
