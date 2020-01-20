

import DataType from "../../lib/syntax/DataType";
import testSyntax from "../testSyntax";
import assert from "assert";

describe("DataType", () => {

    testSyntax(DataType, {
        str: "Timestamp",
        result: {type: "timestamp"}
    });

    testSyntax(DataType, {
        str: "numeric  ( 10 )",
        result: {type: "numeric(10)"}
    });

    testSyntax(DataType, {
        str: "numeric ( 10, 3 )",
        result: {type: "numeric(10,3)"}
    });

    testSyntax(DataType, {
        str: "bigint[ ]",
        result: {
            type: "bigint[]"
        }
    });

    testSyntax(DataType, {
        str: "bigint [ 1 ]",
        result: {
            type: "bigint[1]"
        }
    });

    testSyntax(DataType, {
        str: "numeric",
        result: {type: "numeric"}
    });

    testSyntax(DataType, {
        str: "\"char\"",
        result: {
            type: "\"char\""
        }
    });

    testSyntax(DataType, {
        str: "smallint",
        result: {
            type: "smallint"
        }
    });

    testSyntax(DataType, {
        str: "integer",
        result: {
            type: "integer"
        }
    });

    testSyntax(DataType, {
        str: "bigint",
        result: {
            type: "bigint"
        }
    });

    testSyntax(DataType, {
        str: "decimal",
        result: {
            type: "decimal"
        }
    });

    testSyntax(DataType, {
        str: "real",
        result: {
            type: "real"
        }
    });

    testSyntax(DataType, {
        str: "double precision",
        result: {
            type: "double precision"
        }
    });

    testSyntax(DataType, {
        str: "smallserial",
        result: {
            type: "smallserial"
        }
    });

    testSyntax(DataType, {
        str: "serial",
        result: {
            type: "serial"
        }
    });

    testSyntax(DataType, {
        str: "bigserial",
        result: {
            type: "bigserial"
        }
    });

    testSyntax(DataType, {
        str: "money",
        result: {
            type: "money"
        }
    });

    testSyntax(DataType, {
        str: "text",
        result: {
            type: "text"
        }
    });

    testSyntax(DataType, {
        str: "name",
        result: {
            type: "name"
        }
    });

    testSyntax(DataType, {
        str: "bytea",
        result: {
            type: "bytea"
        }
    });

    testSyntax(DataType, {
        str: "timestamp without time zone",
        result: {
            type: "timestamp without time zone"
        }
    });

    testSyntax(DataType, {
        str: "timestamp with time zone",
        result: {
            type: "timestamp with time zone"
        }
    });

    testSyntax(DataType, {
        str: "timestamp",
        result: {
            type: "timestamp"
        }
    });

    testSyntax(DataType, {
        str: "time without time zone",
        result: {
            type: "time without time zone"
        }
    });

    testSyntax(DataType, {
        str: "time with time zone",
        result: {
            type: "time with time zone"
        }
    });

    testSyntax(DataType, {
        str: "boolean",
        result: {
            type: "boolean"
        }
    });

    testSyntax(DataType, {
        str: "point",
        result: {
            type: "point"
        }
    });

    testSyntax(DataType, {
        str: "line",
        result: {
            type: "line"
        }
    });

    testSyntax(DataType, {
        str: "lseg",
        result: {
            type: "lseg"
        }
    });

    testSyntax(DataType, {
        str: "box",
        result: {
            type: "box"
        }
    });

    testSyntax(DataType, {
        str: "path",
        result: {
            type: "path"
        }
    });

    testSyntax(DataType, {
        str: "polygon",
        result: {
            type: "polygon"
        }
    });

    testSyntax(DataType, {
        str: "path",
        result: {
            type: "path"
        }
    });

    testSyntax(DataType, {
        str: "circle",
        result: {
            type: "circle"
        }
    });

    testSyntax(DataType, {
        str: "cidr",
        result: {
            type: "cidr"
        }
    });

    testSyntax(DataType, {
        str: "inet",
        result: {
            type: "inet"
        }
    });

    testSyntax(DataType, {
        str: "macaddr",
        result: {
            type: "macaddr"
        }
    });

    testSyntax(DataType, {
        str: "macaddr8",
        result: {
            type: "macaddr8"
        }
    });

    testSyntax(DataType, {
        str: "tsvector",
        result: {
            type: "tsvector"
        }
    });

    testSyntax(DataType, {
        str: "tsquery",
        result: {
            type: "tsquery"
        }
    });

    testSyntax(DataType, {
        str: "uuid",
        result: {
            type: "uuid"
        }
    });

    testSyntax(DataType, {
        str: "xml",
        result: {
            type: "xml"
        }
    });

    testSyntax(DataType, {
        str: "json",
        result: {
            type: "json"
        }
    });

    testSyntax(DataType, {
        str: "jsonb",
        result: {
            type: "jsonb"
        }
    });

    testSyntax(DataType, {
        str: "int",
        result: {
            type: "int"
        }
    });

    testSyntax(DataType, {
        str: "int4range",
        result: {
            type: "int4range"
        }
    });

    testSyntax(DataType, {
        str: "int8range",
        result: {
            type: "int8range"
        }
    });

    testSyntax(DataType, {
        str: "numrange",
        result: {
            type: "numrange"
        }
    });

    testSyntax(DataType, {
        str: "tsrange",
        result: {
            type: "tsrange"
        }
    });

    testSyntax(DataType, {
        str: "tstzrange",
        result: {
            type: "tstzrange"
        }
    });

    testSyntax(DataType, {
        str: "daterange",
        result: {
            type: "daterange"
        }
    });

    testSyntax(DataType, {
        str: "regclass",
        result: {
            type: "regclass"
        }
    });

    testSyntax(DataType, {
        str: "regproc",
        result: {
            type: "regproc"
        }
    });

    testSyntax(DataType, {
        str: "regprocedure",
        result: {
            type: "regprocedure"
        }
    });

    testSyntax(DataType, {
        str: "regoper",
        result: {
            type: "regoper"
        }
    });

    testSyntax(DataType, {
        str: "regoperator",
        result: {
            type: "regoperator"
        }
    });

    testSyntax(DataType, {
        str: "regclass",
        result: {
            type: "regclass"
        }
    });

    testSyntax(DataType, {
        str: "regtype",
        result: {
            type: "regtype"
        }
    });

    testSyntax(DataType, {
        str: "regrole",
        result: {
            type: "regrole"
        }
    });

    testSyntax(DataType, {
        str: "regnamespace",
        result: {
            type: "regnamespace"
        }
    });

    testSyntax(DataType, {
        str: "regconfig",
        result: {
            type: "regconfig"
        }
    });

    testSyntax(DataType, {
        str: "regdictionary",
        result: {
            type: "regdictionary"
        }
    });

    testSyntax(DataType, {
        str: "date",
        result: {
            type: "date"
        }
    });

    testSyntax(DataType, {
        str: "trigger",
        result: {
            type: "trigger"
        }
    });

    testSyntax(DataType, {
        str: "void",
        result: {
            type: "void"
        }
    });

    testSyntax(DataType, {
        str: "public.company",
        result: {
            type: "public.company"
        }
    });

    testSyntax(DataType, {
        str: "company",
        result: {
            type: "public.company"
        }
    });

    testSyntax(DataType, {
        str: "public.company[]",
        result: {
            type: "public.company[]"
        }
    });

    testSyntax(DataType, {
        str: "character varying[]",
        result: {
            type: "character varying[]"
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


    it("dataType.equalSameType()", () => {
        const text1 = new DataType({
            type: "text"
        });
        const text2 = new DataType({
            type: "char(1)"
        });
        const number1 = new DataType({
            type: "numeric"
        });
        const number2 = new DataType({
            type: "real"
        });
        const other1 = new DataType({
            type: "json"
        });
        const other2 = new DataType({
            type: "json"
        });


        assert.strictEqual(text1.equalSameType(text2), true, "text1 and text2");
        assert.strictEqual(number1.equalSameType(number2), true, "number1 and number2");
        assert.strictEqual(other1.equalSameType(other2), true, "other1 and other2");

        assert.strictEqual(text1.equalSameType(other2), false, "text1 and other2");
        assert.strictEqual(number1.equalSameType(other2), false, "number1 and other2");
        assert.strictEqual(number1.equalSameType(text1), false, "number1 and text1");
    });
});
