

import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";

export class SingleQuotesString extends Syntax<SingleQuotesString> {

    static readSingleQuotes(coach: GrapeQLCoach, withEscape = false) {
        coach.expect("'");
        let content = "";

        for (; coach.i < coach.n; coach.i++) {
            const symbol = coach.str[ coach.i ];

            if ( symbol === "\\" && withEscape ) {
                content += SingleQuotesString.readEscape(coach);
                coach.i--;
                continue;
            }

            if ( symbol === "'" ) {
                if ( coach.str[ coach.i + 1 ] === "'" ) {
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

    static readEscape(coach: GrapeQLCoach) {
        coach.expect("\\");
        let symbol = coach.str[ coach.i ];

        if (
            symbol === "\\" ||
            symbol === "b" ||
            symbol === "f" ||
            symbol === "n" ||
            symbol === "r" ||
            symbol === "t"
        ) {
            coach.i++;
            // tslint:disable-next-line: no-eval
            return eval("'\\" + symbol + "'");
        }

        // \xh, \xhh (h = 0 — 9, A — F)
        else if ( symbol === "x" ) {
            coach.expect("x");

            const h1 = coach.str[ coach.i ];
            const h2 = coach.str[ coach.i + 1 ];

            if ( !/[\dabcdef]/.test(h1) ) {
                coach.throwError("invalid unicode sequence");
            }

            if ( /[\dabcdef]/.test(h2) ) {
                coach.i += 2;
                symbol = "00" + h1 + h2;
            } else {
                coach.i++;
                symbol = "000" + h1;
            }

            if ( symbol === "0000" ) {
                coach.throwError("invalid unicode sequence");
            }

            symbol = coach.parseUnicode(symbol);
            return symbol;
        }

        // \uxxxx
        else if ( symbol === "u" ) {
            coach.expect("u");

            symbol = coach.str.slice(coach.i, coach.i + 4);
            symbol = coach.parseUnicode(symbol);

            coach.i += 4;

            return symbol;
        }

        // \Uxxxxxxxx
        else if ( symbol === "U" ) {
            coach.expect("U");

            symbol = coach.str.slice(coach.i, coach.i + 6);
            symbol = coach.parseUnicode(symbol);

            coach.i += 6;

            return symbol;
        }

        //  \ooo (o = 0 - 7)
        else if ( /[01234567]/.test(symbol) ) {
            
            symbol = coach.expect(/[01234567]{3,3}/);

            const symbolNumb = parseInt( symbol, 8 );
            symbol = symbolNumb.toString(16);
            symbol = coach.parseUnicode(symbol);

            return symbol;
        }

        else {
            coach.i++;
            return symbol;
        }
    }

    structure() {
        return {
            content: Types.String
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        
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
                const symbol = content[i];
                let length;

                if ( symbol === escape ) {
                    let expr;
                    if ( content[i + 1] === "+" ) {
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

    is(coach: GrapeQLCoach, str: string) {
        return (
            str[0] === "'" ||

            (str[0] === "e" || str[0] === "E") &&
            str[1] === "'" ||

            (str[0] === "u" || str[0] === "U") &&
            str[1] === "&" &&
            str[2] === "'"
        );
    }

    toString() {
        let content = this.row.content;
        // escape single quotes
        content = content.replace(/'/g, "''");

        return "'" + content + "'";
    }
}

