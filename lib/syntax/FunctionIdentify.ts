
import {Syntax, Types} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
import {ObjectLink} from "./ObjectLink";
import {SchemaName} from "./SchemaName";
import {DataType} from "./DataType";

export class FunctionIdentify extends Syntax<FunctionIdentify> {
    structure() {
        return {
            schema: Types.String,
            name: Types.String,
            args: Types.Array({
                element: Types.String
            })
        };
    }

    is(coach: GrapeQLCoach) {
        return coach.is(ObjectLink);
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        const schemaName = coach.parse(SchemaName);

        coach.skipSpace();
        coach.expect("(");
        coach.skipSpace();

        let args = [];
        if ( coach.is(DataType) ) {
            args = coach.parseComma(DataType);
            args = args.map((arg) =>
                arg.get("type")
            );
        }
        

        coach.skipSpace();
        coach.expect(")");

        data.schema = schemaName.get("schema");
        data.name = schemaName.get("name");
        data.args = args;
    }

    toString() {
        const {schema, name, args} = this.row;

        return `${schema}.${name}(${ args.join(", ") })`;
    }
}
