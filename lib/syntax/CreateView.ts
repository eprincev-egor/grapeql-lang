
import {Syntax} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import ObjectName from "./ObjectName";
import Select from "./Select";

export default class CreateView extends Syntax<CreateView> {
    structure() {
        return {
            schema: ObjectName,
            name: ObjectName,
            select: Select
        };
    }

    is(coach: GrapeQLCoach) {
        return coach.is(/(create(\s+or\s+replace)?\s+)?view/i);
    }
   
    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.isWord("create") ) {
            coach.expectWord("create");

            if ( coach.isWord("or") ) {
                coach.expectWord("or");
                coach.expectWord("replace");
            }
        }

        coach.expectWord("view");
        data.name = coach.parse(ObjectName);

        if ( coach.is(/\s*\./) ) {
            coach.skipSpace();
            coach.expect(".");
            
            data.schema = data.name;
            data.name = coach.parse(ObjectName);
        }
        
        coach.expectWord("as");
        data.select = coach.parse(Select);
    }
     
    toString() {
        let out = "view ";
        
        if ( this.data.schema ) {
            out += this.data.schema.toString();
            out += ".";
        }
        out += this.data.name.toString();

        out += " as ";
        out += this.data.select.toString();

        return out;
    }
}

