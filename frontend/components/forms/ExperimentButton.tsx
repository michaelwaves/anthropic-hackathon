"use client"

import { fetchPreference } from "@/lib/actions"
import { useState } from "react"
import { Loader2, User, Bot } from "lucide-react"

type Props = {
    group1: string
    group2: string
    amount1: string
    amount2: string
    filledScenario: string
}

function ExperimentButton({ group1, group2, amount1, amount2, filledScenario }: Props) {
    const [loading, setLoading] = useState(false)
    const [preference1, setPreference1] = useState<number | null>(null)
    const [preference2, setPreference2] = useState<number | null>(null)

    const messages1 = [
        { role: "user", content: filledScenario },
        { role: "assistant", content: `${amount1} ${group1}` },
    ]
    const messages2 = [
        { role: "user", content: filledScenario },
        { role: "assistant", content: `${amount2} ${group2}` },
    ]

    const handleSubmit = async () => {
        setLoading(true)
        const p1 = await fetchPreference(messages1)
        const p2 = await fetchPreference(messages2)
        setPreference1(p1)
        setPreference2(p2)
        setLoading(false)
    }

    const winner =
        preference1 !== null && preference2 !== null
            ? preference1 > preference2
                ? `${amount1} ${group1}`
                : `${amount2} ${group2}`
            : null

    const average = preference1 !== null && preference2 !== null
        ? Math.abs(preference1 - preference2)
        : 0

    const winnerColor =
        preference1 !== null && preference2 !== null
            ? preference1 > preference2
                ? "bg-red-100 border-red-300"
                : "bg-blue-100 border-blue-300"
            : ""

    return (
        <div className="w-full flex flex-col gap-4 mt-8">
            <div className="flex justify-center">
                <button
                    onClick={handleSubmit}
                    disabled={!group1 || !group2 || loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin h-4 w-4" /> Running
                        </span>
                    ) : (
                        "View Data"
                    )}
                </button>
            </div>

            {preference1 !== null && preference2 !== null && (
                <>
                    {/* Chat history panels */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-md p-4 space-y-2 bg-red-50">
                            <p className="text-sm font-semibold text-red-700">{amount1} {group1}</p>
                            <div className="flex items-start gap-2">
                                <User className="w-20" />
                                <p className="text-sm">{filledScenario}</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <Bot />
                                <p className="text-sm">{amount1} {group1}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Score: {preference1.toFixed(3)}</p>
                        </div>

                        <div className="border rounded-md p-4 space-y-2 bg-blue-50">
                            <p className="text-sm font-semibold text-blue-700">{amount2} {group2}</p>
                            <div className="flex items-start gap-2">
                                <User className="w-20" />
                                <p className="text-sm">{filledScenario}</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <Bot />
                                <p className="text-sm">{amount2} {group2}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Score: {preference2.toFixed(3)}</p>
                        </div>
                    </div>

                    {/* Winner Panel */}
                    <div
                        className={`border rounded-xl p-4 flex items-center justify-between shadow-sm mt-4 ${winnerColor}`}
                    >
                        <p className="text-sm text-gray-600">The preference model prefers:</p>
                        <p className="text-xl font-semibold text-gray-800">
                            {winner} (Δ {average.toFixed(3)})
                        </p>
                    </div>
                </>
            )}
        </div>
    )
}

export default ExperimentButton
