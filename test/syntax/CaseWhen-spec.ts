
import {testSyntax} from "../testSyntax";
import {CaseWhen} from "../../lib/syntax/CaseWhen";

describe("CaseWhen", () => {

    testSyntax(CaseWhen, {
        str: "case when (true) then 1 else 0 end",
        shouldBe: {
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
        shouldBe: {
            case: [
                {
                    when: {elements: [{boolean: true}]},
                    then: {elements: [{number: "1"}]}
                }
            ]
        }
    });

    testSyntax(CaseWhen, {
        str: "case when 'some' then (1+1) when true or false then (1+1) else -2 end",
        shouldBe: {
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

    testSyntax(CaseWhen, {
        str: `case
            when
                some_field ISNULL
                or
                other_field isnull
            then 1
            else 0
        end`,
        shouldBe: {
            case: [
                {
                    when: {elements: [
                        {link: [
                            {word: "some_field"}
                        ]},
                        {operator: "isnull"},
                        {operator: "or"},
                        {link: [
                            {word: "other_field"}
                        ]},
                        {operator: "isnull"}
                    ]},
                    then: {elements: [
                        {number: "1"}
                    ]}
                }
            ],
            else: {elements: [
                {number: "0"}
            ]}
        }
    });

    testSyntax(CaseWhen, {
        str: "case colors.name when 'red' then 1 when 'green' then 2 else 0 end",
        shouldBe: {
            value: {elements: [
                {link: [
                    {word: "colors"},
                    {word: "name"}
                ]}
            ]},
            case: [
                {
                    when: {elements: [{content: "red"}]},
                    then: {elements: [{number: "1"}]}
                },
                {
                    when: {elements: [{content: "green"}]},
                    then: {elements: [{number: "2"}]}
                }
            ],
            else: {elements: [{number: "0"}]}
        }
    });

});
