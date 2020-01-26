
import ValuesRow from "../../lib/syntax/ValuesRow";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("ValuesRow", () => {

    GrapeQLCoach.test(ValuesRow, {
        str: "(default)",
        result: {
            values: [{
                default: true,
                value: null
            }]
        }
    });

    GrapeQLCoach.test(ValuesRow, {
        str: "(default, 2)",
        result: {
            values: [
                {
                    default: true,
                    value: null
                },
                {
                    default: null,
                    value: {elements: [
                        {number: "2"}
                    ]}
                }
            ]
        }
    });

});
