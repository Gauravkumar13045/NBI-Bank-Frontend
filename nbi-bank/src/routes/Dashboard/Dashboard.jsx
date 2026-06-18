import React, { useState } from "react";
import Logo from "../../images/logo/logo-nbi-new.png";
import rain from "../../images/rainy.png";
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    RadialBarChart, RadialBar
} from "recharts";
import CircularProgress from "../../components/CircularProgress";





function Dashboard() {

    const [focusedField, setFocusedField] = useState("");
    const data = [{ balance: 20 }, { balance: 35 }, { balance: 25 }, { balance: 45 }, { balance: 38 }, { balance: 60 },];
    const valueRewardPercent = 14820;
    const rewardPercentage = (valueRewardPercent / 20000) * 100;








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

                <div className="cursor-pointer border-2  border-[#d8b45c] bg-[#d8b45c] rounded-full p-2 hover:scale-108 transition-all duration-200 hover:bg-[#eac464]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-line-scan w-10 text-black cursor-pointer "> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M7 12h10" /> <path d="M3 7v-2a2 2 0 0 1 2 -2h2" /> <path d="M3 17v2a2 2 0 0 0 2 2h2" /> <path d="M17 3h2a2 2 0 0 1 2 2v2" /> <path d="M17 21h2a2 2 0 0 0 2 -2v-2" /></svg>

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





                <main className="flex-1 overflow-y-auto p-5">
                    <div className="mt-3 border border-[#494133] w-full p-5 rounded-lg backdrop-blur-md bg-white/5 md:text-left text-center">
                        <p className="text-[#d8b45c] text-xs font-semibold">ACCOUNTS OVERVIEW </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-5 p-5">
                            <div className="border border-[#494133] p-3 rounded-lg flex justify-between items-start">
                                <div className="text-center min-[400px]:text-left w-full min-[400px]:w-fit">
                                    <p className="text-[#d8b45c] text-sm font-medium">Saving Account</p>
                                    <p className="text-[#d8b45c] text-xs">XXXX 5678 9012</p><br></br>

                                    <p className="text-white text-xs">Available Balance</p>
                                    <p className="text-white text-lg font-medium"><span>₹ </span><span>56,23,252</span></p>

                                </div>
                                <div className="w-32 h-full ml-auto hidden min-[400px]:block">
                                    <div className="flex justify-end items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye w-5 text-[#d8b45c] ">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
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
                                    <p className="text-white text-lg font-medium"><span>₹ </span><span>12,98,223</span></p>

                                </div>
                                <div className="w-32 h-full ml-auto hidden min-[400px]:block">
                                    <div className="flex justify-end items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye w-5 text-[#d8b45c] ">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
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
                                    <p className="text-white text-lg font-medium"><span>₹ </span><span>69,21,475</span></p>

                                </div>
                                <div className="w-32 h-full ml-auto hidden min-[400px]:block ">
                                    <div className="flex justify-end items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye w-5 text-[#d8b45c] ">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
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
                </main>


            </div>

        </div>
    );
}

export default Dashboard;