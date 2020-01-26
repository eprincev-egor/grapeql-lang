
import DollarString from "../../lib/syntax/DollarString";
import GrapeQLCoach from "../../lib/GrapeQLCoach";

describe("DollarString", () => {

    GrapeQLCoach.test(DollarString, {
        str: "$$hello'world$$",
        result: {
            content: "hello'world"
        }
    });

    GrapeQLCoach.test(DollarString, {
        str: "$Tag_1$hello'world$Tag_1$",
        result: {
            content: "hello'world"
        }
    });

    GrapeQLCoach.test(DollarString, {
        str: "$Tag_1$$tag_1$$Tag_1$",
        result: {
            content: "$tag_1$"
        }
    });

    GrapeQLCoach.test(DollarString, {
        str: "$Tag_1$$tag1$$Tag_1$",
        result: {
            content: "$tag1$"
        }
    });
    
    GrapeQLCoach.test(DollarString, {
        str: "$$\n\r$$",
        result: {
            content: "\n\r"
        }
    });
    
    GrapeQLCoach.test(DollarString, {
        str: "$q$[\\t\\r\\n\\v\\\\]$q$",
        result: {
            content: "[\\t\\r\\n\\v\\\\]"
        }
    });

});
