import React, { useState, useEffect } from "react";
import Logo from "../../images/logo/logo-nbi-new.png";
import rain from "../../images/rainy.png";
import qrscanner from "../../images/icons8-qr-code.gif"
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import IncomeExpenseChart from "../../components/IncomeExpenseChart";
import CircularProgress from "../../components/CircularProgress";







function Dashboard() {

    const [focusedField, setFocusedField] = useState("");
    const data = [{ balance: 20 }, { balance: 35 }, { balance: 25 }, { balance: 45 }, { balance: 38 }, { balance: 60 },];
    const valueRewardPercent = 14820;
    const rewardPercentage = (valueRewardPercent / 20000) * 100;

    const [showSaving, setShowSaving] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNetWorth, setShowNetWorth] = useState(false);
    const [FocusedFieldSearch, setFocusedFieldSearch] = useState("");
    const [chartInfoDisplay, setChartInfoDisplay] = useState(false);




    const [TransactionState, SetTransactionState] = useState([]);
    const [LoadingState, SetLoadingState] = useState(true);
    const [error, seterror] = useState(null);

    useEffect(() => {

        const fetchTransactions = async () => {

            try {

                const response = await fetch("/transaction.json");

                if (!response.ok) {
                    throw new Error("Failed to fetch transactions");
                }

                const data = await response.json();

                SetTransactionState(data.transaction);

            } catch (err) {

                seterror(err.message);

            } finally {

                SetLoadingState(false);

            }

        };

        fetchTransactions();

    }, []);

















    return (
        <div className="h-screen bg-black flex">


            <aside className=" border-r border-white/10 hidden md:flex flex-col bg-black lg:w-60 w-30">


                <div className="flex justify-center pt-6">
                    <img
                        src={Logo}
                        alt="NBI - National Bank of India"
                        className="lg:w-40 w-20 object-contain cursor-pointer"
                    />
                </div>


                <div className="flex-1 flex flex-col justify-center px-4 space-y-3">

                    <div className="flex items-center gap-3 px-4 py-3   rounded-xl bg-[#d8b45c]/10 border-l-2 border-[#d8b45c] shadow-[0_0_25px_rgba(216,180,92,0.15)] cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" /> <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" /> <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" /> <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" /> </svg>
                        <p className="text-white hidden lg:flex  font-medium text-md">Dashboard</p>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-building-bank w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 21l18 0" /> <path d="M3 10l18 0" /> <path d="M5 6l7 -3l7 3" /> <path d="M4 10l0 11" /> <path d="M20 10l0 11" /> <path d="M8 14l0 3" /> <path d="M12 14l0 3" /> <path d="M16 14l0 3" /></svg>
                        <p className="text-white  hidden lg:flex  font-medium text-md">Banking</p>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-credit-card-pay w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 19h-6a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" /> <path d="M3 10h18" /> <path d="M16 19h6" /> <path d="M19 16l3 3l-3 3" /> <path d="M7.005 15h.005" /> <path d="M11 15h2" /></svg>
                        <p className="text-white  hidden lg:flex  text-md font-medium">Payments</p>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-moneybag-heart w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M9.5 3h5a1.5 1.5 0 0 1 1.5 1.5a3.5 3.5 0 0 1 -3.5 3.5h-1a3.5 3.5 0 0 1 -3.5 -3.5a1.5 1.5 0 0 1 1.5 -1.5" /> <path d="M11.5 21h-3.5a4 4 0 0 1 -4 -4v-1a8 8 0 0 1 14.376 -4.833" /> <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.24 2.24 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.24 2.24 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296" /></svg>
                        <p className="text-white  hidden lg:flex  text-md font-medium">Wealth</p>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>
                        <p className="text-white  hidden lg:flex  text-md font-medium">Account</p>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-lock-square-rounded w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 3c7.2 0 9 1.8 9 9c0 7.2 -1.8 9 -9 9c-7.2 0 -9 -1.8 -9 -9c0 -7.2 1.8 -9 9 -9" /> <path d="M8 12a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1l0 -3" /> <path d="M10 11v-2a2 2 0 1 1 4 0v2" /></svg>
                        <p className="text-white  hidden lg:flex  text-md font-medium">Security</p>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-settings w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" /> <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
                        <p className="text-white  hidden lg:flex  text-md font-medium">Settings</p>
                    </div>


                </div>

                <div className="flex items-center ml-10 gap-3  py-3 rounded-xl cursor-pointer hover:bg-red-500/10 transition-all duration-300">

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-logout w-7  cursor-pointer text-red-500 ">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M9 12h12l-3 -3" />
                        <path d="M18 15l3 -3" />
                    </svg>

                    <p className="text-red-500 text-sm font-medium  hidden lg:flex ">
                        Logout
                    </p>

                </div>

            </aside>





            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 w-full h-20 bg-black border-t border-white/10 md:hidden flex items-center justify-around z-50">

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard w-7 text-[#d8b45c] cursor-pointer"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" /> <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" /> <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" /> <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" /> </svg>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-building-bank w-7 text-[#d8b45c] cursor-pointer"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 21l18 0" /> <path d="M3 10l18 0" /> <path d="M5 6l7 -3l7 3" /> <path d="M4 10l0 11" /> <path d="M20 10l0 11" /> <path d="M8 14l0 3" /> <path d="M12 14l0 3" /> <path d="M16 14l0 3" /></svg>

                <div className="cursor-pointer border-2  border-white bg-[#FFFFFF] rounded-full p-2 hover:scale-108 transition-all duration-200 hover:border-[#d8b45c] hover:border-2">
                    <img src={qrscanner} className="w-10" />
                </div>


                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle w-7 text-[#d8b45c] cursor-pointer"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-settings w-7 text-[#d8b45c] cursor-pointer"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" /> <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>


            </nav>




            {/* Main Area */}
            <div className="flex-1 flex flex-col">




                {/* Header */}
                <header className=" border-b border-white/10 grid grid-cols-[1.5fr_0fr_0fr] md:grid-cols-[1.5fr_0fr_1.5fr] lg:grid-cols-[1fr_1fr_2fr] p-3">

                    <div className="flex items-center md:hidden">
                        <img
                            src={Logo}
                            alt="NBI - National Bank of India"
                            className=" w-30  mt-2 ml-2 object-contain cursor-pointer"
                        />
                    </div>
                    <div className="mt-2 ml-6  hidden md:block">
                        <p className="text-white text-sm leading-tight font-normal hidden md:block">Dashboard</p>
                        <p className="text-white md:text-xl text-lg " style={{ fontFamily: "Playfair Display" }}>Welcome Back, <span className="text-[#d8b45c] ">Gaurav</span></p>






                    </div>


                    <div className="flex items-center justify-center w-full max-w-sm mx-auto">
                        <div className="relative w-full">

                            <span className="absolute inset-y-0 left-3 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`w-5 transition-colors duration-300 hidden lg:block cursor-pointer ${focusedField === "search"
                                        ? "text-[#d8b45c]"
                                        : "text-gray-400"
                                        }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                    <path d="M21 21l-6 -6" />
                                </svg>
                            </span>


                            <input
                                type="search"
                                placeholder="Search transactions, beneficiaries, cards..."
                                onFocus={() => setFocusedField("search")}
                                onBlur={() => setFocusedField("")}
                                className=" hidden lg:block w-full border border-white/40 rounded-full text-white text-sm pl-10 pr-4 py-2.5 bg-black/20 placeholder:text-gray-500 transition-all duration-300 focus:outline-none focus:border-[#d8b45c] focus:shadow-[0_0_15px_rgba(216,180,92,0.2)] cursor-pointer hover:border-[#d8b45c]/40 hover:shadow-[0_0_20px_rgba(216,180,92,0.15)]"
                            />

                        </div>
                    </div>



                    <div className=" flex items-center justify-center  ">

                        <div className="gap-4 md:gap-6  flex border-r-[0.1px] md:border-r-gray-700 pl-5 pr-5">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search text-gray-100 w-6 hover:text-[#d8b45c] block lg:hidden cursor-pointer">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                <path d="M21 21l-6 -6" />
                            </svg>

                            <div className="flex flex-col items-center justify-center cursor-pointer group">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bell text-gray-100 w-6 group-hover:text-[#d8b45c] "> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /> <path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
                                <p className="text-gray-400 text-xs mt-0.5 group-hover:text-[#d8b45c] hidden lg:block">Notifications</p>
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-menu-2 text-gray-100 w-6 hover:text-[#d8b45c] block lg:hidden">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 6l16 0" />
                                <path d="M4 12l16 0" />
                                <path d="M4 18l16 0" />
                            </svg>

                            <div className=" flex-col items-center justify-center group cursor-pointer hidden md:flex">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail text-gray-100 w-6 group-hover:text-[#d8b45c] " > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" /> <path d="M3 7l9 6l9 -6" /></svg>
                                <p className="text-gray-400 text-xs group-hover:text-[#d8b45c] hidden lg:block">Messages</p>

                            </div>

                            <div className=" flex-col items-center justify-center group cursor-pointer hidden md:flex">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-headset text-gray-100 w-6 group-hover:text-[#d8b45c] "> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M4 14v-3a8 8 0 1 1 16 0v3" /> <path d="M18 19c0 1.657 -2.686 3 -6 3" /> <path d="M4 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3" /> <path d="M15 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3" /></svg>
                                <p className="text-gray-400 text-xs group-hover:text-[#d8b45c] hidden lg:block">Support</p>

                            </div>
                        </div>

                        <div className=" items-center hidden md:flex ">
                            <img
                                src={rain}
                                alt="Profile"
                                className="w-14 h-14  object-cover rounded-full border-2 border-[#d8b45c] ml-5"
                            />
                            <div className="ml-3  flex-col justify-center lg:block hidden ">
                                <p className=" text-white text-sm font-semibold ml-1 lg:block hidden">Gaurav Kumar</p>
                                <div className="inline-flex items-center border cursor-pointer hover:shadow-[0_0_15px_rgba(216,180,92,0.3)] border-[#d8b45c] rounded-full px-1.5 py-0.5 mt-2  text-xs w-max"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-crown text-[#d8b45c] w-5 "> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4l4 -6" /> </svg>
                                    <p className="text-[#d8b45c] ml-1 text-[10px] ">NBI Premium Client</p>
                                </div>


                            </div>


                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-5 h-5  cursor-pointer hidden md:flex ml-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>


                        </div>

                    </div>


                </header>





                <main className="flex-1 overflow-y-auto p-5 scrollbar-none">
                    <div className="mt-3 border border-[#494133] w-full p-5 rounded-lg backdrop-blur-md bg-white/5 md:text-left text-center">
                        <p className="text-[#d8b45c] text-xs font-semibold">ACCOUNTS OVERVIEW </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-5 p-5">
                            {/* <div className="md:grid flex flex-cols-1 md:grid-cols-2 md:xl:grid-cols-4 md:gap-5 md:p-5 h-25 md:h-max md:overflow-none"> */}

                            <div className="border border-[#494133] p-3 rounded-lg flex justify-between items-start">
                                <div className="text-center min-[400px]:text-left w-full min-[400px]:w-fit">
                                    <p className="text-[#d8b45c] text-sm font-medium">Saving Account</p>
                                    <p className="text-[#d8b45c] text-xs">XXXX 5678 9012</p><br></br>

                                    <p className="text-white text-xs">Available Balance</p>
                                    <p className="text-white text-lg font-medium "><span>₹&nbsp;</span><span className={`${showSaving ? "inline-block align-top" : "inline-flex align-middle"}`}>{showSaving ? "56,23,252" : "********"}</span></p>


                                </div>
                                <div className="w-32 h-full ml-auto hidden min-[400px]:block">
                                    <div className="flex justify-end items-center gap-1">

                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowSaving(!showSaving) }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-eye w-5 text-[#d8b45c] cursor-pointer ${showSaving ? "block" : "hidden"}`}>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowSaving(!showSaving) }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-eye-off  w-5 text-[#d8b45c] cursor-pointer ${showSaving ? "hidden" : "block"}`}>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                                            <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                                            <path d="M3 3l18 18" />
                                        </svg>

                                        <p className="text-green-500  rounded-full  pl-2 pr-2 font-medium bg-[#0E1A12] m-1 text-sm float-right">Active</p>

                                    </div>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={data}
                                            margin={{
                                                top: 20,
                                                right: 10,
                                                left: 0,
                                                bottom: 25
                                            }}
                                        >
                                            <defs>
                                                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#d8b45c" stopOpacity={0.35} />
                                                    <stop offset="100%" stopColor="#d8b45c" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>

                                            <Area
                                                type="natural"
                                                dataKey="balance"
                                                stroke="#E2D17F"
                                                strokeWidth={2}
                                                fill="url(#goldGradient)"

                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>



                            </div>

                            <div className="border border-[#494133] p-3 rounded-lg flex justify-between items-start">
                                <div className="text-center min-[400px]:text-left w-full min-[400px]:w-fit">
                                    <p className="text-[#d8b45c] text-sm font-medium">Current Account</p>
                                    <p className="text-[#d8b45c] text-xs">XXXX 6549 5187</p><br></br>

                                    <p className="text-white text-xs">Available Balance</p>
                                    <p className="text-white text-lg font-medium "><span>₹&nbsp;</span><span className={`${showCurrent ? "inline-block align-top" : "inline-flex align-middle"}`}>{showCurrent ? "12,98,223" : "********"}</span></p>

                                </div>
                                <div className="w-32 h-full ml-auto hidden min-[400px]:block">
                                    <div className="flex justify-end items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowCurrent(!showCurrent) }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-eye w-5 text-[#d8b45c] cursor-pointer ${showCurrent ? "block" : "hidden"}`}>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowCurrent(!showCurrent) }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-eye-off  w-5 text-[#d8b45c] cursor-pointer ${showCurrent ? "hidden" : "block"}`}>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                                            <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                                            <path d="M3 3l18 18" />
                                        </svg>

                                        <p className="text-green-500  rounded-full  pl-2 pr-2 font-medium bg-[#0E1A12] m-1 text-sm float-right">Active</p>

                                    </div>
                                    <ResponsiveContainer >
                                        <AreaChart
                                            data={data}
                                            margin={{
                                                top: 20,
                                                right: 10,
                                                left: 0,
                                                bottom: 25
                                            }}
                                        >
                                            <defs>
                                                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#d8b45c" stopOpacity={0.35} />
                                                    <stop offset="100%" stopColor="#d8b45c" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>

                                            <Area
                                                type="natural"
                                                dataKey="balance"
                                                stroke="#E2D17F"
                                                strokeWidth={2}
                                                fill="url(#goldGradient)"

                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>



                            </div>

                            <div className="border border-[#494133] p-3 rounded-lg flex justify-between items-start">
                                <div className="text-center min-[400px]:text-left w-full min-[400px]:w-fit">
                                    <p className="text-[#d8b45c] text-sm font-medium"> Reward Points</p>


                                    <p className="text-white text-sm font-medium mt-1"><span>{valueRewardPercent}</span> / <span className="text-[#d8b45c]">20,000</span><span className="text-[#d8b45c] text-xs"> Pts</span></p>
                                    <button
                                        disabled={valueRewardPercent < 20000}
                                        className={`w-full p-2 mt-5 rounded-full text-xs font-medium border transition-all
                                               ${valueRewardPercent >= 20000
                                                ? "text-green-500 border-green-900 bg-[#0E1A12] hover:bg-[#0b180f] cursor-pointer hover:scale-102"
                                                : "text-gray-500 border-gray-700 bg-[#111111] cursor-not-allowed opacity-60"
                                            }`}
                                    >
                                        Redeem Now
                                    </button>
                                </div>
                                <div className=" h-full ml-auto hidden min-[400px]:block">

                                    <CircularProgress
                                        percentage={rewardPercentage}
                                        size={100}
                                        strokeWidth={10}
                                    />






                                </div>



                            </div>

                            <div className="border border-[#494133] p-3 rounded-lg flex justify-between items-start">
                                <div className="text-center min-[400px]:text-left w-full min-[400px]:w-fit">
                                    <p className="text-[#d8b45c] text-sm font-medium">Total Net Worth </p>
                                    <p className="text-[#d8b45c] text-xs">XXXX 5678 9012</p><br></br>

                                    <p className="text-white text-xs">Available Balance</p>
                                    <p className="text-white text-lg font-medium"><span >₹&nbsp;</span><span className={`${showNetWorth ? "inline-block align-top" : "inline-flex align-middle"}`}>{showNetWorth ? "69,21,475" : "********"}</span></p>

                                </div>
                                <div className="w-32 h-full ml-auto hidden min-[400px]:block ">
                                    <div className="flex justify-end items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowNetWorth(!showNetWorth) }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-eye w-5 text-[#d8b45c] cursor-pointer ${showNetWorth ? "block" : "hidden"}`}>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowNetWorth(!showNetWorth) }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-eye-off  w-5 text-[#d8b45c] cursor-pointer ${showNetWorth ? "hidden" : "block"}`}>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                                            <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                                            <path d="M3 3l18 18" />
                                        </svg>

                                        <p className="text-green-500  rounded-full  pl-2 pr-2 font-medium bg-[#0E1A12] m-1 text-sm float-right">Active</p>

                                    </div>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={data}
                                            margin={{
                                                top: 20,
                                                right: 10,
                                                left: 0,
                                                bottom: 25
                                            }}
                                        >
                                            <defs>
                                                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#d8b45c" stopOpacity={0.35} />
                                                    <stop offset="100%" stopColor="#d8b45c" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>

                                            <Area
                                                type="natural"
                                                dataKey="balance"
                                                stroke="#E2D17F"
                                                strokeWidth={2}
                                                fill="url(#goldGradient)"

                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>



                            </div>
                        </div>
                    </div>
                    <div className="mt-3 border border-[#494133] w-full p-5 pr-10 rounded-lg backdrop-blur-md bg-white/5">
                        <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] p-2 gap-5  ">
                            <div className="border border-[#494133] p-3 rounded-lg  ">
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-white font-medium text-lg">Recent Transactions</p>
                                    <div className="flex gap-2 group">
                                        <button className="text-[#d8b45c] font-medium text-sm group-hover:cursor-pointer group-hover:text-[#fcd36c] group-hover:scale-105 group-transition-all group-duration-300">View All</button>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right w-5 text-[#d8b45c] group-hover:cursor-pointer group-hover:text-[#fcd36c] group-hover:scale-105 group-transition-all group-duration-300" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M5 12l14 0" /> <path d="M13 18l6 -6" /> <path d="M13 6l6 6" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical w-5 text-[#d8b45c] ml-4 "> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M11 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M11 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                                    </div>


                                </div>
                                <div className="flex justify-between w-full items-center gap-2 mt-3">

                                    <div className="hidden sm:flex gap-2">
                                        <button className="text-white border rounded-lg pr-3 text-center pl-3 p-2 border-[#494133] bg-transparent text-sm hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold  transition-all duration-300 cursor-pointer">All</button>
                                        <button className="text-white border rounded-lg pr-3 text-center pl-3 p-2 border-[#494133] bg-transparent text-sm hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold transition-all duration-300 cursor-pointer">Credit</button>
                                        <button className="text-white border rounded-lg pr-3 text-center pl-3 p-2 border-[#494133] bg-transparent text-sm hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold transition-all duration-300 cursor-pointer">Debit</button>
                                        <button className="text-white border rounded-lg pr-3 text-center pl-3 p-2 border-[#494133] bg-transparent text-sm hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold transition-all duration-300 cursor-pointer">UPI</button>
                                    </div>


                                    <div className="relative  group hidden sm:flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search w-5 text-gray-500 group-focus-within:text-[#d8b45c] absolute mt-2 ml-2 ">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                            <path d="M21 21l-6 -6" />
                                        </svg>
                                        <input type="search" onFocus={() => setFocusedFieldSearch("search")} onBlur={() => setFocusedFieldSearch("")} className="border border-[#494133] w-full p-1 pl-10 text-white placeholder:text-gray-500 placeholder:text-sm rounded-xl hover:shadow-[0_0_10px_rgba(216,180,92,0.2)] transition-all duration-300 active:border-[#d8b45c] focus:outline-none focus:border-[#d8b45c] focus:shadow-[0_0_7px_rgba(216,180,92,0.2)]" placeholder="Search transactions..."></input>

                                    </div>

                                    <div className="flex sm:hidden mr-auto gap-3  ">

                                        <div className="flex items-center border border-[#494133] bg-transparent text-sm rounded-lg hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold  transition-all duration-300 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-filter  w-5 text-[#d8b45c] flex sm:hidden mx-auto relative pl-1"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227" /></svg>
                                            <button className="text-white  rounded-lg pr-3 text-center pl-1 p-2 border-[#494133] bg-transparent text-sm hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold  transition-all duration-300 cursor-pointer">Filter</button>
                                        </div>

                                        <div className="flex items-center border border-[#494133] bg-transparent text-sm rounded-lg hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold  transition-all duration-300 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search w-5 group-focus-within:text-[#d8b45c] flex sm:hidden text-[#d8b45c] relative pl-1"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                                            <button className="text-white  rounded-lg pr-3 text-center pl-1 p-2  bg-transparent text-sm hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold  transition-all duration-300 cursor-pointer">Search</button>

                                        </div>


                                    </div>
                                </div>


                                <div className="text-white h-70  mt-4  overflow-scroll scrollbar-none border-t border-[#494133] cursor-pointer">
                                    {LoadingState ? (
                                        <p className="text-gray-400 text-sm p-4">
                                            Loading transactions...
                                        </p>
                                    ) : error ? (
                                        <p className="text-red-500 text-sm p-4">
                                            {error}
                                        </p>
                                    ) : (
                                        TransactionState.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center p-3">

                                                <div className="flex gap-4">
                                                    <div
                                                        className="w-10 h-10 rounded-lg overflow-hidden shadow-[0_0_3px_rgba(216,180,92,0.2)]"
                                                        dangerouslySetInnerHTML={{ __html: item.img }}
                                                    />

                                                    <div>
                                                        <p className="text-sm font-medium">{item.PaymentName}</p>
                                                        <p className="text-xs text-gray-400">
                                                            {item.PaymentDate} • {item.PaymentTime}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="bg-[#231A0B] rounded-xl px-3 py-1 hidden sm:block">
                                                    <p className="text-sm">{item.Categories}</p>
                                                </div>

                                                <div>
                                                    <p
                                                        className={
                                                            item.Type === "credit"
                                                                ? "text-green-500 font-medium"
                                                                : "text-red-500 font-medium"
                                                        }
                                                    >
                                                        {item.Type === "credit" ? "+" : "-"} ₹ {item.PaymentAmount}
                                                    </p>
                                                </div>

                                            </div>
                                        ))
                                    )}
                                </div>





                            </div>

                            <div className="border border-[#494133] p-4 rounded-xl">
                                <h2 className="text-[#d8b45c] font-semibold text-lg mb-4">
                                    QUICK ACTIONS
                                </h2>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 ">

                                    {[
                                        {
                                            title: "Transfer Money",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-transfer-up-down w-6 rotate-90 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M7 3v18" /> <path d="M20 6l-3 -3l-3 3" /> <path d="M10 18l-3 3l-3 -3" /> <path d="M17 3v18" /></svg>

                                            ),
                                        },
                                        {
                                            title: "Pay Bills",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-receipt w-6 text-[#d8b45c]">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2" />
                                                </svg>
                                            ),
                                        },
                                        {
                                            title: "Mobile Recharge",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-device-mobile-dollar w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M13 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v5" /> <path d="M11 4h2" /> <path d="M12 17v.01" /> <path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" /> <path d="M19 21v1m0 -8v1" /> </svg>
                                            ),
                                        },
                                        {
                                            title: "Scan & Pay",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-scan w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M5 12h14" /> <path d="M3 7v-2a2 2 0 0 1 2 -2h2" /> <path d="M3 17v2a2 2 0 0 0 2 2h2" /> <path d="M17 3h2a2 2 0 0 1 2 2v2" /> <path d="M17 21h2a2 2 0 0 0 2 -2v-2" /></svg>
                                            ),
                                        },
                                        {
                                            title: "UPI Payments",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#D8B45C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 rotate-90"><path d="M6 18L11 6L18 13" /><path d="M11 18L16 6L22 13" /></svg>
                                            ),
                                        },
                                        {
                                            title: "International Transfer",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-world w-6 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /> <path d="M3.6 9h16.8" /> <path d="M3.6 15h16.8" /> <path d="M11.5 3a17 17 0 0 0 0 18" /> <path d="M12.5 3a17 17 0 0 1 0 18" /></svg>
                                            ),
                                        },
                                        {
                                            title: "Add Beneficiary",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user w-6 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                                            ),
                                        },
                                        {
                                            title: "Schedule Payment",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock-dollar w-6 text-[#d8b45c]"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20.866 10.45a9 9 0 1 0 -7.815 10.488" /><path d="M12 7v5l1.5 1.5" /><path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" /><path d="M19 21v1m0 -8v1" /></svg>
                                            ),
                                        },
                                        {
                                            title: "Cheque Book",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-article w-6 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 6a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -12" /> <path d="M7 8h10" /> <path d="M7 12h10" /> <path d="M7 16h10" /></svg>
                                            ),
                                        },
                                        {
                                            title: "Fixed Deposit",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-mailgun w-6 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M17 12a2 2 0 1 0 4 0a9 9 0 1 0 -2.987 6.697" /> <path d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" /> <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                                            ),
                                        },
                                        {
                                            title: "Recurring Deposit",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chart-donut-2 w-6 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 3v5m4 4h5" /> <path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
                                            ),
                                        },
                                        {
                                            title: "Statement",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download w-6 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /> <path d="M7 11l5 5l5 -5" /> <path d="M12 4l0 12" /></svg>
                                            ),
                                        },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="border border-[#494133] rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#d8b45c] hover:bg-[#d8b45c]/5 transition-all duration-300 hover:scale-105"
                                        >
                                            <div className="text-[#d8b45c]">
                                                {item.icon}
                                            </div>

                                            <p className="text-white text-xs text-center leading-tight">
                                                {item.title}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="mt-3 grid grid-col-2 border border-[#494133] w-full p-5 pr-10 rounded-lg backdrop-blur-md bg-white/5 gap-2">

                        <p className="text-[#d8b45c] font-semibold ">Transaction Analytics</p>

                        <div className="grid grid-cols-[2fr_1fr] p-5 gap-4">


                            <div className=" grid-cols-3 w-full gap-3 xl:grid hidden">
                                <div className="border border-[#494133] rounded-lg p-3">
                                    <div className="flex gap-3">


                                        <div className="group relative flex mt-3 h-11 w-11 items-center justify-center align-middle rounded-2xl border text-green-500   transition-all duration-300 ">
                                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#d8b45c]/10 via-transparent to-[#d8b45c]/20 "></div>

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="relative z-10 h-8 w-8 text-green-500"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                                <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                                            </svg>
                                        </div>


                                        <div className="block text-white p-2">
                                            <p className="text-md font-semibold">
                                                Total Income
                                            </p>

                                            <p className="text-green-500 text-lg font-bold">
                                                <span> ₹</span> 69,21,475
                                            </p>

                                            <div className="mt-2 flex items-center gap-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={3}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-4 h-4 text-green-500"
                                                >
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <line x1="12" y1="19" x2="12" y2="5" />
                                                    <polyline points="5 12 12 5 19 12" />
                                                </svg>

                                                <p className="text-green-500 font-semibold text-xs">
                                                    12.4%
                                                </p>

                                                <span className="text-gray-400 text-xs">
                                                    vs last month
                                                </span>
                                            </div>
                                        </div>

                                    </div>

                                </div>








                                <div className="border border-[#494133] rounded-lg p-3">
                                    <div className="flex gap-3">


                                        <div className="group relative flex mt-3 h-11 w-11 items-center justify-center align-middle rounded-2xl border border-red-500  transition-all duration-300 ">
                                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#d8b45c]/10 via-transparent to-[#d8b45c]/20 "></div>

                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trending-down  h-7 w-7 text-red-500">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M3 7l6 6l4 -4l8 8" />
                                                <path d="M21 10l0 7l-7 0" />
                                            </svg>
                                        </div>


                                        <div className="block text-white p-2 ">
                                            <p className="text-md font-semibold">
                                                Total Expense
                                            </p>

                                            <p className="text-red-500 text-lg font-bold">
                                                <span> ₹</span> 21,65,231
                                            </p>

                                            <div className="mt-2 flex justify-center items-center gap-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={3}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-4 h-4 text-red-500 rotate-180"
                                                >
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <line x1="12" y1="19" x2="12" y2="5" />
                                                    <polyline points="5 12 12 5 19 12" />
                                                </svg>

                                                <p className="text-red-500 font-semibold text-xs">
                                                    23.6%
                                                </p>

                                                <span className="text-gray-400 text-xs">
                                                    vs last month
                                                </span>
                                            </div>

                                        </div>

                                    </div>

                                </div>


                                <div className="border border-[#494133] rounded-lg p-3 pr-0">
                                    <div className="flex gap-3">


                                        <div className="  group relative flex mt-3 h-11 w-11 items-center justify-center align-middle rounded-2xl border text-yellow-600   transition-all duration-300 ">
                                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#d8b45c]/10 via-transparent to-[#d8b45c]/20 "></div>

                                            <svg className="relative z-10 h-8 w-8 text-yellow-600" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="28" cy="10" r="0.8" /><circle cx="35" cy="6" r="0.8" /><circle cx="43" cy="8" r="0.8" /><circle cx="50" cy="6" r="0.8" /><circle cx="57" cy="10" r="0.8" /><circle cx="26" cy="17" r="0.8" /><circle cx="33" cy="14" r="0.8" /><circle cx="41" cy="15" r="0.8" /><circle cx="49" cy="14" r="0.8" /><circle cx="56" cy="17" r="0.8" /><circle cx="30" cy="22" r="0.8" /><circle cx="38" cy="20" r="0.8" /><circle cx="46" cy="20" r="0.8" /><circle cx="54" cy="22" r="0.8" /></g><circle cx="42" cy="28" r="14" stroke="currentColor" strokeWidth="3" fill="none" /><text x="42" y="35" fontFamily="Arial, Helvetica, sans-serif" fontSize="16" fontWeight="700" textAnchor="middle" fill="currentColor">$</text><g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M10 49L25 45L38 52" /><path d="M10 58L33 66L58 53" /><path d="M38 52L54 47C57 46 60 47 61 50C62 53 60 56 57 58L41 66" /><path d="M31 52L43 52" /></g><g fill="currentColor"><circle cx="28" cy="55" r="1" /><circle cx="31" cy="56" r="1" /><circle cx="34" cy="57" r="1" /><circle cx="37" cy="58" r="1" /></g></svg>
                                        </div>


                                        <div className="block text-white p-2">
                                            <p className="text-md font-semibold">
                                                Total Investment
                                            </p>

                                            <p className="text-yellow-600 text-lg font-bold">
                                                <span> ₹</span> 90,86,706
                                            </p>

                                            <div className="mt-2 flex items-center gap-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={3}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-4 h-4 text-yellow-600"
                                                >
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <line x1="12" y1="19" x2="12" y2="5" />
                                                    <polyline points="5 12 12 5 19 12" />
                                                </svg>




                                                <p className="text-yellow-600 font-semibold text-xs">
                                                    12.4%
                                                </p>

                                                <span className="text-gray-400 text-xs">
                                                    vs last month
                                                </span>
                                            </div>
                                        </div>

                                    </div>

                                </div>


                            </div>


                            <div className="  p-4 border border-[#494133] rounded-lg ">
                                <div>

                                </div>
                            </div>

                            <div className="border border-[#494133] p-4 rounded-lg">
                                <div className="flex items-center justify-between w-full">


                                    <div className="flex items-center gap-2">
                                        <p className="text-white font-medium">
                                            Income vs Expenses Overview
                                        </p>

                                        <div className="relative group">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 text-gray-500 cursor-pointer"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /> <path d="M12 9h.01" /> <path d="M11 12h1v4h1" /></svg>

                                            <div className="absolute left-0 top-7 hidden group-hover:block w-80 p-2 rounded-lg border border-[#544724] bg-black shadow shadow-[#544724] z-50">
                                                <p className="text-white text-xs">
                                                    Displays a comparison of your income and expenses over the selected period.
                                                </p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex items-center gap-1 border border-[#d8b45c] rounded-lg px-3 py-2 cursor-pointer">
                                        <button className="text-white text-xs">
                                            Chart Type
                                        </button>

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 text-yellow-500" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M6 9l6 6l6 -6" /> </svg>
                                    </div>

                                </div>

                                <div className="mt-5">
                                    <IncomeExpenseChart />

                                </div>



                            </div>
                        </div>







                    </div>
                </main>


            </div>

        </div>
    );
}

export default Dashboard;