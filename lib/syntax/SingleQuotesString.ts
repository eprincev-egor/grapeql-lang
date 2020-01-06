"use strict";

import {Syntax} from "lang-coach";

export default class SingleQuotesString extends Syntax<SingleQuotesString> {
    structure() {
        return {
            content: "string"
        };
    }

    parse(coach, data) {
        
        let withEscape = false;
        let withUEscape = false;

        if ( coach.is(/e/i) ) {
            withEscape = true;
            coach.i++;
        }
        else if ( coach.is(/u&/i) ) {
            withUEscape = true;
            coach.i += 2;
        }

        let content = SingleQuotesString.readSingleQuotes( coach, withEscape );

        let escape = "\\";
        if ( coach.isWord("uescape") ) {
            if ( !withUEscape ) {
                coach.throwError("unexpected uescape, use u& before quotes");
            }

            coach.expectWord("uescape");

            coach.expect("'");
            escape = coach.str[ coach.i ];

            if ( /[+-\s\dabcdef"']/.test(escape) ) {
                coach.throwError("The escape character can be any single character other than a hexadecimal digit, the plus sign, a single quote, a double quote, or a whitespace character");
            }
            
            coach.i++;
            coach.expect("'");
        }

        if ( withUEscape ) {
            for (let i = 0, n = content.length; i < n; i++) {
                let symbol = content[i];
                let length;

                if ( symbol == escape ) {
                    let expr;
                    if ( content[i + 1] == "+" ) {
                        length = 8;
                        expr = content.slice(i + 2, i + length);
                    } else {
                        length = 5;
                        expr = content.slice(i + 1, i + length);
                    }

                    expr = coach.parseUnicode(expr);
                    n -= (length - 1);
                    content = content.slice(0, i) + expr + content.slice(i + length);
                }
            }
        }

        data.content = content;
    }

    static readSingleQuotes(coach, withEscape) {
        coach.expect("'");
        let content = "";

        for (; coach.i < coach.n; coach.i++) {
            let symbol = coach.str[ coach.i ];

            if ( symbol == "\\" && withEscape ) {
                content += SingleQuotesString.readEscape(coach);
                coach.i--;
                continue;
            }

            if ( symbol == "'" ) {
                if ( coach.str[ coach.i + 1 ] == "'" ) {
                    content += "'";
                    coach.i++;
                    continue;
                }

                coach.i++;
                break;
            }

            content += symbol;
        }

        if ( coach.is(/(\s*[\n\r]+\s*)+'/) ) {
            coach.skipSpace();
            content += SingleQuotesString.readSingleQuotes( coach );
        }

        return content;
    }

    static readEscape(coach) {
        coach.expect("\\");
        let symbol = coach.str[ coach.i ];

        if (
            symbol == "\\" ||
            symbol == "b" ||
            symbol == "f" ||
            symbol == "n" ||
            symbol == "r" ||
            symbol == "t"
        ) {
            coach.i++;
            return eval("'\\" + symbol + "'");
        }

        // \xh, \xhh (h = 0 — 9, A — F)
        else if ( symbol == "x" ) {
            coach.expect("x");

            let h1 = coach.str[ coach.i ];
            let h2 = coach.str[ coach.i + 1 ];

            if( !/[\dabcdef]/.test(h1) ) {
                coach.throwError("invalid unicode sequence");
            }

            if ( /[\dabcdef]/.test(h2) ) {
                coach.i += 2;
                symbol = "00" + h1 + h2;
            } else {
                coach.i++;
                symbol = "000" + h1;
            }

            if ( symbol == "0000" ) {
                coach.throwError("invalid unicode sequence");
            }

            symbol = coach.parseUnicode(symbol);
            return symbol;
        }

        // \uxxxx
        else if ( symbol == "u" ) {
            coach.expect("u");

            symbol = coach.str.slice(coach.i, coach.i + 4);
            symbol = coach.parseUnicode(symbol);

            coach.i += 4;

            return symbol;
        }

        // \Uxxxxxxxx
        else if ( symbol == "U" ) {
            coach.expect("U");

            symbol = coach.str.slice(coach.i, coach.i + 6);
            symbol = coach.parseUnicode(symbol);

            coach.i += 6;

            return symbol;
        }

        //  \ooo (o = 0 - 7)
        else if ( /[01234567]/.test(symbol) ) {
            
            symbol = coach.expect(/[01234567]{3,3}/);

            symbol = parseInt( symbol, 8 );
            symbol = symbol.toString(16);
            symbol = coach.parseUnicode(symbol);

            return symbol;
        }

        else {
            coach.i++;
            return symbol;
        }
    }

    is(coach, str) {
        return (
            str[0] == "'" ||

            (str[0] == "e" || str[0] == "E") &&
            str[1] == "'" ||

            (str[0] == "u" || str[0] == "U") &&
            str[1] == "&" &&
            str[2] == "'"
        );
    }

    toString() {
        let content = this.data.content;
        // escape single quotes
        content = content.replace(/'/g, "''");

        return "'" + content + "'";
    }
}
