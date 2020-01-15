
import GrapeQLCoach from "../lib/GrapeQLCoach";
import assert from "assert";

export default function testSyntax(SomeSyntax, test) {
    if ( !test.str ) {
        throw new Error("test.str required");
    }

    if ( !test.result && !test.error ) {
        throw new Error("test.result or test.error required");
    }

    it(test.str, () => {

        const str = test.str;
        const parseFuncName = "parse" + SomeSyntax.name;
        const isFuncName = "is" + SomeSyntax.name;

        if ( test.error ) {
            const regExp = test.error;
            
            assert.throws(
                () => {
                    const coach = new GrapeQLCoach(str);
                    coach[ parseFuncName ]();
                },
                (err) =>
                    regExp.test( err )
            );
        }

        else {
            const coach = new GrapeQLCoach(str);
            let result;

            // test static method is
            result = coach[ isFuncName ](test.options);
            assert.ok( result );


            // test static method parse
            result = coach[ parseFuncName ](test.options);
            assert.deepEqual(test.result, result.toJSON());


            // test toString method
            const clone = result.clone();
            const cloneString = clone.toString();
            const cloneCoach = new GrapeQLCoach( cloneString );
            
            const cloneResult = cloneCoach[ parseFuncName ](test.options);
            assert.deepEqual(test.result, cloneResult.toJSON());
        }
    });
}
