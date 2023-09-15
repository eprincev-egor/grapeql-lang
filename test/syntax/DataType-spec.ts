
import {testSyntax} from "../testSyntax";
import assert from "assert";
import {DataType} from "../../lib/syntax/DataType";

describe("DataType", () => {

    testSyntax(DataType, {
        str: "Timestamp",
        shouldBe: {type: "timestamp"}
    });

    testSyntax(DataType, {
        str: "numeric  ( 10 )",
        shouldBe: {type: "numeric(10)"}
    });

    testSyntax(DataType, {
        str: "numeric ( 10, 3 )",
        shouldBe: {type: "numeric(10,3)"}
    });

    testSyntax(DataType, {
        str: "bigint[ ]",
        shouldBe: {
            type: "bigint[]"
        }
    });

    testSyntax(DataType, {
        str: "bigint [ 1 ]",
        shouldBe: {
            type: "bigint[1]"
        }
    });

    testSyntax(DataType, {
        str: "numeric",
        shouldBe: {type: "numeric"}
    });

    testSyntax(DataType, {
        str: "\"char\"",
        shouldBe: {
            type: "\"char\""
        }
    });

    testSyntax(DataType, {
        str: "smallint",
        shouldBe: {
            type: "smallint"
        }
    });

    testSyntax(DataType, {
        str: "integer",
        shouldBe: {
            type: "integer"
        }
    });

    testSyntax(DataType, {
        str: "bigint",
        shouldBe: {
            type: "bigint"
        }
    });

    testSyntax(DataType, {
        str: "decimal",
        shouldBe: {
            type: "decimal"
        }
    });

    testSyntax(DataType, {
        str: "real",
        shouldBe: {
            type: "real"
        }
    });

    testSyntax(DataType, {
        str: "double precision",
        shouldBe: {
            type: "double precision"
        }
    });

    testSyntax(DataType, {
        str: "float",
        shouldBe: {
            type: "float"
        }
    });

    testSyntax(DataType, {
        str: "smallserial",
        shouldBe: {
            type: "smallserial"
        }
    });

    testSyntax(DataType, {
        str: "serial",
        shouldBe: {
            type: "serial"
        }
    });

    testSyntax(DataType, {
        str: "bigserial",
        shouldBe: {
            type: "bigserial"
        }
    });

    testSyntax(DataType, {
        str: "money",
        shouldBe: {
            type: "money"
        }
    });

    testSyntax(DataType, {
        str: "text",
        shouldBe: {
            type: "text"
        }
    });

    testSyntax(DataType, {
        str: "name",
        shouldBe: {
            type: "name"
        }
    });

    testSyntax(DataType, {
        str: "bytea",
        shouldBe: {
            type: "bytea"
        }
    });

    testSyntax(DataType, {
        str: "timestamp without time zone",
        shouldBe: {
            type: "timestamp without time zone"
        }
    });

    testSyntax(DataType, {
        str: "timestamp with time zone",
        shouldBe: {
            type: "timestamp with time zone"
        }
    });

    testSyntax(DataType, {
        str: "timestamp",
        shouldBe: {
            type: "timestamp"
        }
    });

    testSyntax(DataType, {
        str: "time without time zone",
        shouldBe: {
            type: "time without time zone"
        }
    });

    testSyntax(DataType, {
        str: "time with time zone",
        shouldBe: {
            type: "time with time zone"
        }
    });

    testSyntax(DataType, {
        str: "boolean",
        shouldBe: {
            type: "boolean"
        }
    });

    testSyntax(DataType, {
        str: "point",
        shouldBe: {
            type: "point"
        }
    });

    testSyntax(DataType, {
        str: "line",
        shouldBe: {
            type: "line"
        }
    });

    testSyntax(DataType, {
        str: "lseg",
        shouldBe: {
            type: "lseg"
        }
    });

    testSyntax(DataType, {
        str: "box",
        shouldBe: {
            type: "box"
        }
    });

    testSyntax(DataType, {
        str: "path",
        shouldBe: {
            type: "path"
        }
    });

    testSyntax(DataType, {
        str: "polygon",
        shouldBe: {
            type: "polygon"
        }
    });

    testSyntax(DataType, {
        str: "path",
        shouldBe: {
            type: "path"
        }
    });

    testSyntax(DataType, {
        str: "circle",
        shouldBe: {
            type: "circle"
        }
    });

    testSyntax(DataType, {
        str: "cidr",
        shouldBe: {
            type: "cidr"
        }
    });

    testSyntax(DataType, {
        str: "inet",
        shouldBe: {
            type: "inet"
        }
    });

    testSyntax(DataType, {
        str: "macaddr",
        shouldBe: {
            type: "macaddr"
        }
    });

    testSyntax(DataType, {
        str: "macaddr8",
        shouldBe: {
            type: "macaddr8"
        }
    });

    testSyntax(DataType, {
        str: "tsvector",
        shouldBe: {
            type: "tsvector"
        }
    });

    testSyntax(DataType, {
        str: "tsquery",
        shouldBe: {
            type: "tsquery"
        }
    });

    testSyntax(DataType, {
        str: "uuid",
        shouldBe: {
            type: "uuid"
        }
    });

    testSyntax(DataType, {
        str: "xml",
        shouldBe: {
            type: "xml"
        }
    });

    testSyntax(DataType, {
        str: "json",
        shouldBe: {
            type: "json"
        }
    });

    testSyntax(DataType, {
        str: "jsonb",
        shouldBe: {
            type: "jsonb"
        }
    });

    testSyntax(DataType, {
        str: "int",
        shouldBe: {
            type: "int"
        }
    });

    testSyntax(DataType, {
        str: "int4range",
        shouldBe: {
            type: "int4range"
        }
    });

    testSyntax(DataType, {
        str: "int8range",
        shouldBe: {
            type: "int8range"
        }
    });

    testSyntax(DataType, {
        str: "numrange",
        shouldBe: {
            type: "numrange"
        }
    });

    testSyntax(DataType, {
        str: "tsrange",
        shouldBe: {
            type: "tsrange"
        }
    });

    testSyntax(DataType, {
        str: "tstzrange",
        shouldBe: {
            type: "tstzrange"
        }
    });

    testSyntax(DataType, {
        str: "daterange",
        shouldBe: {
            type: "daterange"
        }
    });

    testSyntax(DataType, {
        str: "regclass",
        shouldBe: {
            type: "regclass"
        }
    });

    testSyntax(DataType, {
        str: "regproc",
        shouldBe: {
            type: "regproc"
        }
    });

    testSyntax(DataType, {
        str: "regprocedure",
        shouldBe: {
            type: "regprocedure"
        }
    });

    testSyntax(DataType, {
        str: "regoper",
        shouldBe: {
            type: "regoper"
        }
    });

    testSyntax(DataType, {
        str: "regoperator",
        shouldBe: {
            type: "regoperator"
        }
    });

    testSyntax(DataType, {
        str: "regclass",
        shouldBe: {
            type: "regclass"
        }
    });

    testSyntax(DataType, {
        str: "regtype",
        shouldBe: {
            type: "regtype"
        }
    });

    testSyntax(DataType, {
        str: "regrole",
        shouldBe: {
            type: "regrole"
        }
    });

    testSyntax(DataType, {
        str: "regnamespace",
        shouldBe: {
            type: "regnamespace"
        }
    });

    testSyntax(DataType, {
        str: "regconfig",
        shouldBe: {
            type: "regconfig"
        }
    });

    testSyntax(DataType, {
        str: "regdictionary",
        shouldBe: {
            type: "regdictionary"
        }
    });

    testSyntax(DataType, {
        str: "date",
        shouldBe: {
            type: "date"
        }
    });

    testSyntax(DataType, {
        str: "trigger",
        shouldBe: {
            type: "trigger"
        }
    });

    testSyntax(DataType, {
        str: "void",
        shouldBe: {
            type: "void"
        }
    });

    testSyntax(DataType, {
        str: "public.company",
        shouldBe: {
            type: "public.company"
        }
    });

    testSyntax(DataType, {
        str: "company",
        shouldBe: {
            type: "public.company"
        }
    });

    testSyntax(DataType, {
        str: "public.company[]",
        shouldBe: {
            type: "public.company[]"
        }
    });

    testSyntax(DataType, {
        str: "character varying[]",
        shouldBe: {
            type: "character varying[]"
        }
    });

    testSyntax(DataType, {
        str: "record",
        shouldBe: {type: "record"}
    });

    testSyntax(DataType, {
        str: "anyarray",
        shouldBe: {
            type: "anyarray"
        }
    });

    testSyntax(DataType, {
        str: "anyelement",
        shouldBe: {
            type: "anyelement"
        }
    });

    it("dataType.isNumber()", () => {
        const numberTypes = [
            "real",
            "decimal",
            "smallint",
            "integer",
            "biginteger",
            "smallserial",
            "serial",
            "bigserial",
            "numeric",
            "numeric(10,2)",
            "double precision"
        ];
        const otherTypes = [
            "text",
            "boolean",
            "point"
        ];

        numberTypes.forEach((typeName) => {
            const type = new DataType({
                type: typeName
            });

            assert.strictEqual(type.isNumber(), true, typeName + ": isNumber() should be true");
        });

        otherTypes.forEach((typeName) => {
            const type = new DataType({
                type: typeName
            });

            assert.strictEqual(type.isNumber(), false, typeName + ": isNumber() should be false");
        });
    });

    it("dataType.isInteger()", () => {
        const numberTypes = [
            "smallint",
            "integer",
            "biginteger",
            "smallserial",
            "serial",
            "bigserial"
        ];
        const otherTypes = [
            "real",
            "decimal",
            "text",
            "boolean",
            "point",
            "numeric",
            "numeric(10,2)",
            "double precision"
        ];

        numberTypes.forEach((typeName) => {
            const type = new DataType({
                type: typeName
            });

            assert.strictEqual(type.isInteger(), true, typeName + ": isInteger() should be true");
        });

        otherTypes.forEach((typeName) => {
            const type = new DataType({
                type: typeName
            });

            assert.strictEqual(type.isInteger(), false, typeName + ": isInteger() should be false");
        });
    });

    it("dataType.isSerial()", () => {
        const numberTypes = [
            "smallserial",
            "serial",
            "bigserial"
        ];
        const otherTypes = [
            "smallint",
            "integer",
            "biginteger",
            "real",
            "decimal",
            "text",
            "boolean",
            "point",
            "numeric",
            "numeric(10,2)",
            "double precision"
        ];

        numberTypes.forEach((typeName) => {
            const type = new DataType({
                type: typeName
            });

            assert.strictEqual(type.isSerial(), true, typeName + ": isSerial() should be true");
        });

        otherTypes.forEach((typeName) => {
            const type = new DataType({
                type: typeName
            });

            assert.strictEqual(type.isSerial(), false, typeName + ": isSerial() should be false");
        });
    });

    it("dataType.isText()", () => {
        const textTypes = [
            "text",
            "char(1)",
            "character(1)",
            "character varying(1)",
            "varchar(1)"
        ];
        const otherTypes = [
            "boolean",
            "point",
            "numeric"
        ];

        textTypes.forEach((typeName) => {
            const type = new DataType({
                type: typeName
            });

            assert.strictEqual(type.isText(), true, typeName + ": isText() should be true");
        });

        otherTypes.forEach((typeName) => {
            const type = new DataType({
                type: typeName
            });

            assert.strictEqual(type.isText(), false, typeName + ": isText() should be false");
        });
    });
});
