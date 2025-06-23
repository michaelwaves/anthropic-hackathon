"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from "recharts"
import Image from "next/image"


const formatLabel = (group: string) => {
    const label = group.charAt(0).toUpperCase() + group.slice(1)
    return label
}

export default function RankingGraph({ data }: { data: any }) {
    return (
        <div className="w-full h-[400px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis
                        dataKey="group"
                        tick={({ payload, x, y, textAnchor }) => {
                            const group = payload.value
                            return (
                                <g transform={`translate(${x},${y})`}>
                                    <image
                                        href={`/flags/${group}.svg`}
                                        height={18}
                                        width={18}
                                        x={-9}
                                        y={-35}
                                    />
                                    <text
                                        x={0}
                                        y={-12}
                                        textAnchor="middle"
                                        fill="#374151"
                                        fontSize="12"
                                        fontWeight="500"
                                    >
                                        {formatLabel(group)}
                                    </text>
                                </g>
                            )
                        }}
                    />
                    <PolarRadiusAxis angle={30} domain={['auto', 'auto']} />
                    <Radar
                        name="Rating"
                        dataKey="rating"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.4}
                    />
                    <Tooltip
                        formatter={(value: number) => value.toFixed(2)}
                        contentStyle={{ fontSize: '14px' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}
