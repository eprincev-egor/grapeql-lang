
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
            except: null,
            intersect: null,
            all: null,
            distinct: null,
            select: EMPTY_SELECT
        }
    });

    testSyntax(Union, {
        str: "except select",
        shouldBe: {
            union: null,
            except: true,
            intersect: null,
            all: null,
            distinct: null,
            select: EMPTY_SELECT
        }
    });

    testSyntax(Union, {
        str: "intersect select",
        shouldBe: {
            union: null,
            except: null,
            intersect: true,
            all: null,
            distinct: null,
            select: EMPTY_SELECT
        }
    });

    
    testSyntax(Union, {
        str: "union all select",
        shouldBe: {
            union: true,
            except: null,
            intersect: null,
            all: true,
            distinct: null,
            select: EMPTY_SELECT
        }
    });

    testSyntax(Union, {
        str: "except all select",
        shouldBe: {
            union: null,
            except: true,
            intersect: null,
            all: true,
            distinct: null,
            select: EMPTY_SELECT
        }
    });

    testSyntax(Union, {
        str: "intersect all select",
        shouldBe: {
            union: null,
            except: null,
            intersect: true,
            all: true,
            distinct: null,
            select: EMPTY_SELECT
        }
    });

    
    testSyntax(Union, {
        str: "union distinct select",
        shouldBe: {
            union: true,
            except: null,
            intersect: null,
            all: null,
            distinct: true,
            select: EMPTY_SELECT
        }
    });

    testSyntax(Union, {
        str: "except distinct select",
        shouldBe: {
            union: null,
            except: true,
            intersect: null,
            all: null,
            distinct: true,
            select: EMPTY_SELECT
        }
    });

    testSyntax(Union, {
        str: "intersect distinct select",
        shouldBe: {
            union: null,
            except: null,
            intersect: true,
            all: null,
            distinct: true,
            select: EMPTY_SELECT
        }
    });

    
});
