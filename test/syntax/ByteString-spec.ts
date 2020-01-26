

import ByteString from "../../lib/syntax/ByteString";
import GrapeQLCoach from "../../lib/GrapeQLCoach";

describe("ByteString", () => {

    GrapeQLCoach.test(ByteString, {
        str: "b'0011'",
        result: {
            content: "0011"
        }
    });

    GrapeQLCoach.test(ByteString, {
        str: "B'1'",
        result: {
            content: "1"
        }
    });

    GrapeQLCoach.test(ByteString, {
        str: "b'00112'",
        error: /byte string b'' must contain only 0 or 1/
    });

    GrapeQLCoach.test(ByteString, {
        str: "x'33'",
        result: {
            content: "00110011"
        }
    });

    GrapeQLCoach.test(ByteString, {
        str: "X'33'",
        result: {
            content: "00110011"
        }
    });

    GrapeQLCoach.test(ByteString, {
        str: "x'0L'",
        error: /byte string x'' must contain only digits or abcdef/
    });

});
