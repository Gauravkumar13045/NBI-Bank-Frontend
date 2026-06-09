import React, { useState, useEffect } from "react";
import logo from "../images/logo/logo-nbi-new.png";
import heroImage from "../images/bg.png";
import phone from "../images/phone.png";
import blackFaceCard from "../images/cards/blackfacecard.png";
import BlackCard from "../images/cards/blackcard.png";
import GoldenCard from "../images/cards/goldencard.png";
import SilverCard from "../images/cards/silvercard.png";
import { motion } from "framer-motion";
import MarketWidget from "../components/MarketCard";








function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);



    const [rotate, setRotate] = useState({
        x: 0,
        y: 0,
    });

    const handleMouseMove = (e) => {

        const card = e.currentTarget;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 50;
        const rotateX = -((y - centerY) / centerY) * 50;

        setRotate({
            x: rotateX,
            y: rotateY,
        });
    };

    const resetRotate = () => {
        setRotate({
            x: 0,
            y: 0,
        });
    };



    const [rotateCard, setRotateCard] = useState({
        x: 0,
        y: 0,
    });

    const handleMouseMoveCard = (e) => {

        const card = e.currentTarget;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 50;
        const rotateX = -((y - centerY) / centerY) * 50;

        setRotateCard({
            x: rotateX,
            y: rotateY,
        });
    };

    const resetRotateCard = () => {
        setRotateCard({
            x: 0,
            y: 0,
        });
    };

    const cards = [
        {
            id: 0,
            image: BlackCard,
        },

        {
            id: 1,
            image: GoldenCard,
        },

        {
            id: 2,
            image: SilverCard,
        },
    ];

    const [active, setActive] = useState(1);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {

        if (isPaused) return;

        const interval = setInterval(() => {

            setActive((prev) => (prev + 1) % cards.length);

        }, 4000);

        return () => clearInterval(interval);

    }, [isPaused]);

    const getPosition = (index) => {

        const diff = (index - active + cards.length) % cards.length;



        // CENTER
        if (diff === 0) {

            return {
                x: 0,
                scale: 1,
                rotate: 0,
                zIndex: 30,
                opacity: 1,
            };

        }



        // RIGHT
        if (diff === 1) {

            return {
                x: 220,
                scale: 0.82,
                rotate: 12,
                zIndex: 10,
                opacity: 0.75,
            };

        }



        // LEFT
        return {

            x: -220,
            scale: 0.82,
            rotate: -12,
            zIndex: 10,
            opacity: 0.75,

        };

    };


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

            <div className="relative w-full h-screen ">


                <img
                    src={heroImage}
                    alt=""
                    className="w-full h-full object-cover "
                />


                <div className="absolute inset-0 bg-black/50"></div>


                <div className=" absolute top-65 left-5 sm:left-20 -translate-y-1/2 text-white z-10 ">


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


                <div className=" hidden xl:flex absolute justify-center items-center top-25 right-80 hover:z-1">

                    <div
                        onMouseMove={handleMouseMove}
                        onMouseLeave={resetRotate}
                        className=" rounded-3xl transition-transform duration-200 cursor-pointer"
                        style={{
                            transform: `perspective(1000px) rotateY(${rotate.y}deg)`,
                            transformStyle: "preserve-3d",
                        }}
                    >

                        <img
                            src={phone}
                            alt=""
                            className=" w-95  object-cover rounded-3xl shadow-2xl"
                        />

                    </div>

                </div>

                <div className="hidden xl:flex absolute justify-center items-center top-75 right-35 hover:z-1">

                    <div
                        onMouseMove={handleMouseMoveCard}
                        onMouseLeave={resetRotateCard}
                        className=" rounded-3xl transition-transform duration-200 cursor-pointer"
                        style={{
                            transform: `perspective(1000px) rotateY(${rotateCard.y}deg)`,
                            transformStyle: "preserve-3d",
                        }}
                    >

                        <img
                            src={blackFaceCard}
                            alt=""
                            className=" w-65  object-cover rounded-3xl shadow-2xl"
                        />

                    </div>

                </div>


                <div className="flex flex-wrap ">
                    <div className="absolute top-115 md:top-130 lg:top-140 text-xs md:text-base left-1/2 -translate-x-1/2 w-[95%] max-w-7x text-white border border-[#725f4a] rounded-2xl bg-white/0 backdrop-blur-md p-5 md:p-7 grid grid-cols-1 min-[305px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-5 gap-6">

                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 m-1 text-[#d8b45c] icon icon-tabler icons-tabler-outline icon-tabler-shield-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" /> <path d="M11 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M12 12l0 2.5" />
                            </svg>
                            <p className="m-1 ml-2 font-medium">
                                100+ Years <br /><span className="text-gray-300"> of Trust</span>
                            </p>
                        </div>



                        <div className="flex items-center ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" className="w-10 m-1 text-[#d8b45c] icon icon-tabler icons-tabler-outline icon-tabler-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245" />
                            </svg>

                            <p className="m-1 ml-2 font-medium">A+ Rating <br></br> <span className="text-gray-300">CRISIL & ICRA</span></p>
                        </div>


                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 m-1 text-[#d8b45c] font-light icon icon-tabler icons-tabler-outline icon-tabler-lock-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v.5" /> <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /> <path d="M8 11v-4a4 4 0 1 1 8 0v4" /> <path d="M15 19l2 2l4 -4" /></svg>


                            <p className="m-1 ml-2 font-medium">
                                Secure Banking <br></br><span className="text-gray-300"> 256-Bit Encryption</span>
                            </p>
                        </div>


                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-[#d8b45c] w-10 m-1 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                            </svg>

                            <p className="m-1 ml-2 font-medium">
                                RBI Regulated <br></br><span className="text-gray-300"> & Complaint</span>
                            </p>
                        </div>



                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 m-1 text-[#d8b45c] icon icon-tabler icons-tabler-outline icon-tabler-headset" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M4 14v-3a8 8 0 1 1 16 0v3" /> <path d="M18 19c0 1.657 -2.686 3 -6 3" /> <path d="M4 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3" /> <path d="M15 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3" /> </svg>

                            <p className="m-1 ml-2 font-medium">
                                24/7 Support <br></br><span className="text-gray-300"> Always Here</span>
                            </p>
                        </div>

                    </div>
                </div>





            </div>

            <div className="" style={{ background: "linear-gradient(to right, #0D0A02 0%, #0F0A03 5%, #100B04 10%, #0E0B04 20%, #0A0703 30%, #090603 40%, #080603 50%, #070502 60%, #080501 70%, #0E0A04 80%, #0E0A04 90%, #0A0804 100%)", }}>

                <h1 className="text-white text-center mt-45 min-[357px]:mt-10 md:mt-35 xl:mt-0  text-xl md:text-2xl xl:text-4xl " style={{ fontFamily: "Playfair Display" }}><span className="text-[#d8b45c] ">Banking Solutions </span>Tailored For You</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-5 gap-6 p-8 lg:p-20">


                    <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/0 hover:border-[#d8b45c]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#d8b45c]/10 cursor-pointer">

                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#d8b45c]/20 to-[#d8b45c]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#d8b45c]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"> <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /> <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /> <path d="M16 3.13a4 4 0 0 1 0 7.75" /> <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
                        </div>

                        <h3 className="text-white text-xl font-semibold mb-3">Personal Banking</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Smart Solutions for<br />your everyday needs.
                        </p>
                    </div>


                    <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/0 hover:border-[#d8b45c]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#d8b45c]/10 cursor-pointer">

                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#d8b45c]/20 to-[#d8b45c]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#d8b45c]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>
                        </div>

                        <h3 className="text-white text-xl font-semibold mb-3">Business Banking</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Powering Business of every size.
                        </p>
                    </div>


                    <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8  hover:bg-white/0 hover:border-[#d8b45c]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#d8b45c]/10 cursor-pointer">

                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#d8b45c]/20 to-[#d8b45c]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#d8b45c]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /> <path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" /> <path d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" /> <path d="M12 17v1m0 -8v1" /> </svg>
                        </div>

                        <h3 className="text-white text-xl font-semibold mb-3">Wealth <span className="text-lg">Management</span></h3>
                        <p className="text-gray-400 leading-relaxed">
                            Grow and Protect your wealth with experts.
                        </p>
                    </div>


                    <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/0 hover:border-[#d8b45c]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#d8b45c]/10 cursor-pointer">

                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#d8b45c]/20 to-[#d8b45c]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#d8b45c]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"> <path d="M3 21l18 0" /> <path d="M3 10l18 0" /> <path d="M5 6l7 -3l7 3" /> <path d="M4 10l0 11" /> <path d="M20 10l0 11" /> <path d="M8 14l0 3" /> <path d="M12 14l0 3" /> <path d="M16 14l0 3" /></svg>
                        </div>

                        <h3 className="text-white text-xl font-semibold mb-3">Loans</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Achieve your dreams with Flexible Loans.
                        </p>
                    </div>


                    <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/0 hover:border-[#d8b45c]/30 transition-all duration-500  hover:scale-105 hover:shadow-2xl hover:shadow-[#d8b45c]/10 cursor-pointer">

                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#d8b45c]/20 to-[#d8b45c]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition">

                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#d8b45c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M4 19l16 0" /> <path d="M4 15l4 -6l4 2l4 -5l4 4" /></svg>

                        </div>

                        <h3 className="text-white text-xl font-semibold mb-3">Investment</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Smart Investment for a secure future.
                        </p>
                    </div>



                </div>

                <div className="flex items-center justify-center space-x-1 ">
                    <h3 className="text-[#d8b45c] text-xl font-semibold cursor-pointer hover:text-[#f1da92] "> Explore All Services </h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-10 text-[#d8b45c] cursor-pointer hover:translate-x-2 "> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M5 12h.5m3 0h1.5m3 0h6" /> <path d="M15 16l4 -4" /> <path d="M15 8l4 4" /></svg>
                </div>



                <div className="p-5 mt-5 md:m-12">

                    <div className="bg-black/25 backdrop-blur-xl border border-white/10 rounded-3xl p-12">

                        <div className="grid lg:grid-cols-2 gap-10 items-center">

                            
                            <div>

                                <p
                                    className="text-white text-2xl md:text-4xl"
                                    style={{ fontFamily: "Playfair Display" }}
                                >
                                    Premium Cards <br />
                                    For Every Lifestyle
                                </p>

                                <p className="text-gray-300 mt-5 font-sans text-md leading-tight">
                                    Discover a range of exclusive credit cards
                                    <br />
                                    with unmatched benefits and rewards
                                </p>

                                <div className="flex items-center mt-10 space-x-1">

                                    <h3 className="text-[#d8b45c] text-md font-semibold cursor-pointer">
                                        View All Cards
                                    </h3>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-8 text-[#d8b45c] cursor-pointer hover:translate-x-2 transition"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M5 12h.5m3 0h1.5m3 0h6" />
                                        <path d="M15 16l4 -4" />
                                        <path d="M15 8l4 4" />
                                    </svg>

                                </div>

                            </div>


                            
                            <div className="relative h-50 flex justify-center items-center overflow-hidden">

                                {cards.map((card, index) => {

                                    const position = getPosition(index);

                                    return (

                                        <motion.img

                                            onMouseEnter={() => setIsPaused(true)}
                                            onMouseLeave={() => setIsPaused(false)}

                                            whileHover={{
                                                scale: position.scale + 0.08,
                                                zIndex: 50,
                                            }}

                                            key={card.id}

                                            src={card.image}

                                            animate={{
                                                ...position,
                                                y: [0, -12, 0],
                                            }}

                                            transition={{
                                                duration: 1.2,
                                                ease: "easeInOut",

                                                y: {
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                },
                                            }}

                                            whileHover={{
                                                scale: position.scale + 0.05,
                                                rotate: position.rotate * 1.2,

                                                transition: {
                                                    duration: 0.3,
                                                },
                                            }}

                                            onClick={() => setActive(index)}

                                            className="
                                                  absolute
                                                  w-72
                                                  cursor-pointer
                                                  select-none
                                                  drop-shadow-[0_0_35px_rgba(0,0,0,0.35)]
                                                 "

                                            draggable="false"

                                        />

                                    );

                                })}

                            </div>

                        </div>

                    </div>

                </div>

                <MarketWidget />




            </div>



        </div>
    );
}

export default Home;


