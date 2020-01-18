
// НЕ ПОЛНАЯ ВЕРСИЯ СИНТАКСИСА!!
// описание полной здесь:
// https://www.postgresql.org/docs/9.5/sql-createtrigger.html

import {Syntax, Types} from "lang-coach";
import GrapeQLCoach from "../GrapeQLCoach";
import FunctionIdentify from "./FunctionIdentify";
import TriggerIdentify from "./TriggerIdentify";
import CommentOn from "./CommentOn";
import CommentOnTrigger from "./CommentOnTrigger";
import SchemaName from "./SchemaName";
import Expression from "./Expression";
import ObjectName from "./ObjectName";

export default class CreateTrigger extends Syntax<CreateTrigger> {
    structure() {
        return {
            name: Types.String,
            
            before: Types.Boolean,
            after: Types.Boolean,
            insert: Types.Boolean,
            delete: Types.Boolean,
            update: Types.Boolean,
            updateOf: Types.Array({
                element: Types.String,
                sort: true,
                unique: true
            }),
            
            table: SchemaName,

            constraint: Types.Boolean,
            deferrable: Types.Boolean,
            statement: Types.Boolean,
            initially: Types.String({
                enum: ["immediate", "deferred"]
            }),

            when: Types.String,

            procedure: FunctionIdentify,
            comment: CommentOnTrigger
        };
    }

    toIdentify(data) {
        return new TriggerIdentify({
            name: data.name,
            schema: data.table.get("schema"),
            table: data.table.get("name")
        });
    }

    is(coach: GrapeQLCoach) {
        return coach.is(/create(\s+constraint)?\s+trigger/i);
    }

    parse(coach: GrapeQLCoach, data: this["TInputData"]) {
        coach.expectWord("create");

        if ( coach.isWord("constraint") ) {
            coach.expectWord("constraint");
            data.constraint = true;
        }

        coach.expectWord("trigger");

        data.name = coach.readWord();
        

        if ( coach.isWord("before") ) {
            coach.expectWord("before");
            data.before = true;
        }
        else {
            coach.expectWord("after");
            data.after = true;
        }
        

        this.parseEvents(coach, data);
        coach.skipSpace();
        
        

        coach.expectWord("on");
        coach.skipSpace();
        
        data.table = coach.parse(SchemaName);
        coach.skipSpace();

        // NOT DEFERRABLE | [ DEFERRABLE ] [ INITIALLY IMMEDIATE | INITIALLY DEFERRED ]
        if ( coach.isWord("not") ) {
            coach.expectWord("not");
            coach.expectWord("deferrable");

            data.deferrable = false;
        }
        else if ( coach.isWord("deferrable") ) {
            coach.expectWord("deferrable");

            data.deferrable = true;
        }
        if ( coach.isWord("initially") ) {
            coach.expectWord("initially");
            
            if ( coach.isWord("immediate") ) {
                coach.expectWord("immediate");
                data.initially = "immediate";
            }
            else {
                coach.expectWord("deferred");
                data.initially = "deferred";
            }
        }

        coach.expectWord("for");
        coach.expectWord("each");

        if ( coach.isWord("row") ) {
            coach.expectWord("row");
        }
        else {
            coach.expectWord("statement");
            data.statement = true;
        }
        

        if ( coach.isWord("when") ) {
            coach.expectWord("when");

            coach.expect("(");
            coach.skipSpace();

            const when = coach.parse(Expression);
            data.when = when.toString();

            coach.skipSpace();
            coach.expect(")");
        }

        coach.expectWord("execute");
        coach.expectWord("procedure");

        data.procedure = coach.parse(FunctionIdentify);

        let existsSemicolon = false;
        if ( coach.is(/\s*;/) ) {
            coach.skipSpace();
            coach.expect(";");
            coach.skipSpace();

            existsSemicolon = true;
        }

        if ( existsSemicolon ) {
            if ( coach.is(CommentOn) ) {
                data.comment = coach.parse(CommentOnTrigger);
    
                const identify = this.toIdentify( data );
                const isSameIdentify = data.comment.get("trigger").equal( identify );
    
                if ( !isSameIdentify ) {
                    coach.throwError(
                        "comment after trigger has wrong identify: " + 
                        data.comment.get("trigger").toString()
                    );
                }
            }
        }

        if ( coach.is(/\s*;/) ) {
            coach.skipSpace();
            coach.expect(";");
            coach.skipSpace();
        }
    }

    parseEvents(coach: GrapeQLCoach, data: this["TInputData"]) {
        if ( coach.isWord("insert") ) {
            coach.expectWord("insert");
            data.insert = true;
        }
        else if ( coach.isWord("delete") ) {
            coach.expectWord("delete");
            data.delete = true;
        }
        else {
            coach.expectWord("update");
            data.update = true;

            
            if ( coach.isWord("of") ) {
                coach.expectWord("of");

                const columns = coach.parseComma(ObjectName).map((objectName) =>
                    objectName.toLowerCase()
                );

                data.updateOf = columns.sort();
            }
        }

        if ( coach.isWord("or") ) {
            coach.expectWord("or");

            this.parseEvents(coach, data);
        }
    }

    toString() {
        const trigger = this.data;
        let out = "create ";

        if ( trigger.constraint ) {
            out += "constraint ";
        }
        
        out += `trigger ${trigger.name}\n`;

        // after|before
        if ( trigger.before ) {
            out += "before";
        }
        else {
            out += "after";
        }
        out += " ";

        // insert or update of x or delete
        const events = [];
        if ( trigger.insert ) {
            events.push("insert");
        }
        if ( trigger.update ) {
            if ( trigger.updateOf ) {
                events.push(`update of ${ trigger.updateOf.join(", ") }`);
            } else {
                events.push("update");
            }
        }
        if ( trigger.delete ) {
            events.push("delete");
        }
        out += events.join(" or ");


        // on table
        out += `\non ${trigger.table}`;


        if ( trigger.deferrable === true ) {
            out += " deferrable";
        }
        else if ( trigger.deferrable === false ) {
            out += " not deferrable";
        }

        if ( trigger.initially ) {
            out += " initially ";
            out += trigger.initially;
        }


        if ( trigger.statement ) {
            out += "\nfor each statement ";
        } else {
            out += "\nfor each row ";
        }

        if ( trigger.when ) {
            out += "\nwhen ( ";
            out += trigger.when;
            out += " ) ";
        }

        out += `\nexecute procedure ${ trigger.procedure };`;

        if ( trigger.comment ) {
            out += "\n" + trigger.comment.toString() + ";";
        }

        return out;
    }
}
