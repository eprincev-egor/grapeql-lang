
import {testSyntax} from "../testSyntax";
import {VariableDefinition} from "../../lib/syntax/VariableDefinition";

describe("VariableDefinition", () => {

    testSyntax(VariableDefinition, {
        str: "name text",
        shouldBe: {
            name: {word: "name"},
            type: {type: "text"},
            nulls: true
        }
    });

    testSyntax(VariableDefinition, {
        str: "name text collate \"en_US\"",
        shouldBe: {
            name: {word: "name"},
            type: {type: "text"},
            collate: { content: "en_US"},
            nulls: true
        }
    });

    testSyntax(VariableDefinition, {
        str: "name text collate \"en_US\" = 'sweet'",
        shouldBe: {
            name: {word: "name"},
            type: {type: "text"},
            collate: { content: "en_US"},
            nulls: true,
            default: {elements: [
                {content: "sweet"}
            ]}
        }
    });

    testSyntax(VariableDefinition, {
        str: "total_price numeric(14, 2) not null default 0",
        shouldBe: {
            name: {word: "total_price"},
            type: {type: "numeric(14,2)"},
            nulls: false,
            default: {elements: [
                {number: "0"}
            ]}
        }
    });

    testSyntax(VariableDefinition, {
        str: "total_price numeric(14, 2) not null = 0",
        shouldBe: {
            name: {word: "total_price"},
            type: {type: "numeric(14,2)"},
            nulls: false,
            default: {elements: [
                {number: "0"}
            ]}
        }
    });

    testSyntax(VariableDefinition, {
        str: "order_date timestamp without time zone not null",
        shouldBe: {
            name: {word: "order_date"},
            type: {type: "timestamp without time zone"},
            nulls: false
        }
    });


    testSyntax(VariableDefinition, {
        str: "order_date timestamp without time zone",
        shouldBe: {
            name: {word: "order_date"},
            type: {type: "timestamp without time zone"},
            nulls: true
        }
    });

    testSyntax(VariableDefinition, {
        str: "total_price numeric = 0",
        shouldBe: {
            name: {word: "total_price"},
            type: {type: "numeric"},
            nulls: true,
            default: {elements: [
                {number: "0"}
            ]}
        }
    });

    testSyntax(VariableDefinition, {
        str: "total_price numeric := 0",
        shouldBe: {
            name: {word: "total_price"},
            type: {type: "numeric"},
            nulls: true,
            default: {elements: [
                {number: "0"}
            ]}
        }
    });

});
