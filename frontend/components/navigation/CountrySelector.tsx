"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CountryDisplay from './CountryDisplay';
import CountryDropdown from './CountryDropdown';
import ScenarioDropdown from './ScenarioDropdown';
import ScenarioDisplay from './ScenarioDisplay';

const CountrySelector: React.FC = () => {
    const [country1, setCountry1] = useState<string>("");
    const [country2, setCountry2] = useState<string>("");
    const [scenario, setScenario] = useState("trolley");

    const router = useRouter();

    const handleCountry1Change = (value: string) => {
        setCountry1(value);

    };

    const handleCountry2Change = (value: string) => {
        setCountry2(value);
    };


    return (
        <div className="w-full max-w-4xl mx-auto p-6 space-y-6">

            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Country Comparison Selector
                </h2>
                <p className="text-gray-600">
                    Select two countries to compare preferences under different scenarios
                </p>
            </div>
            <ScenarioDropdown
                selected={scenario}
                onChange={(value: string) => setScenario(value)}
            />

            <div className="flex gap-4 items-end">

                <CountryDropdown
                    label="Country 1"
                    selected={country1}
                    onChange={handleCountry1Change}
                />

                <div className="flex items-center justify-center h-10 px-2">
                    <span className="text-lg font-bold text-gray-500">VS</span>
                </div>

                <CountryDropdown
                    label="Country 2"
                    selected={country2}
                    onChange={handleCountry2Change}
                />
            </div>
            <CountryDisplay country1={country1} country2={country2} />
            <ScenarioDisplay scenario={scenario} country1={country1} country2={country2} />

            {/* Action Button */}
            <div className="flex justify-center">
                <button
                    onClick={() => router.push(`/dashboard/compare?group1=${country1}&group2=${country2}&scenario=${scenario}`)}
                    disabled={!country1 || !country2}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    View Data
                </button>
            </div>
        </div>
    );
};

export default CountrySelector;