
import Substring from "../../lib/syntax/Substring";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("Substring", () => {

    GrapeQLCoach.test(Substring, {
        str: "substring('test' from 1)",
        result: {
            str: {elements: [{
                content: "test"
            }]},
            from: {elements: [{
                number: "1"
            }]},
            for: null
        }
    });

    GrapeQLCoach.test(Substring, {
        str: "substring('test' for 2)",
        result: {
            str: {elements: [{
                content: "test"
            }]},
            for: {elements: [{
                number: "2"
            }]},
            from: null
        }
    });

    GrapeQLCoach.test(Substring, {
        str: "substring('123456' from 2 for 3)",
        result: {
            str: {elements: [{
                content: "123456"
            }]},
            from: {elements: [{
                number: "2"
            }]},
            for: {elements: [{
                number: "3"
            }]}
        }
    });

});
