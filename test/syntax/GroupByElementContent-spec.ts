
import GroupByElementContent from "../../lib/syntax/GroupByElementContent";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("GroupByElementContent", () => {

    GrapeQLCoach.test(GroupByElementContent, {
        str: "id",
        result: {
            single: true,
            expressions: [{elements: [
                {star: false, link: [
                    {word: "id", content: null}
                ]}
            ]}]
        }
    });

    GrapeQLCoach.test(GroupByElementContent, {
        str: "(id, name)",
        result: {
            single: false,
            expressions: [
                {elements: [
                    {star: false, link: [
                        {word: "id", content: null}
                    ]}
                ]},
                {elements: [
                    {star: false, link: [
                        {word: "name", content: null}
                    ]}
                ]}
            ]
        }
    });
});
