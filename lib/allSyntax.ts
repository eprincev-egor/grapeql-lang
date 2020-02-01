import {Syntax} from "lang-coach";

const allSyntax: {
    [key: string]: new (...args: any) => Syntax<any>
} = {};

export default allSyntax;
