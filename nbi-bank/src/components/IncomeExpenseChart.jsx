import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    Dot
} from "recharts";
import React from "react";

const chartData = [
    { day: 1, income: 6500000, expense: 2200000 },
    { day: 2, income: 8200000, expense: 2800000 },
    { day: 3, income: 9000000, expense: 3100000 },
    { day: 4, income: 8700000, expense: 3400000 },
    { day: 5, income: 10200000, expense: 3600000 },
    { day: 6, income: 9800000, expense: 3200000 },
    { day: 7, income: 11000000, expense: 3800000 },
    { day: 8, income: 12500000, expense: 4200000 },
    { day: 9, income: 13800000, expense: 4600000 },
    { day: 10, income: 15000000, expense: 5000000 },
    { day: 11, income: 14200000, expense: 5200000 },
    { day: 12, income: 13500000, expense: 4800000 },
    { day: 13, income: 14800000, expense: 5100000 },
    { day: 14, income: 16200000, expense: 5800000 },
    { day: 15, income: 16500000, expense: 6100000 },
    { day: 16, income: 15800000, expense: 5600000 },
    { day: 17, income: 14900000, expense: 5200000 },
    { day: 18, income: 13800000, expense: 4900000 },
    { day: 19, income: 14200000, expense: 5000000 },
    { day: 20, income: 15100000, expense: 5300000 },
    { day: 21, income: 14600000, expense: 5500000 },
    { day: 22, income: 15800000, expense: 5800000 },
    { day: 23, income: 16450000, expense: 6250000 },
    { day: 24, income: 15200000, expense: 5100000 },
    { day: 25, income: 14100000, expense: 4800000 },
    { day: 26, income: 15600000, expense: 5200000 },
    { day: 27, income: 17200000, expense: 5600000 },
    { day: 28, income: 18500000, expense: 5900000 },
    { day: 29, income: 19200000, expense: 6100000 },
    { day: 30, income: 19800000, expense: 6300000 },
    { day: 31, income: 20500000, expense: 6500000 },
];

const CustomDot = (props) => {
    const { cx, cy, stroke } = props;
    return (
        <circle
            cx={cx}
            cy={cy}
            r={4}
            fill={stroke}
            stroke={stroke}
            strokeWidth={2}
        />
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: "#0f0f0f",
                border: "1px solid #494133",
                borderRadius: "12px",
                padding: "12px 16px",
                boxShadow: "0 0 20px rgba(216,180,92,0.15)"
            }}>
                <p style={{ color: "#ffffff", fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
                    {label} May 2025
                </p>
                {payload.map((entry, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <div style={{
                            width: "10px", height: "10px",
                            borderRadius: "50%",
                            background: entry.color,
                            border: `2px solid ${entry.color}`
                        }} />
                        <span style={{ color: "#aaa", fontSize: "12px", minWidth: "65px" }}>
                            {entry.name === "income" ? "Income" : "Expenses"}
                        </span>
                        <span style={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}>
                            ₹ {entry.value.toLocaleString("en-IN")}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const CustomLegend = () => (
    <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "28px", height: "2px", background: "#D8B45C" }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D8B45C" }} />
            <span style={{ color: "#ccc", fontSize: "12px" }}>Income</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "28px", height: "2px", background: "#FF4D4D" }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF4D4D" }} />
            <span style={{ color: "#ccc", fontSize: "12px" }}>Expenses</span>
        </div>
    </div>
);


export default function IncomeExpenseChart() {
    return (
        <div className="border border-[#494133] p-4 rounded-lg">
            <CustomLegend />
            <ResponsiveContainer width="100%" height={320}>
                <AreaChart
                    data={chartData}
                    margin={{ top: 15, right: 10, left: 10, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D8B45C" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#D8B45C" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF4D4D" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#FF4D4D" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        vertical={false}
                        stroke="#1f1f1f"
                        strokeDasharray="0"
                    />

                    <XAxis
                        dataKey="day"
                        tick={{ fill: "#666", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        ticks={[1, 5, 10, 15, 20, 25, 30]}
                    />

                    <YAxis
                        tick={{ fill: "#666", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v / 1000000}M`}
                        ticks={[0, 5000000, 10000000, 15000000, 20000000]}
                    />

                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{
                            stroke: "#d8b45c",
                            strokeDasharray: "4 4",
                            strokeWidth: 1
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#D8B45C"
                        strokeWidth={2.5}
                        fill="url(#incomeGradient)"
                        dot={<CustomDot />}
                        activeDot={{ r: 6, fill: "#D8B45C", stroke: "#D8B45C" }}
                    />

                    <Area
                        type="monotone"
                        dataKey="expense"
                        stroke="#FF4D4D"
                        strokeWidth={2.5}
                        fill="url(#expenseGradient)"
                        dot={<CustomDot />}
                        activeDot={{ r: 6, fill: "#FF4D4D", stroke: "#FF4D4D" }}
                    />
                </AreaChart>
            </ResponsiveContainer>

        </div>
    );
}