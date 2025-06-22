"use server"

import { db } from "./db";

const fetchComparisons = async (group1: string, group2: string, scenario = "trolley") => {

    const comparisons = await db.manyOrNone(
        `
        SELECT *
        FROM comparisons
        WHERE group1 = $1 AND group2 = $2 AND scenario = $3
        `,
        [group1, group2, scenario]
    )
    return comparisons
}


export { fetchComparisons }