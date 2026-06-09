import React, { useState, useEffect } from "react";

import {
    AreaChart,
    Area,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

import chartData from "../data/chartData";

import adani from "../images/stockImage/adani.png";
import hdfc from "../images/stockImage/hdfc.png";
import reliance from "../images/stockImage/reliance.png";
import tcs from "../images/stockImage/tcs.png";

import phone1 from "../images/phone2.png";





function MarketChart() {


    const [rotateCardnew, setRotateCardnew] = useState({
        x: 0,
        y: 0,
    });
    const handleMouseMoveCardnew = (e) => {

        const card = e.currentTarget;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 50;
        const rotateX = -((y - centerY) / centerY) * 50;

        setRotateCardnew({
            x: rotateX,
            y: rotateY,
        });
    };

    const resetRotateCardnew = () => {
        setRotateCardnew({
            x: 0,
            y: 0,
        });
    };




    const [activeTab, setActiveTab] = useState("Market Overview");

    const [status, setStatus] = useState("");



    const tabs = [
        "Market Overview",
        "Mutual Funds",
        "Gold Rates",
        "Currency"
    ];




    useEffect(() => {

        const checkMarketStatus = () => {

            const now = new Date();

            const hours = now.getHours();
            const minutes = now.getMinutes();

            const currentMinutes = hours * 60 + minutes;

            const openMinutes = 9 * 60 + 15;
            const closeMinutes = 15 * 60 + 30;



            if (
                currentMinutes >= openMinutes &&
                currentMinutes <= closeMinutes
            ) {

                setStatus("open");

            }

            else {

                setStatus("closed");

            }

        };



        checkMarketStatus();




        const interval = setInterval(
            checkMarketStatus,
            60000
        );




        return () => clearInterval(interval);

    }, []);





    const topGainers = [

        {
            image: hdfc,
            name: "HDFCBANK",
            price: "1,678.90",
            change: "+1.37%",
        },

        {
            image: reliance,
            name: "RELIANCE",
            price: "2,843.75",
            change: "+1.73%",
        },

        {
            image: tcs,
            name: "TCS",
            price: "3,543.50",
            change: "+1.63%",
        },

        {
            image: adani,
            name: "ADANIGREEN",
            price: "1,402.35",
            change: "+1.23%",
        },

    ];





    return (

        <div className="p-5 mt-5 md:m-12">




            <div className="grid xl:grid-cols-2 gap-8">




                <div className="bg-black/30 border border-white/10 backdrop-blur-xl rounded-3xl p-6 lg:p-8">



                    <div className="grid lg:grid-cols-2 gap-8 items-center">




                        <div className="flex justify-center lg:mt-10">





                            <div
                                onMouseMove={handleMouseMoveCardnew}
                                onMouseLeave={resetRotateCardnew}
                                className=" rounded-3xl transition-transform duration-100 cursor-pointer"
                                style={{
                                    transform: `perspective(1000px) rotateY(${rotateCardnew.y}deg)`,
                                    transformStyle: "preserve-3d",
                                }}
                            >

                                <img
                                    src={phone1}
                                    alt="Phone"
                                    className="w-72 md:w-80 object-contain drop-shadow-2xl"
                                />

                            </div>

                        </div>

                        <div>



                            <p
                                className="text-[#d8b45c] text-2xl md:text-3xl"
                                style={{ fontFamily: "Playfair Display" }}
                            >
                                Banking At Your Fingertips
                            </p>





                            <div className="mt-8 space-y-5">



                                <div className="flex items-center gap-4">

                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-fingerprint text-[#d8b45c]"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3" /><path d="M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6" /><path d="M12 11v2a14 14 0 0 0 2.5 8" /><path d="M8 15a18 18 0 0 0 1.8 6" /><path d="M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95" /></svg>

                                    <p className="text-gray-300">
                                        Secure Login with Biometrics
                                    </p>

                                </div>





                                <div className="flex items-center gap-4">

                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-transaction-rupee text-[#d8b45c]"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M21 12h-6h1a3 3 0 0 1 0 6h-1l3 3" /><path d="M15 15h6" /><path d="M3 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M7 5h8" /><path d="M7 5v8a3 3 0 0 0 3 3h1" /></svg>

                                    <p className="text-gray-300">
                                        Instant Transfers
                                    </p>

                                </div>





                                <div className="flex items-center gap-4">

                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-receipt text-[#d8b45c]">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2" />
                                    </svg>

                                    <p className="text-gray-300">
                                        Bill Payments
                                    </p>

                                </div>





                                <div className="flex items-center gap-4">

                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-check text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /> <path d="M6 21v-2a4 4 0 0 1 4 -4h4" /> <path d="M15 19l2 2l4 -4" /></svg>
                                    <p className="text-gray-300">
                                        Account Management
                                    </p>

                                </div>





                                <div className="flex items-center gap-4">

                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock-24 text-[#d8b45c] "> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 12a9 9 0 0 0 5.998 8.485m12.002 -8.485a9 9 0 1 0 -18 0" /> <path d="M12 7v5" /> <path d="M12 15h2a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-1a1 1 0 0 0 -1 1v1a1 1 0 0 0 1 1h2" /> <path d="M18 15v2a1 1 0 0 0 1 1h1" /> <path d="M21 15v6" /></svg>

                                    <p className="text-gray-300">
                                        24/7 Access
                                    </p>

                                </div>

                            </div>





                            <div className="mt-14">

                                <p className="text-[#d8b45c] text-lg font-medium">
                                    Banking Without Limits
                                </p>

                                <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                                    Tailored Wealth Management • Global Priority Access • Exclusive Member Privileges
                                </p>

                            </div>



                        </div>

                    </div>

                </div>







                <div className="bg-black/30 border border-white/10 backdrop-blur-xl rounded-3xl p-6 lg:p-8">



                    <h2
                        className="text-[#d8b45c] text-3xl font-medium mb-6"
                        style={{ fontFamily: "Playfair Display" }}
                    >
                        Insights That Matter
                    </h2>






                    <div className="flex gap-3 mb-8 flex-wrap">

                        {tabs.map((tab) => (

                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-300 cursor-pointer ${activeTab === tab
                                    ? "border border-[#d8b45c] text-[#d8b45c]"
                                    : "bg-white/5 text-white hover:bg-white/10"
                                    }`}
                            >

                                {tab}

                            </button>

                        ))}

                    </div>






                    <div className="grid lg:grid-cols-2 gap-6">




                        <div className="bg-black/40 rounded-2xl border border-white/5 p-5">

                            <div className="flex justify-between items-start">

                                <div>

                                    <p className="text-gray-400 text-sm">
                                        NIFTY 50
                                    </p>

                                    <h1 className="text-white text-3xl font-semibold mt-2">
                                        22,530.70
                                    </h1>

                                    <p className="text-green-400 mt-2 font-medium">
                                        ▲ 1.38% (300.20)
                                    </p>

                                </div>



                                <div>

                                    <p className={status === "open"
                                        ? "text-green-500 font-medium"
                                        : "text-red-500 font-medium"}>

                                        {status === "open"
                                            ? "Market Open"
                                            : "Market Closed"}

                                    </p>

                                </div>

                            </div>






                            <div className="h-30 mt-8">

                                <ResponsiveContainer width="100%" height="100%">

                                    <AreaChart data={chartData}>

                                        <defs>

                                            <linearGradient id="colorNifty" x1="0" y1="0" x2="0" y2="1">

                                                <stop
                                                    offset="0%"
                                                    stopColor="#22c55e"
                                                    stopOpacity={0.6}
                                                />

                                                <stop
                                                    offset="100%"
                                                    stopColor="#22c55e"
                                                    stopOpacity={0.05}
                                                />

                                            </linearGradient>

                                        </defs>





                                        <Area
                                            type="natural"
                                            dataKey="value"
                                            stroke="#22c55e"
                                            strokeWidth={3.5}
                                            fill="url(#colorNifty)"
                                            dot={false}
                                        />



                                        <XAxis hide />
                                        <YAxis hide />

                                    </AreaChart>

                                </ResponsiveContainer>

                            </div>

                        </div>







                        <div className="bg-black/40 rounded-2xl border border-white/5 p-5">



                            <div className="flex justify-between items-center mb-8">

                                <h3 className="text-white text-xl font-semibold">
                                    Top Gainers
                                </h3>



                                <div className="w-12 h-12 cursor-pointer hover:scale-105 rounded-2xl bg-linear-to-br from-[#d8b45c]/20 to-[#d8b45c]/5 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chart-line text-[#d8b45c] w-8 "> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M4 19l16 0" /> <path d="M4 15l4 -6l4 2l4 -5l4 4" /></svg>
                                </div>

                            </div>





                            <div className="space-y-5">

                                {topGainers.map((stock, index) => (

                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >




                                        <div className="flex items-center gap-4">

                                            <div className="w-10 h-10 rounded-full overflow-hidden">

                                                <img
                                                    src={stock.image}
                                                    alt={stock.name}
                                                    className="w-full h-full object-cover"
                                                />

                                            </div>



                                            <div>

                                                <p className="text-white font-medium">
                                                    {stock.name}
                                                </p>

                                                <p className="text-gray-500 text-sm">
                                                    NSE • Today
                                                </p>

                                            </div>

                                        </div>





                                        <div className="text-right">

                                            <p className="text-white font-semibold">
                                                {stock.price}
                                            </p>

                                            <p className="text-green-400 text-sm font-medium">
                                                {stock.change}
                                            </p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>






                    <div className="mt-8 flex justify-center">

                        <button className="flex items-center gap-3 text-[#d8b45c] hover:text-[#f1da92] transition-all font-medium cursor-pointer">

                            View More Insights

                            <span className="text-xl">
                                →
                            </span>

                        </button>

                    </div>

                </div>

            </div>

        </div >

    );

}

export default MarketChart;