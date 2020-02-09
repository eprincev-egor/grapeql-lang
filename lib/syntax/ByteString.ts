

import {Syntax, Types} from "lang-coach";
import SingleQuotesString from "./SingleQuotesString";
import {GrapeQLCoach} from "../GrapeQLCoach";

export default class ByteString extends Syntax<ByteString> {
    structure() {
        return {
            content: Types.String
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.isWord("b") ) {
            coach.expectWord("b");

            const content = SingleQuotesString.readSingleQuotes(coach, false);

            if ( /[^01]/.test(content) ) {
                coach.throwError("byte string b'' must contain only 0 or 1");
            }

            data.content = content;
        }

        else {
            coach.expectWord("x");

            const content = SingleQuotesString.readSingleQuotes(coach, false);

            if ( /[^\dabcdef]/.test(content) ) {
                coach.throwError("byte string x'' must contain only digits or abcdef");
            }

            const hexSymbols = content.split("");
            const binarySymbols = hexSymbols.map((hex) => {
                let binary = parseInt(hex, 16).toString(2);
                
                // add zeros
                for (let i = binary.length, n = 4; i < n; i++) {
                    binary = "0" + binary;
                }

                return binary;
            });
            
            data.content = binarySymbols.join("");
        }
    }

    is(coach: GrapeQLCoach, str: string) {
        return (
            str[1] === "'" && (
                str[0] === "b" ||
                str[0] === "B" ||
                str[0] === "x" ||
                str[0] === "X" 
            )
        );
    }

    toString() {
        return "b'" + this.row.content + "'";
    }
}
