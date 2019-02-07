"use strict";

const {Syntax} = require("lang-coach");

class DollarString extends Syntax {
    static structure() {
        return {
            content: "string"
        };
    }

    static parse(coach, data) {
        let tag = "";

        coach.expect("$");
        if ( coach.is(/\w/) ) {
            tag = coach.read(/\w+/);
        }
        coach.expect("$");

        let content = "";
        for (; coach.i < coach.n; coach.i++) {
            let symbol = coach.str[ coach.i ];

            if ( symbol == "$" ) {
                let close = coach.str.slice( coach.i, coach.i + tag.length + 2 );

                if ( close == "$" + tag + "$" ) {
                    coach.i += tag.length + 2;
                    break;
                }
            }

            content += symbol;
        }

        data.content = content;
    }

    static is(coach) {
        return coach.is(/\$\w*\$/);
    }

    toString() {
        let tag = "tag";
        let index = 1;
        while ( this.data.content.indexOf("$tag" + index + "$") != -1 ) {
            index++;
        }
        tag += index;

        return `$${tag}$${ this.data.content }$${tag}$`;
    }
}

module.exports = DollarString;
