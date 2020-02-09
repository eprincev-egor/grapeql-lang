
 
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";

export default class DoubleQuotes<Child extends DoubleQuotes = any> extends Syntax<DoubleQuotes & Child> {
    structure() {
        return {
            content: Types.String
        };
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        let content = "";
        let withUEscape = false;

        if ( coach.is("\"") ) {
            coach.i++;
        } else {
            coach.expectWord("u");
            coach.expect("&\"");
            withUEscape = true;
        }

        for (; coach.i < coach.n; coach.i++) {
            const symbol = coach.str[coach.i];

            if ( symbol === "\"" ) {
                if ( coach.str[coach.i + 1] === "\"" ) {
                    coach.i++;
                    content += "\"";
                    continue;
                }
                coach.i++;
                break;
            }

            content += symbol;
        }

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
            str[0] === "\"" ||

            (
                str[0] === "U" ||
                str[0] === "u"
            ) &&
            str[1] === "&" &&
            str[2] === "\""
        );
    }

    toString() {
        let content = this.row.content;
        // escape double quotes
        content = content.replace(/"/g, "\"\"");

        return "\"" + content + "\"";
    }
}

