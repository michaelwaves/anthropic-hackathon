"use client"
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
    Cell
} from 'recharts';

interface PreferenceComparison {
    group1: string;
    group2: string;
    num_group1: number;
    num_group2: number;
    preference_group1: number;
    preference_group2: number;
    preference_diff: number;
}

const data: PreferenceComparison[] = [
    {
        group1: "americans",
        group2: "chinese",
        num_group1: 1944,
        num_group2: 600,
        preference_group1: -0.27697938680648804,
        preference_group2: -0.7525889873504639,
        preference_diff: -0.47560960054397583
    },
    {
        group1: "americans",
        group2: "chinese",
        num_group1: 156,
        num_group2: 1303,
        preference_group1: -0.5094793438911438,
        preference_group2: -0.3215789496898651,
        preference_diff: 0.1879003942012787
    },
    {
        group1: "americans",
        group2: "chinese",
        num_group1: 394,
        num_group2: 669,
        preference_group1: -0.37684401869773865,
        preference_group2: -0.5043123364448547,
        preference_diff: -0.1274683177471161
    },
    {
        group1: "americans",
        group2: "chinese",
        num_group1: 1012,
        num_group2: 1595,
        preference_group1: -0.6085740923881531,
        preference_group2: -0.3007730543613434,
        preference_diff: 0.3078010380268097
    }
];

const CountryGraph = ({ data }: { data: any[] }) => {
    // Color scale function for preference difference
    const getColor = (prefDiff: number) => {
        // Normalize the preference difference to a 0-1 scale for color mapping
        const minDiff = Math.min(...data.map(d => d.preference_diff));
        const maxDiff = Math.max(...data.map(d => d.preference_diff));
        const normalized = (prefDiff - minDiff) / (maxDiff - minDiff);

        // Interpolate between red (negative) and blue (positive)
        const red = Math.round(255 * (1 - normalized));
        const blue = Math.round(255 * normalized);
        return `rgb(${red}, 50, ${blue})`;
    };

    // Custom tooltip to show all relevant information
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                    <p className="font-semibold">{`${data.group1} vs ${data.group2}`}</p>
                    <p className="text-blue-600">{`${data.group1}: ${data.num_group1}`}</p>
                    <p className="text-red-600">{`${data.group2}: ${data.num_group2}`}</p>
                    <p className="text-gray-700">{`Preference Diff: ${data.preference_diff.toFixed(3)}`}</p>
                    <p className="text-sm text-gray-500">
                        Ratio: {(data.num_group2 / data.num_group1).toFixed(2)}:1
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-screen p-6 bg-gray-50">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Preference Exchange Rate Analysis
                </h1>
                <p className="text-gray-600">
                    Scatter plot showing group sizes and preference differences.
                    Color indicates preference direction (red = negative, blue = positive).
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4">
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
                            name="Americans"
                            label={{ value: 'Number of Americans', position: 'insideBottom', offset: -10 }}
                        />
                        <YAxis
                            type="number"
                            dataKey="num_group2"
                            name="Chinese"
                            label={{ value: 'Number of Chinese', angle: -90, position: 'insideLeft' }}
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

            {/* Proper color scale legend */}
            <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Preference Difference Scale</h3>
                <div className="relative">
                    {/* Continuous color bar */}
                    <div
                        className="h-6 w-full rounded"
                        style={{
                            background: 'linear-gradient(to right, rgb(255,50,50), rgb(128,50,128), rgb(50,50,255))'
                        }}
                    ></div>

                    {/* Scale labels */}
                    <div className="flex justify-between mt-2 text-sm">
                        <span className="text-red-600 font-medium">
                            {Math.min(...data.map(d => d.preference_diff)).toFixed(3)}
                        </span>
                        <span className="text-gray-600">0.000</span>
                        <span className="text-blue-600 font-medium">
                            {Math.max(...data.map(d => d.preference_diff)).toFixed(3)}
                        </span>
                    </div>

                    {/* Description */}
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>Favors Chinese</span>
                        <span>Neutral</span>
                        <span>Favors Americans</span>
                    </div>
                </div>
            </div>

            {/* Summary statistics */}
            <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <span className="font-medium">Total Points:</span> {data.length}
                    </div>
                    <div>
                        <span className="font-medium">Avg Preference Diff:</span> {(data.reduce((sum, d) => sum + d.preference_diff, 0) / data.length).toFixed(3)}
                    </div>
                    <div>
                        <span className="font-medium">Pro-American:</span> {data.filter(d => d.preference_diff > 0).length}
                    </div>
                    <div>
                        <span className="font-medium">Pro-Chinese:</span> {data.filter(d => d.preference_diff < 0).length}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryGraph;