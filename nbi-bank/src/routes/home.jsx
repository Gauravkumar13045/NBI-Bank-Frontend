import React, { useState } from "react";
import logo from "../images/logo/logo-nbi-new.png";
import heroImage from "../images/bg.png";



function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="bg-black min-h-screen font-sans">

            <header className="w-full bg-black backdrop-blur-md  sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="h-20 flex items-center justify-between">


                        <div className="flex items-center">
                            <img
                                src={logo}
                                alt="NBI - National Bank of India"
                                className=" w-35  md:40 mt-2  object-contain cursor-pointer"
                            />
                        </div>


                        <nav className="hidden lg:flex items-center gap-10 text-white font-medium font-mono text-lg">
                            <a href="#" className="hover:text-[#d8b45c] transition-all duration-300">Personal</a>
                            <a href="#" className="hover:text-[#d8b45c] transition-all duration-300">Business</a>
                            <a href="#" className="hover:text-[#d8b45c] transition-all duration-300">Wealth</a>
                            <a href="#" className="hover:text-[#d8b45c] transition-all duration-300">NRI</a>
                            <a href="#" className="hover:text-[#d8b45c] transition-all duration-300">Loans</a>
                            <a href="#" className="hover:text-[#d8b45c] transition-all duration-300">Digital Banking</a>
                        </nav>


                        <div className="flex items-center gap-4">

                            <button
                                className="px-3 md:px-7 cursor-pointer py-3 font-mono font-semibold rounded-lg  text-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                                style={{ background: "linear-gradient(to bottom, #fff4c9 0%, #f1da92 12%, #d8b45c 28%, #a97824 90%)", }}
                            >
                                Login
                            </button>


                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden rounded-lg p-2 transition-all duration-300 hover:scale-105 cursor-pointer"
                                style={{ background: "linear-gradient(to bottom, #fff4c9 0%, #f1da92 12%, #d8b45c 28%, #a97824 90%)", }}

                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={isMenuOpen ? "M6 18 18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>


                {isMenuOpen && (
                    <div className="lg:hidden w-full fixed"
                        style={{ background: "linear-gradient(to bottom, #fff4c9 0%, #f1da92 12%, #d8b45c 28%, #a97824 90%)", }}

                    >
                        <div className="px-6 py-8  flex flex-col gap-6 text-black text-lg font-bold font-mono ">
                            <a href="#" className="transition p-2 active:bg-[#d8b45c] hover:bg-[#d8b45c] hover:text-black hover:p-2 hover:rounded-lg hover:font-semibold rounded-lg">Personal</a>
                            <a href="#" className="active:bg-[#d8b45c] p-2 hover:bg-[#d8b45c] hover:text-black hover:p-2 hover:rounded-lg hover:font-semibold transition rounded-lg ">Business</a>
                            <a href="#" className="active:bg-[#d8b45c] p-2 hover:bg-[#d8b45c] hover:text-black hover:p-2 hover:rounded-lg hover:font-semibold transition rounded-lg">Wealth</a>
                            <a href="#" className="active:bg-[#d8b45c] p-2 hover:bg-[#d8b45c] hover:text-black hover:p-2 hover:rounded-lg hover:font-semibold transition rounded-lg">NRI</a>
                            <a href="#" className="active:bg-[#d8b45c] p-2 hover:bg-[#d8b45c] hover:text-black hover:p-2 hover:rounded-lg hover:font-semibold transition rounded-lg">Loans</a>
                            <a href="#" className="p-2 active:bg-[#d8b45c] hover:bg-[#d8b45c] hover:text-black hover:p-2 hover:rounded-lg hover:font-semibold transition rounded-lg">Digital Banking</a>
                            <a href="#" className="p-2 active:bg-[#d8b45c] hover:bg-[#d8b45c] hover:text-black hover:p-2 hover:rounded-lg hover:font-semibold transition rounded-lg">Support</a>
                        </div>
                    </div>
                )}
            </header>

            <div className="relative w-full h-screen">


                <img
                    src={heroImage}
                    alt=""
                    className="w-full h-full object-cover"
                />


                <div className="absolute inset-0 bg-black/50"></div>


                <div className="absolute top-65 left-5 sm:left-20 -translate-y-1/2 text-white z-10">

                    <h1 className=" text-3xl sm:text-5xl md:text-6xl leading-tight " style={{ fontFamily: "Playfair Display" }}>
                        India's Trusted<br></br>
                        Financial Partner<br></br>
                        For A Better <span className="text-[#d8b45c]" >Tomorrow</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-300 max-w-150 font-sans">
                        Experience premium banking with world-class <br className="hidden min-[450px]:block"></br>
                        services designed for your success.
                    </p>

                    <div className="flex ">

                        <button
                            className="mt-8  px-5 sm:px-8 min-[450px]:px-8 py-4 rounded-xl text-black font-semibold font-sans cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg text-xs min-[450px]:text-base"
                            style={{
                                background:
                                    "linear-gradient(to bottom, #fff4c9 0%, #f1da92 12%, #d8b45c 28%, #a97824 90%)",
                            }}
                        >
                            Open an Account
                        </button>

                        <button
                            className="mt-8  px-5 sm:px-8 min-[450px]:px-8 hover:text-[#d8b45c] active:text-[#d8b45c] ml-5  py-4 rounded-xl cursor-pointer font-semibold border-[#725f4a] border-2 text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg text-xs min-[450px]:text-base">
                            Explore Services
                        </button>
                    </div>

                </div>

            </div>


        </div>
    );
}

export default Home;


