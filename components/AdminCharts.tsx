"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

interface AdminChartsProps {
    data: {
        date: string;
        users: number;
        uploads: number;
    }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black/90 border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-md">
                <p className="text-zinc-400 text-xs font-mono mb-2">{label}</p>
                <div className="space-y-1">
                    <p className="text-purple-400 text-sm font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        Users: {payload[0].value}
                    </p>
                    <p className="text-cyan-400 text-sm font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-500" />
                        Uploads: {payload[1].value}
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export default function AdminCharts({ data }: AdminChartsProps) {
    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="#52525b"
                        tick={{ fill: "#52525b", fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#52525b"
                        tick={{ fill: "#52525b", fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorUsers)"
                    />
                    <Area
                        type="monotone"
                        dataKey="uploads"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorUploads)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
