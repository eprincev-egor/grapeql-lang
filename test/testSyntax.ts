
import GrapeQLCoach from "../lib/GrapeQLCoach";
import assert from "assert";

interface ITestResult {
    str: string;
    options?: {[key: string]: any};
    result: {[key: string]: any};
}
interface ITestError {
    str: string;
    error: RegExp;
}

export default function testSyntax<K extends keyof GrapeQLCoach["syntax"], T extends GrapeQLCoach["syntax"][K]>(
    SomeSyntax: T, 
    inputTest: ITestResult | ITestError
) {
    const testAny = inputTest as any;

    if ( !testAny.str ) {
        throw new Error("test.str required");
    }

    if ( !testAny.result && !testAny.error ) {
        throw new Error("test.result or test.error required");
    }

    const str = testAny.str;

    if ( testAny.error ) {
        const test = testAny as ITestError;
        const regExp = test.error;

        it(`expected error:\n ${regExp}\nstring:\n${str}`, () => {
            
            assert.throws(
                () => {
                    const coach = new GrapeQLCoach(str);
                    coach.parse(SomeSyntax);
                },
                (err) =>
                    regExp.test( err )
            );
        });
    }
    else {
        const test = testAny as ITestResult;

        it(`testing method coach.is(${ SomeSyntax.name })\n string:\n${str}`, () => {

            const coach = new GrapeQLCoach(str);
            const result = coach.is(SomeSyntax, test.options);
            assert.ok( result );
        });


        it(`testing method coach.parse(${ SomeSyntax.name })\n string:\n${str}`, () => {
            
            const coach = new GrapeQLCoach(str);
            const result = coach.parse(SomeSyntax, test.options);
            assert.deepEqual(test.result, result.toJSON());
        });


        it(`testing method ${ SomeSyntax.name }.toString()\n string:\n${str}`, () => {
            
            const coach = new GrapeQLCoach(str);
            const result = coach.parse(SomeSyntax, test.options);
            const clone = result.clone();
            const cloneString = clone.toString();
            const cloneCoach = new GrapeQLCoach( cloneString );
            
            const cloneResult = cloneCoach.parse(SomeSyntax, test.options);
            assert.deepEqual(test.result, cloneResult.toJSON());
        });
    }

}
