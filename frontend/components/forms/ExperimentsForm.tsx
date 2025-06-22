"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ScenarioDropdown from "../navigation/ScenarioDropdown"
import { scenarios } from "@/lib/data/scenarios"

export default function ExperimentsForm() {
    const [scenario, setScenario] = useState("")
    const [group1, setGroup1] = useState("")
    const [group2, setGroup2] = useState("")
    const [amount1, setAmount1] = useState("")
    const [amount2, setAmount2] = useState("")

    const hasPlaceholders = (text: string) => {
        return (
            /\{group1\}/.test(text) &&
            /\{group2\}/.test(text) &&
            /\{amount1\}/.test(text) &&
            /\{amount2\}/.test(text)
        )
    }

    const allPlaceholdersPresent = hasPlaceholders(scenario)

    const filledScenario = scenario
        .replace("{group1}", group1)
        .replace("{group2}", group2)
        .replace("{amount1}", amount1)
        .replace("{amount2}", amount2)

    const handleSubmit = async () => {
        const messages1 = [
            {
                "role": "user",
                "content": filledScenario
            },
            {
                "role": "assistant",
                "content": `${amount1} ${group1}`
            }
        ]
        const messages2 = [
            {
                "role": "user",
                "content": filledScenario
            },
            {
                "role": "assistant",
                "content": `${amount2} ${group2}`
            }
        ]
    }
    return (
        <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Experiment Scenario Builder</h1>
                <p className="text-muted-foreground">
                    Build and compare ethical dilemmas using group and amount variables.
                </p>
            </div>
            <ScenarioDropdown selected={scenario} onChange={(v) => setScenario(
                scenarios.filter((s) => s.value == v)[0].description)}
                label="Start from Template?"
            />
            <div className="space-y-2">
                <p className="text-sm font-medium">Custom Template</p>
                <Textarea
                    placeholder="e.g. Should we save {amount1} {group1} or {amount2} {group2}?"
                    rows={3}
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                />
                {!allPlaceholdersPresent && (
                    <p className="text-sm text-red-500">
                        Scenario must include: <code>{'{group1}, {group2}, {amount1}, {amount2}'}</code>
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <p className="text-sm font-semibold text-red-600">🔴 Group 1</p>
                    <Input
                        placeholder="e.g. Engineers"
                        value={group1}
                        onChange={(e) => setGroup1(e.target.value)}
                        className="border-red-500 focus-visible:ring-red-500"
                    />
                    <Input
                        placeholder="Amount (e.g. 5)"
                        value={amount1}
                        onChange={(e) => setAmount1(e.target.value)}
                        className="border-red-500 focus-visible:ring-red-500"
                    />
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-semibold text-blue-600">🔵 Group 2</p>
                    <Input
                        placeholder="e.g. Children"
                        value={group2}
                        onChange={(e) => setGroup2(e.target.value)}
                        className="border-blue-500 focus-visible:ring-blue-500"
                    />
                    <Input
                        placeholder="Amount (e.g. 3)"
                        value={amount2}
                        onChange={(e) => setAmount2(e.target.value)}
                        className="border-blue-500 focus-visible:ring-blue-500"
                    />
                </div>
            </div>

            {allPlaceholdersPresent && (
                <div className="mt-6 px-6 py-4 rounded-md text-center font-medium text-white bg-gradient-to-r from-red-600 to-blue-600 shadow-md">
                    {filledScenario}
                </div>
            )}
            {/* Action Button */}
            <div className="flex justify-center">
                <button
                    onClick={handleSubmit}
                    disabled={!group1 || !group2}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    View Data
                </button>
            </div>
        </div>
    )
}
