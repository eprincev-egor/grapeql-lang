
import {Syntax} from "lang-coach";
import {GrapeQLCoach} from "../GrapeQLCoach";
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
        if ( coach.isWord("view") ) {
            return true;
        }

        if ( !coach.isWord("create") ) {
            return false;
        }

        const checkpoint = coach.i;

        coach.expectWord("create");
        if ( coach.isWord("or") ) {
            coach.expectWord("or");
            coach.expectWord("replace");
        }

        const isCreateView = coach.isWord("view");

        coach.i = checkpoint;
        return isCreateView;
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
        
        if ( this.row.schema ) {
            out += this.row.schema.toString();
            out += ".";
        }
        out += this.row.name.toString();

        out += " as ";
        out += this.row.select.toString();

        return out;
    }
}


