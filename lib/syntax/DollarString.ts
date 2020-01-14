"use strict";

import {Syntax, Types} from "lang-coach";

export default class DollarString extends Syntax<DollarString> {
    structure() {
        return {
            content: Types.String
        };
    }

    parse(coach, data) {
        let tag = "";

        coach.expect("$");
        if ( coach.is(/\w/) ) {
            tag = coach.read(/\w+/);
        }
        coach.expect("$");

        let content = "";
        for (; coach.i < coach.n; coach.i++) {
            const symbol = coach.str[ coach.i ];

            if ( symbol === "$" ) {
                const close = coach.str.slice( coach.i, coach.i + tag.length + 2 );

                if ( close === "$" + tag + "$" ) {
                    coach.i += tag.length + 2;
                    break;
                }
            }

            content += symbol;
        }

        data.content = content;
    }

    is(coach) {
        return coach.is(/\$\w*\$/);
    }

    toString() {
        let tag = "tag";
        let index = 1;
        while ( this.data.content.indexOf("$tag" + index + "$") !== -1 ) {
            index++;
        }
        tag += index;

        return `$${tag}$${ this.data.content }$${tag}$`;
    }
}


