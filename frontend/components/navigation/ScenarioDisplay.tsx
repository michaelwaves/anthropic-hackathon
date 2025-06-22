"use client"

import { scenarios } from "@/lib/data/scenarios"
import { useEffect, useState } from "react"

type Props = {
    scenario: string
    country1: string
    country2: string

}

export default function ScenarioDisplay({
    scenario,
    country1,
    country2,
}: Props) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const valid = scenario && country1 && country2
        if (valid) {
            // Delay to allow transition animation to trigger
            requestAnimationFrame(() => setVisible(true))
        } else {
            setVisible(false)
        }
    }, [scenario, country1, country2])

    const template = scenarios.find((s) => s.value === scenario)?.description || ""

    const filled = template
        .replace("{amount1}", "X")
        .replace("{group1}", country1)
        .replace("{amount2}", "Y")
        .replace("{group2}", country2)

    return (
        <div
            className={`transition-all duration-500 transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } mt-6 rounded-xl p-6 text-white bg-gradient-to-r from-red-600 to-blue-500 shadow-xl border border-blue-200`}
        >
            <p className="text-base font-semibold mb-2">We asked the preference model:</p>
            <p className="text-lg font-medium leading-relaxed">{filled}</p>
        </div>
    )
}
