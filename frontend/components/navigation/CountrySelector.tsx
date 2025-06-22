"use client"
import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock country data - replace with your actual country list
const countries = [
    { value: "americans", label: "Americans", code: "US" },
    { value: "chinese", label: "Chinese", code: "CN" },
    { value: "brits", label: "British", code: "GB" },
    { value: "french", label: "French", code: "FR" },
    { value: "germans", label: "Germans", code: "DE" },
    { value: "japanese", label: "Japanese", code: "JP" },
    { value: "indians", label: "Indians", code: "IN" },
    { value: "brazilians", label: "Brazilians", code: "BR" },
    { value: "canadians", label: "Canadians", code: "CA" },
    { value: "nigerians", label: "Nigerians", code: "NI" }
];

interface CountrySelectorProps {
    onSelectionChange?: (country1: string, country2: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onSelectionChange }) => {
    const [country1, setCountry1] = useState<string>("");
    const [country2, setCountry2] = useState<string>("");
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const router = useRouter();

    const handleCountry1Change = (value: string) => {
        setCountry1(value);
        setOpen1(false);
        if (onSelectionChange) {
            onSelectionChange(value, country2);
        }
    };

    const handleCountry2Change = (value: string) => {
        setCountry2(value);
        setOpen2(false);
        if (onSelectionChange) {
            onSelectionChange(country1, value);
        }
    };

    const getCountryLabel = (value: string) => {
        const country = countries.find(c => c.value === value);
        return country ? (
            <span className="flex items-center">
                <span className="mr-2 text-sm font-mono text-gray-500">{country.code}</span>
                {country.label}
            </span>
        ) : "Select country...";
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Country Comparison Selector
                </h2>
                <p className="text-gray-600">
                    Select two countries to compare preferences
                </p>
            </div>

            <div className="flex gap-4 items-end">
                {/* Country 1 Combobox */}
                <div className="flex-1 space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Country 1
                    </label>
                    <div className="relative">
                        <button
                            onClick={() => setOpen1(!open1)}
                            className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span className={country1 ? "text-gray-900" : "text-gray-500"}>
                                {getCountryLabel(country1)}
                            </span>
                            <ChevronsUpDown className="h-4 w-4 opacity-50" />
                        </button>

                        {open1 && (
                            <div className="absolute top-full z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                                <div className="max-h-60 overflow-auto p-1">
                                    {countries.map((country) => (
                                        <button
                                            key={country.value}
                                            onClick={() => handleCountry1Change(country.value)}
                                            className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                        >
                                            <Check
                                                className={`mr-2 h-4 w-4 ${country1 === country.value ? "opacity-100" : "opacity-0"
                                                    }`}
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

                {/* VS divider */}
                <div className="flex items-center justify-center h-10 px-2">
                    <span className="text-lg font-bold text-gray-500">VS</span>
                </div>

                {/* Country 2 Combobox */}
                <div className="flex-1 space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Country 2
                    </label>
                    <div className="relative">
                        <button
                            onClick={() => setOpen2(!open2)}
                            className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span className={country2 ? "text-gray-900" : "text-gray-500"}>
                                {getCountryLabel(country2)}
                            </span>
                            <ChevronsUpDown className="h-4 w-4 opacity-50" />
                        </button>

                        {open2 && (
                            <div className="absolute top-full z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                                <div className="max-h-60 overflow-auto p-1">
                                    {countries.map((country) => (
                                        <button
                                            key={country.value}
                                            onClick={() => handleCountry2Change(country.value)}
                                            className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                        >
                                            <Check
                                                className={`mr-2 h-4 w-4 ${country2 === country.value ? "opacity-100" : "opacity-0"
                                                    }`}
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
            </div>

            {/* Selection Display */}
            {country1 && country2 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-medium text-blue-900 mb-2">Current Selection</h3>
                    <div className="flex items-center justify-center text-blue-800">
                        <span className="flex items-center font-semibold">
                            <span className="mr-2 text-sm font-mono text-gray-600">{countries.find(c => c.value === country1)?.code}</span>
                            {countries.find(c => c.value === country1)?.label}
                        </span>
                        <span className="mx-4 font-bold">VS</span>
                        <span className="flex items-center font-semibold">
                            <span className="mr-2 text-sm font-mono text-gray-600">{countries.find(c => c.value === country2)?.code}</span>
                            {countries.find(c => c.value === country2)?.label}
                        </span>
                    </div>
                </div>
            )}

            {/* Action Button */}
            <div className="flex justify-center">
                <button
                    onClick={() => router.push(`/dashboard/compare?group1=${country1}&group2=${country2}`)}
                    disabled={!country1 || !country2}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Generate Comparison Data
                </button>
            </div>
        </div>
    );
};

export default CountrySelector;