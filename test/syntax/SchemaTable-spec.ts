
import SchemaTable from "../../lib/syntax/SchemaTable";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("SchemaTable", () => {

    GrapeQLCoach.test(SchemaTable, {
        str: "x",
        result: {
            schema: "public",
            table: "x"
        }
    });

    GrapeQLCoach.test(SchemaTable, {
        str: "x.y",
        result: {
            schema: "x",
            table: "y"
        }
    });

    GrapeQLCoach.test(SchemaTable, {
        str: "x.y.z",
        error: /invalid name x\.y\.z/
    });

});
