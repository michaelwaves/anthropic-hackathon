"use client"

import { ChevronsUpDown, Check } from "lucide-react"
import { useState } from "react"
import { countries } from "@/lib/data/countries"

type Props = {
    label: string
    selected: string | null
    onChange: (value: string) => void
}

export default function CountrySelect({ label, selected, onChange }: Props) {
    const [open, setOpen] = useState(false)

    const getCountryLabel = (value: string | null) => {
        const country = countries.find(c => c.value === value);
        return country ? (
            <span className="flex items-center">
                <span className="mr-2 text-sm font-mono text-gray-500">{country.code}</span>
                {country.label}
            </span>
        ) : "Select country...";
    };

    return (
        <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <span className={selected ? "text-gray-900" : "text-gray-500"}>
                        {getCountryLabel(selected)}
                    </span>
                    <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </button>

                {open && (
                    <div className="absolute top-full z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                        <div className="max-h-60 overflow-auto p-1">
                            {countries.map((country) => (
                                <button
                                    key={country.value}
                                    onClick={() => {
                                        onChange(country.value)
                                        setOpen(false)
                                    }}
                                    className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                >
                                    <Check
                                        className={`mr-2 h-4 w-4 ${selected === country.value ? "opacity-100" : "opacity-0"}`}
                                    />
                                    <span className="mr-2 text-sm font-mono text-gray-500">{country.code}</span>
                                    {country.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
