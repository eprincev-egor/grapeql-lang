import {testSyntax} from "../testSyntax";
import {Overlay} from "../../lib/syntax/Overlay";

describe("Overlay", () => {

    testSyntax(Overlay, {
        str: "overlay('Txxxxas' placing 'hom' from 2 for 4)",
        shouldBe: {
            str: {elements: [{
                content: "Txxxxas"
            }]},
            placing: {elements: [{
                content: "hom"
            }]},
            from: {elements: [{
                number: "2"
            }]},
            for: {elements: [{
                number: "4"
            }]}
        }
    });

    testSyntax(Overlay, {
        str: "overlay('Txxxxas' placing 'hom' from 2)",
        shouldBe: {
            str: {elements: [{
                content: "Txxxxas"
            }]},
            placing: {elements: [{
                content: "hom"
            }]},
            from: {elements: [{
                number: "2"
            }]}
        }
    });
});
