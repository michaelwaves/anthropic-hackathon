"use server"

import Anthropic from "@anthropic-ai/sdk";
import { db } from "./db";
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})
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

const fetchRankings = async (scenario = "trolley") => {

    const rankings = await db.manyOrNone(
        `
        SELECT *
        FROM rankings
        WHERE scenario = $1
        `,
        [scenario]
    )
    return rankings
}


const fetchPreference = async (messages: any[]) => {
    const res = await anthropic.messages.create({
        model: "as-hackathon-pm-rollout",
        max_tokens: 1,
        messages,
        temperature: 0
    });
    console.log(res)
    //@ts-expect-error description: research exists on response
    return res.research.value_heads[0][0]
}


export { fetchComparisons, fetchPreference, fetchRankings }