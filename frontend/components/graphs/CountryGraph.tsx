"use client"
import { useSearchParams } from 'next/navigation';
import React from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie
} from 'recharts';
import SummaryStats from './SummaryStats';
import ScaleLegend from './ScaleLegend';

interface PreferenceComparison {
    group1: string;
    group2: string;
    num_group1: number;
    num_group2: number;
    preference_group1: number;
    preference_group2: number;
    preference_diff: number;
}

const CountryGraph = ({ data }: { data: PreferenceComparison[] }) => {

    const searchParams = useSearchParams()
    const group1 = searchParams.get("group1") ?? "americans"
    const group2 = searchParams.get("group2") ?? "nigerians"


    const getColor = (prefDiff: number) => {
        const maxAbs = Math.max(
            Math.abs(Math.min(...data.map(d => d.preference_diff))),
            Math.abs(Math.max(...data.map(d => d.preference_diff)))
        );

        const normalized = prefDiff / maxAbs;

        // Apply power scaling to make colors more sensitive near 0
        // Using square root makes small values more visible
        const sensitivity = 0.5; // Adjust this: lower = more sensitive near 0
        const enhanced = Math.sign(normalized) * Math.pow(Math.abs(normalized), sensitivity);

        // Ensure minimum visibility with a base intensity
        const baseIntensity = 80; // Minimum color intensity (0-255)
        const maxIntensity = 255;

        if (enhanced > 0) {
            // Positive values -> Blue
            const blue = Math.round(baseIntensity + (maxIntensity - baseIntensity) * enhanced);
            return `rgb(50, 50, ${blue})`;
        } else {
            // Negative values -> Red
            const red = Math.round(baseIntensity + (maxIntensity - baseIntensity) * -enhanced);
            return `rgb(${red}, 50, 50)`;
        }
    }

    // Custom tooltip to show all relevant information
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const diff = data.preference_diff.toFixed(3)
            return (
                <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                    <p className="font-semibold">{`${data.group1} vs ${data.group2}`}</p>
                    <p className="text-gray-800">{`${data.group1}: ${data.num_group1}`}</p>
                    <p className="text-gray-800">{`${data.group2}: ${data.num_group2}`}</p>
                    <p className={diff > 0 ? "text-blue-500" : "text-red-500"}>{`Preference Diff: ${diff}`}</p>
                    <p className="text-sm text-gray-500">
                        Ratio: <span className='text-red-500'>{(data.num_group2 / data.num_group1).toFixed(2)}</span>:
                        <span className='text-blue-500'>1</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    const summaryPieData = [
        {
            name: `Prefers ${group1}`,
            value: data.filter(d => d.preference_diff > 0).length
        },
        {
            name: `Prefers ${group2}`,
            value: data.filter(d => d.preference_diff <= 0).length
        }
    ]

    return (
        <div className="w-full h-screen p-6 bg-gray-50">
            <SummaryStats data={data} group1={group1} group2={group2} />
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Preference Exchange Rate Analysis
                </h1>
                <p className="text-gray-600">
                    Scatter plot showing group sizes and preference differences.
                    Color indicates preference direction (red = negative, blue = positive).
                </p>
            </div>

            <ScaleLegend group1={group1} group2={group2} data={data} />

            <div className="bg-white rounded-b-lg shadow-lg p-4">
                <ResponsiveContainer width="100%" height={500}>
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 60,
                            left: 60,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            type="number"
                            dataKey="num_group1"
                            name={group1}
                            label={{ value: `Number of ${group1}`, position: 'insideBottom', offset: -10 }}
                        />
                        <YAxis
                            type="number"
                            dataKey="num_group2"
                            name={group2}
                            label={{ value: `Number of ${group2}`, angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Scatter data={data} fill="#8884d8">
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getColor(entry.preference_diff)}
                                />
                            ))}
                        </Scatter>

                    </ScatterChart>
                </ResponsiveContainer>
            </div>


        </div>
    );
};

export default CountryGraph;