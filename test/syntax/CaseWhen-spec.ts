
import CaseWhen from "../../lib/syntax/CaseWhen";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


describe("CaseWhen", () => {

    GrapeQLCoach.test(CaseWhen, {
        str: "case when (true) then 1 else 0 end",
        result: {
            case: [
                {
                    when: {elements: [{boolean: true}]},
                    then: {elements: [{number: "1"}]}
                }
            ],
            else: {elements: [{number: "0"}]}
        }
    });

    GrapeQLCoach.test(CaseWhen, {
        str: "case when (true) then 1 end",
        result: {
            case: [
                {
                    when: {elements: [{boolean: true}]},
                    then: {elements: [{number: "1"}]}
                }
            ],
            else: null
        }
    });

    GrapeQLCoach.test(CaseWhen, {
        str: "case when 'some' then (1+1) when true or false then (1+1) else -2 end",
        result: {
            case: [
                {
                    when: {elements: [{content: "some"}]},
                    then: {elements: [
                        {number: "1"},
                        {operator: "+"},
                        {number: "1"}
                    ]}
                },
                {
                    when: {elements: [
                        {boolean: true},
                        {operator: "or"},
                        {boolean: false}
                    ]},
                    then: {elements: [
                        {number: "1"},
                        {operator: "+"},
                        {number: "1"}
                    ]}
                }
            ],
            else: {elements: [
                {operator: "-"},
                {number: "2"}
            ]}
        }
    });

});
