"use strict";

const {Syntax} = require("lang-coach");
const SingleQuotesString = require("./SingleQuotesString");

class ByteString extends Syntax {
    static structure() {
        return {
            content: "string"
        };
    }

    static parse(coach, data) {
        if ( coach.isWord("b") ) {
            coach.expectWord("b");

            let content = SingleQuotesString.readSingleQuotes(coach, false);

            if ( /[^01]/.test(content) ) {
                coach.throwError("byte string b'' must contain only 0 or 1");
            }

            data.content = content;
        }

        else {
            coach.expectWord("x");

            let content = SingleQuotesString.readSingleQuotes(coach, false);

            if ( /[^\dabcdef]/.test(content) ) {
                coach.throwError("byte string x'' must contain only digits or abcdef");
            }

            let hexSymbols = content.split("");
            let binarySymbols = hexSymbols.map(hex => {
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

    static is(coach, str) {
        return (
            str[1] == "'" && (
                str[0] == "b" ||
                str[0] == "B" ||
                str[0] == "x" ||
                str[0] == "X" 
            )
        );
    }

    toString() {
        return "b'" + this.data.content + "'";
    }
}

module.exports = ByteString;
