
import Between from "../../lib/syntax/Between";
import GrapeQLCoach from "../../lib/GrapeQLCoach";

describe("Between", () => {

    GrapeQLCoach.test(Between, {
        str: "Between 1 and 2",
        result: {
            symmetric: null,
            between: {elements: [
                {number: "1"}
            ]},
            and: {elements: [
                {number: "2"}
            ]}
        }
    });

    GrapeQLCoach.test(Between, {
        str: "between symmetric 1 + 1 and 2 + 2",
        result: {
            symmetric: true,
            between: {elements: [
                {number: "1"},
                {operator: "+"},
                {number: "1"}
            ]},
            and: {elements: [
                {number: "2"},
                {operator: "+"},
                {number: "2"}
            ]}
        }
    });

});
