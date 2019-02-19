"use strict";

const {Syntax} = require("lang-coach");
const ObjectName = require("./ObjectName");
const ValuesRow = require("./ValuesRow");

class WithQuery extends Syntax {
    static structure() {
        const Select = WithQuery.prototype.Coach.Select;

        return {
            name: ObjectName,
            columns: [ObjectName],
            select: Select,
            values: [ValuesRow]
        };
    }

    static parse(coach, data) {
        data.name = coach.parseObjectName();
        coach.skipSpace();

        // [ ( column_name [, ...] ) ]
        if ( coach.is("(") ) {
            coach.expect("(");
            coach.skipSpace();

            data.columns = coach.parseComma("ObjectName");

            coach.skipSpace();
            coach.expect(")");
        }

        coach.expectWord("as");

        coach.expect("(");
        coach.skipSpace();

        if ( coach.isWord("values") ) {
            coach.expectWord("values");

            data.values = coach.parseComma("ValuesRow");

            let firstRow = data.values[0];
            let firstRowValues = firstRow.get("values");
            let columnsLength = firstRowValues.length;

            for (let i = 0, n = data.values.length; i < n; i++) {
                let valuesRow = data.values[ i ];
                let rowValues = valuesRow.get("values");
                
                if ( rowValues.length != columnsLength ) {
                    coach.throwError("VALUES lists must all be the same length");
                }
                
                valuesRow.walk(valueItem => {
                    if ( valueItem.get("default") ) {
                        coach.throwError("DEFAULT is not allowed in this context");
                    }
                });
            }
        }
        // else if ( coach.isInsert() ) {
        //     this.insert = coach.parseInsert();
        //     this.addChild(this.insert);
        // }
        // else if ( coach.isUpdate() ) {
        //     this.update = coach.parseUpdate();
        //     this.addChild(this.update);
        // }
        // else if ( coach.isDelete() ) {
        //     this.delete = coach.parseDelete();
        //     this.addChild(this.delete);
        // }
        else {
            data.select = coach.parseSelect();
        }

        coach.skipSpace();
        coach.expect(")");
    }

    static is(coach) {
        return !coach.isWord("select") && coach.isObjectName();
    }

    toString() {
        let data = this.data;
        let out = "";

        out += data.name.toString() + " ";

        if ( data.columns ) {
            out += "(";
            out += data.columns.map(column => column.toString()).join(", ");
            out += ") ";
        }

        out += "as (";
        if ( data.values ) {
            out += " values " + data.values.map(valueRow => valueRow.toString()).join(", ");
        }
        // else if ( this.insert ) {
        //     out += this.insert.toString();
        // }
        // else if ( this.update ) {
        //     out += this.update.toString();
        // }
        // else if ( this.delete ) {
        //     out += this.delete.toString();
        // }
        else {
            out += data.select.toString();
        }

        out += ")";

        return out;
    }
}

module.exports = WithQuery;