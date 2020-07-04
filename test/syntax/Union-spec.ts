
import {testSyntax} from "../testSyntax";
import {Union} from "../../lib/syntax/Union";

const EMPTY_SELECT = {
    with: null,
    columns: null,
    into: null,
    from: null,
    where: null,
    groupBy: null,
    having: null,
    window: null,
    orderBy: null,
    union: null,
    offset: null,
    offsetRow: null,
    offsetRows: null,
    limit: null,
    fetch: null
};

describe("Union", () => {

    testSyntax(Union, {
        str: "union select",
        shouldBe: {
            union: true,
            select: EMPTY_SELECT
        }
    });

    testSyntax(Union, {
        str: "except select",
        shouldBe: {
            except: true,
            select: EMPTY_SELECT
        }
    });

    testSyntax(Union, {
        str: "intersect select",
        shouldBe: {
            intersect: true,
            select: EMPTY_SELECT
        }
    });

    
    testSyntax(Union, {
        str: "union all select",
        shouldBe: {
            union: true,
            all: true,
            select: EMPTY_SELECT
        }
    });

    testSyntax(Union, {
        str: "except all select",
        shouldBe: {
            except: true,
            all: true,
            select: EMPTY_SELECT
        }
    });

    testSyntax(Union, {
        str: "intersect all select",
        shouldBe: {
            intersect: true,
            all: true,
            select: EMPTY_SELECT
        }
    });

    
    testSyntax(Union, {
        str: "union distinct select",
        shouldBe: {
            union: true,
            distinct: true,
            select: EMPTY_SELECT
        }
    });

    testSyntax(Union, {
        str: "except distinct select",
        shouldBe: {
            except: true,
            distinct: true,
            select: EMPTY_SELECT
        }
    });

    testSyntax(Union, {
        str: "intersect distinct select",
        shouldBe: {
            intersect: true,
            distinct: true,
            select: EMPTY_SELECT
        }
    });

    
});
