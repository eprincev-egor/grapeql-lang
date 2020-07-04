
import {testSyntax} from "../testSyntax";
import {CaseWhen} from "../../lib/syntax/CaseWhen";

describe("CaseWhen", () => {

    testSyntax(CaseWhen, {
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

    testSyntax(CaseWhen, {
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

    testSyntax(CaseWhen, {
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
