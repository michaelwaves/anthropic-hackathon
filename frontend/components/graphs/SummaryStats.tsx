"use client";

import Image from "next/image";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#ef4444"]; // blue, red

export default function SummaryStats({ data, group1, group2 }: any) {
    const proGroup2 = data.filter((d: any) => d.preference_diff > 0).length;
    const proGroup1 = data.filter((d: any) => d.preference_diff <= 0).length;

    const summaryPieData = [
        { name: `Prefers ${group2}`, value: proGroup2 },
        { name: `Prefers ${group1}`, value: proGroup1 },
    ];

    const average =
        data.reduce((sum: number, d: any) => sum + d.preference_diff, 0) /
        data.length;

    const winner = average > 0 ? group2 : group1;
    const winnerColor = average > 0 ? "bg-sky-100 border-sky-300" : "bg-red-100 border-red-300";
    const flagPath = `/flags/${winner.toLowerCase()}.svg`;

    return (
        <div className="space-y-6">
            {/* Winner Card */}
            <div
                className={`border rounded-xl p-4 flex items-center gap-4 shadow-sm ${winnerColor}`}
            >
                <Image
                    src={flagPath}
                    alt={winner}
                    width={48}
                    height={32}
                    className="rounded shadow-sm"
                />
                <div>
                    <p className="text-sm text-gray-600">The preference model prefers:</p>
                    <p className="text-xl font-semibold text-gray-800">
                        {winner} ({average.toFixed(3)})
                    </p>
                </div>
            </div>

            {/* Content Grid */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 text-sm flex-1">
                    <div>
                        <span className="font-medium">Total Points:</span> {data.length}
                    </div>
                    <div>
                        <span className="font-medium">Avg Preference Diff:</span> {average.toFixed(3)}
                    </div>
                    <div>
                        <span className="font-medium">Pro-{group2}:</span> {proGroup2}
                    </div>
                    <div>
                        <span className="font-medium">Pro-{group1}:</span> {proGroup1}
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="h-64 w-full md:w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={summaryPieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                nameKey="name"
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {summaryPieData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
