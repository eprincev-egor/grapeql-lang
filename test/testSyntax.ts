
import {Syntax} from "lang-coach";
import {GrapeQLCoach} from "../lib/GrapeQLCoach";
import assert from "assert";

interface ITestResult<SomeSyntax extends Syntax<any>> {
    // string for parsing
    str: string;
    // Syntax options
    options?: {[key: string]: any};
    // parsing result
    shouldBe?: SomeSyntax["TInputData"];
    // or expected error on parsing
    error?: RegExp;
}

export function testSyntax<
    K extends keyof GrapeQLCoach["syntax"], 
    TSyntax extends GrapeQLCoach["syntax"][K]
>(
    SomeSyntax: TSyntax, 
    inputTest: ITestResult<InstanceType<TSyntax>>
) {
    const testAny = inputTest as any;

    if ( !("str" in testAny) ) {
        throw new Error("str required");
    }
    if ( typeof testAny.str !== "string" ) {
        throw new Error("str should be string");
    }

    if ( !testAny.shouldBe && !testAny.error ) {
        throw new Error("'shouldBe' or 'error' required");
    }
    
    if ( !SomeSyntax ) {
        throw new Error("SomeSyntax required");
    }

    if ( typeof SomeSyntax !== "function" || !(SomeSyntax.prototype instanceof Syntax) ) {
        throw new Error("SomeSyntax should be Syntax constructor");
    }

    const str = testAny.str;

    if ( testAny.error ) {
        const test = testAny as ITestResult<InstanceType<TSyntax>>;
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
        const test = testAny as ITestResult<InstanceType<TSyntax>>;
        const shouldBeResult = test.shouldBe;

        it(`testing method coach.is(${ SomeSyntax.name })\n string:\n${str}`, () => {

            const coach = new GrapeQLCoach(str);
            const actual = coach.is(SomeSyntax, test.options);
            assert.ok( actual );
        });


        it(`testing method coach.parse(${ SomeSyntax.name })\n string:\n${str}`, () => {
            
            const coach = new GrapeQLCoach(str);
            const actualResult = coach.parse(SomeSyntax, test.options);
            assert.deepEqual(actualResult.toJSON(), shouldBeResult);
        });


        it(`testing method ${ SomeSyntax.name }.toString()\n string:\n${str}`, () => {
            
            const coach = new GrapeQLCoach(str);
            const actualResult = coach.parse(SomeSyntax, test.options);
            const clone = actualResult.clone();
            const cloneString = clone.toString();
            const cloneCoach = new GrapeQLCoach( cloneString );
            
            const cloneActualResult = cloneCoach.parse(SomeSyntax, test.options);
            assert.deepEqual(cloneActualResult.toJSON(), shouldBeResult);
        });
    }

}
