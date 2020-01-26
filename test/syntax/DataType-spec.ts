
import DataType from "../../lib/syntax/DataType";
import GrapeQLCoach from "../../lib/GrapeQLCoach";
import assert from "assert";

describe("DataType", () => {

    GrapeQLCoach.test(DataType, {
        str: "Timestamp",
        result: {type: "timestamp"}
    });

    GrapeQLCoach.test(DataType, {
        str: "numeric  ( 10 )",
        result: {type: "numeric(10)"}
    });

    GrapeQLCoach.test(DataType, {
        str: "numeric ( 10, 3 )",
        result: {type: "numeric(10,3)"}
    });

    GrapeQLCoach.test(DataType, {
        str: "bigint[ ]",
        result: {
            type: "bigint[]"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "bigint [ 1 ]",
        result: {
            type: "bigint[1]"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "numeric",
        result: {type: "numeric"}
    });

    GrapeQLCoach.test(DataType, {
        str: "\"char\"",
        result: {
            type: "\"char\""
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "smallint",
        result: {
            type: "smallint"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "integer",
        result: {
            type: "integer"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "bigint",
        result: {
            type: "bigint"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "decimal",
        result: {
            type: "decimal"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "real",
        result: {
            type: "real"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "double precision",
        result: {
            type: "double precision"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "smallserial",
        result: {
            type: "smallserial"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "serial",
        result: {
            type: "serial"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "bigserial",
        result: {
            type: "bigserial"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "money",
        result: {
            type: "money"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "text",
        result: {
            type: "text"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "name",
        result: {
            type: "name"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "bytea",
        result: {
            type: "bytea"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "timestamp without time zone",
        result: {
            type: "timestamp without time zone"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "timestamp with time zone",
        result: {
            type: "timestamp with time zone"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "timestamp",
        result: {
            type: "timestamp"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "time without time zone",
        result: {
            type: "time without time zone"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "time with time zone",
        result: {
            type: "time with time zone"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "boolean",
        result: {
            type: "boolean"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "point",
        result: {
            type: "point"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "line",
        result: {
            type: "line"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "lseg",
        result: {
            type: "lseg"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "box",
        result: {
            type: "box"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "path",
        result: {
            type: "path"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "polygon",
        result: {
            type: "polygon"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "path",
        result: {
            type: "path"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "circle",
        result: {
            type: "circle"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "cidr",
        result: {
            type: "cidr"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "inet",
        result: {
            type: "inet"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "macaddr",
        result: {
            type: "macaddr"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "macaddr8",
        result: {
            type: "macaddr8"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "tsvector",
        result: {
            type: "tsvector"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "tsquery",
        result: {
            type: "tsquery"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "uuid",
        result: {
            type: "uuid"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "xml",
        result: {
            type: "xml"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "json",
        result: {
            type: "json"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "jsonb",
        result: {
            type: "jsonb"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "int",
        result: {
            type: "int"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "int4range",
        result: {
            type: "int4range"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "int8range",
        result: {
            type: "int8range"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "numrange",
        result: {
            type: "numrange"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "tsrange",
        result: {
            type: "tsrange"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "tstzrange",
        result: {
            type: "tstzrange"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "daterange",
        result: {
            type: "daterange"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "regclass",
        result: {
            type: "regclass"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "regproc",
        result: {
            type: "regproc"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "regprocedure",
        result: {
            type: "regprocedure"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "regoper",
        result: {
            type: "regoper"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "regoperator",
        result: {
            type: "regoperator"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "regclass",
        result: {
            type: "regclass"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "regtype",
        result: {
            type: "regtype"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "regrole",
        result: {
            type: "regrole"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "regnamespace",
        result: {
            type: "regnamespace"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "regconfig",
        result: {
            type: "regconfig"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "regdictionary",
        result: {
            type: "regdictionary"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "date",
        result: {
            type: "date"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "trigger",
        result: {
            type: "trigger"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "void",
        result: {
            type: "void"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "public.company",
        result: {
            type: "public.company"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "company",
        result: {
            type: "public.company"
        }
    });

    GrapeQLCoach.test(DataType, {
        str: "public.company[]",
        result: {
            type: "public.company[]"
        }
    });

    GrapeQLCoach.test(DataType, {
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
