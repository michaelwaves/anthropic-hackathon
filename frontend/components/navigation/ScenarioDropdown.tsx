"use client"

import { ChevronsUpDown, Check } from "lucide-react"
import { useState } from "react"
import { scenarios } from "@/lib/data/scenarios"

type Props = {
    selected: string | null
    onChange: (value: string) => void
}

export default function ScenarioDropdown({ selected, onChange }: Props) {
    const [open, setOpen] = useState(false)

    const getScenarioLabel = (value: string | null) => {
        const scenario = scenarios.find(c => c.value === value);
        return scenario ? (
            <span className="flex items-center">
                {scenario.label}
            </span>
        ) : "Select scenario...";
    };

    return (
        <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-gray-700">Scenario</label>
            <div className="relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <span className={selected ? "text-gray-900" : "text-gray-500"}>
                        {getScenarioLabel(selected)}
                    </span>
                    <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </button>

                {open && (
                    <div className="absolute top-full z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                        <div className="max-h-60 overflow-auto p-1">
                            {scenarios.map((scenario) => (
                                <button
                                    key={scenario.value}
                                    onClick={() => {
                                        onChange(scenario.value)
                                        setOpen(false)
                                    }}
                                    className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                >
                                    <Check
                                        className={`mr-2 h-4 w-4 ${selected === scenario.value ? "opacity-100" : "opacity-0"}`}
                                    />
                                    {scenario.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
