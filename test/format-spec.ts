
import {GrapeQLCoach, Select} from "../lib/GrapeQLCoach";
import assert from "assert";

describe("format sql", () => {
    
    it("format select", () => {
        const coach = new GrapeQLCoach(`
            select 1,2,3 from x left join a on a.id = 1 where x.id > 3 or x.name is not null
        `.trim());
        const select = coach.parse(Select);
        const actualSQL = select.toString();
        const expectedSQL = [
            "select",
            "    1,",
            "    2,",
            "    3",
            "from x",
            "",
            "left join a on",
            "    a.id = 1",
            "",
            "where",
            "    x.id > 3",
            "    or",
            "    x.name is not null"
        ].join("\n");

        assert.strictEqual(actualSQL, expectedSQL);
    });

});
