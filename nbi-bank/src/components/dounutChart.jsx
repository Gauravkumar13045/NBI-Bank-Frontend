import { useEffect, useRef } from "react";
import { Chart, ArcElement, DoughnutController, Tooltip } from "chart.js";
Chart.register(ArcElement, DoughnutController, Tooltip);

const categories = [
    { name: "Food", icon: "🍴", color: "#f59e0b", amount: "₹ 1,42,15,000", pct: 18 },
    { name: "Travel", icon: "✈️", color: "#ef4444", amount: "₹ 1,25,98,000", pct: 16 },
    { name: "Shopping", icon: "🛍️", color: "#f97316", amount: "₹ 1,72,24,000", pct: 22 },
    { name: "Utilities", icon: "🏠", color: "#8b5cf6", amount: "₹ 94,32,000", pct: 12 },
    { name: "Healthcare", icon: "🏥", color: "#22c55e", amount: "₹ 78,54,000", pct: 10 },
    { name: "Education", icon: "🎓", color: "#3b82f6", amount: "₹ 62,28,000", pct: 8 },
    { name: "Others", icon: "❕", color: "#6b7280", amount: "₹ 1,09,69,000", pct: 14 },
];

function dounutChart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) chartInstance.current.destroy();
        chartInstance.current = new Chart(chartRef.current, {
            type: "doughnut",
            data: {
                datasets: [{
                    data: categories.map(c => c.pct),
                    backgroundColor: categories.map(c => c.color),
                    borderColor: "#0f0f0f",
                    borderWidth: 3,
                    hoverOffset: 18,
                    hoverBorderWidth: 4
                }]
            },
            options: {
                cutout: "68%",
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }, tooltip: {
                        enabled: true, backgroundColor: "#000000", borderColor: "#d8b45c", displayColors: true, titleFont: {
                            size: 14,
                            weight: "bold",
                        },
                        bodyFont: {
                            size: 12,
                            weight: "bold",
                        }
                    }
                },
                animation: { duration: 1000 }
            }
        });
        return () => chartInstance.current?.destroy();
    }, []);

    return (
        <div className="bg-[#0f0f0f] border border-[#494133] rounded-2xl p-5 w-full h-full flex flex-col">


            <div className="flex justify-between items-center mb-4">
                <p className="text-white text-sm font-semibold tracking-widest">CATEGORY BREAKDOWN</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 rotate-90 text-[#d8b45c] cursor-pointer">
                    <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    <path d="M11 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    <path d="M11 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                </svg>
            </div>


            <div className="relative w-50 h-50 mx-auto mb-5 mt-5">
                <canvas ref={chartRef} width={200} height={200} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <p className="text-gray-400 text-[10px] tracking-wider mb-1">TOTAL EXPENSES</p>
                    <p className="text-[white] text-base font-bold leading-tight">₹ 21,65,231</p>
                    <p className="text-red-500 text-xs mt-1">↓ 3.2% vs last month</p>
                </div>
            </div>


            <div className="flex flex-col gap-3 mt-5">
                {categories.map((c, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
                        <span className="text-sm w-5 text-center">{c.icon}</span>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-white text-xs">{c.name}</span>
                                <span className="text-gray-400 text-[11px] ml-2 whitespace-nowrap">{c.amount}</span>
                            </div>
                            <div className="bg-[#222] rounded-full h-0.75 w-full">
                                <div
                                    className="h-0.75 rounded-full transition-all duration-700"
                                    style={{ width: `${c.pct * 4}%`, background: c.color }}
                                />
                            </div>
                        </div>
                        <div className="bg-[#1f1f1f] text-gray-400 text-[11px] px-2 py-0.5 rounded-md shrink-0">
                            {c.pct}%
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default dounutChart;