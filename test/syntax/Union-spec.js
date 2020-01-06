"use strict";

const Union = require("../../lib/syntax/Union");
const testSyntax = require("../testSyntax");

const empty_select = {
    with: null,
    columns: null,
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
        result: {
            union: true,
            except: null,
            intersect: null,
            all: null,
            distinct: null,
            select: empty_select
        }
    });

    testSyntax(Union, {
        str: "except select",
        result: {
            union: null,
            except: true,
            intersect: null,
            all: null,
            distinct: null,
            select: empty_select
        }
    });

    testSyntax(Union, {
        str: "intersect select",
        result: {
            union: null,
            except: null,
            intersect: true,
            all: null,
            distinct: null,
            select: empty_select
        }
    });

    
    testSyntax(Union, {
        str: "union all select",
        result: {
            union: true,
            except: null,
            intersect: null,
            all: true,
            distinct: null,
            select: empty_select
        }
    });

    testSyntax(Union, {
        str: "except all select",
        result: {
            union: null,
            except: true,
            intersect: null,
            all: true,
            distinct: null,
            select: empty_select
        }
    });

    testSyntax(Union, {
        str: "intersect all select",
        result: {
            union: null,
            except: null,
            intersect: true,
            all: true,
            distinct: null,
            select: empty_select
        }
    });

    
    testSyntax(Union, {
        str: "union distinct select",
        result: {
            union: true,
            except: null,
            intersect: null,
            all: null,
            distinct: true,
            select: empty_select
        }
    });

    testSyntax(Union, {
        str: "except distinct select",
        result: {
            union: null,
            except: true,
            intersect: null,
            all: null,
            distinct: true,
            select: empty_select
        }
    });

    testSyntax(Union, {
        str: "intersect distinct select",
        result: {
            union: null,
            except: null,
            intersect: true,
            all: null,
            distinct: true,
            select: empty_select
        }
    });

    
});
