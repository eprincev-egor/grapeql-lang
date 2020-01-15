
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

        if ( test.error ) {
            const regExp = test.error;
            
            assert.throws(
                () => {
                    const coach = new GrapeQLCoach(str);
                    coach.parse(SomeSyntax);
                },
                (err) =>
                    regExp.test( err )
            );
        }

        else {
            const coach = new GrapeQLCoach(str);
            let result;

            // test static method is
            result = coach.is(SomeSyntax, test.options);
            assert.ok( result );


            // test static method parse
            result = coach.parse(SomeSyntax, test.options);
            assert.deepEqual(test.result, result.toJSON());


            // test toString method
            const clone = result.clone();
            const cloneString = clone.toString();
            const cloneCoach = new GrapeQLCoach( cloneString );
            
            const cloneResult = cloneCoach.parse(SomeSyntax, test.options);
            assert.deepEqual(test.result, cloneResult.toJSON());
        }
    });
}
