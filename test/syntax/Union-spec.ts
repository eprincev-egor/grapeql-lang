
import Union from "../../lib/syntax/Union";
import GrapeQLCoach from "../../lib/GrapeQLCoach";


const EMPTY_SELECT = {
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

    GrapeQLCoach.test(Union, {
        str: "union select",
        result: {
            union: true,
            except: null,
            intersect: null,
            all: null,
            distinct: null,
            select: EMPTY_SELECT
        }
    });

    GrapeQLCoach.test(Union, {
        str: "except select",
        result: {
            union: null,
            except: true,
            intersect: null,
            all: null,
            distinct: null,
            select: EMPTY_SELECT
        }
    });

    GrapeQLCoach.test(Union, {
        str: "intersect select",
        result: {
            union: null,
            except: null,
            intersect: true,
            all: null,
            distinct: null,
            select: EMPTY_SELECT
        }
    });

    
    GrapeQLCoach.test(Union, {
        str: "union all select",
        result: {
            union: true,
            except: null,
            intersect: null,
            all: true,
            distinct: null,
            select: EMPTY_SELECT
        }
    });

    GrapeQLCoach.test(Union, {
        str: "except all select",
        result: {
            union: null,
            except: true,
            intersect: null,
            all: true,
            distinct: null,
            select: EMPTY_SELECT
        }
    });

    GrapeQLCoach.test(Union, {
        str: "intersect all select",
        result: {
            union: null,
            except: null,
            intersect: true,
            all: true,
            distinct: null,
            select: EMPTY_SELECT
        }
    });

    
    GrapeQLCoach.test(Union, {
        str: "union distinct select",
        result: {
            union: true,
            except: null,
            intersect: null,
            all: null,
            distinct: true,
            select: EMPTY_SELECT
        }
    });

    GrapeQLCoach.test(Union, {
        str: "except distinct select",
        result: {
            union: null,
            except: true,
            intersect: null,
            all: null,
            distinct: true,
            select: EMPTY_SELECT
        }
    });

    GrapeQLCoach.test(Union, {
        str: "intersect distinct select",
        result: {
            union: null,
            except: null,
            intersect: true,
            all: null,
            distinct: true,
            select: EMPTY_SELECT
        }
    });

    
});
