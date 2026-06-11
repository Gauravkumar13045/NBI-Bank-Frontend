import React from "react";
import Loginbg from "../images/loginbg2.png";
import logo from "../images/logo/logo-nbi-new.png";



function Login() {

    return (
        <div
            className="relative h-screen w-full sm:bg-cover bg-top-left p-5"
            style={{
                backgroundImage: `url(${Loginbg})`,
            }}
        >


            <div className="absolute inset-0 bg-black/0"></div>


            <div className="relative z-10">

                <img
                    src={logo}
                    alt="NBI - National Bank of India"
                    className=" w-45  md:w-55 p-3  object-contain cursor-pointer"
                />

                <div style={{ fontFamily: "Playfair Display" }} className="text-white ml-5 mt-10 xl:mt-25 hidden md:block xl:text-4xl text-2xl">

                    <p>Banking</p>

                    <p className="text-[#d8b45c]">Redefined.</p>

                    <p>Excellence</p>

                    <p>Every Time.</p><br></br>

                    <div className="h-[0.5px] w-12" style={{ background: "linear-gradient(to right, #d8b45c 0%, #d8b45c 70%, transparent 100%)", }}></div>

                    <div className="text-gray-300 text-sm mt-5 font-sans ">
                        Step into a world of premium banking<br></br>
                        crafted for your lifestyle.<br></br>
                        Secure. Seamless. Exceptional.
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-4 gap-4 w-[40%] mt-5">


                        <div className=" hover:scale-105 group rounded-2xl cursor-pointer pt-5 pb-5 border border-white/10 bg-black/30  backdrop-blur-xl  transition-all duration-500 hover:border-[#d8b45c]/50 hover:bg-black/50">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" group-hover:scale-110 transition icon icon-tabler icons-tabler-outline icon-tabler-shield-lock w-8 text-[#d8b45c] mx-auto mb-2"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" /> <path d="M11 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M12 12l0 2.5" /></svg>
                            <h3 className="text-[#d8b45c] font-medium text-xs text-center">
                                Banking Security
                            </h3>

                            <p className="text-gray-300 mt-2 hidden lg:block  text-xs leading-tight text-center">
                                Top-tier protection<br></br>

                                for your data
                            </p>

                        </div>


                        <div className=" hover:scale-105 group rounded-2xl cursor-pointer pt-5 pb-5 border border-white/10 bg-black/30  backdrop-blur-xl  transition-all duration-500 hover:border-[#d8b45c]/50 hover:bg-black/50">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" group-hover:scale-110 transitionicon icon-tabler icons-tabler-outline icon-tabler-bolt  w-8 text-[#d8b45c] mx-auto mb-2"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" /> </svg>

                            <h3 className="text-[#d8b45c] font-medium text-xs text-center">
                                Instant Access
                            </h3>

                            <p className="text-gray-300 mt-2 hidden lg:block text-xs leading-tight text-center">
                                Seamless banking<br></br>

                                anytime, anywhere
                            </p>

                        </div>


                        <div className=" hover:scale-105 group rounded-2xl cursor-pointer pt-5 pb-5 border border-white/10 bg-black/30  backdrop-blur-xl  transition-all duration-500 hover:border-[#d8b45c]/50 hover:bg-black/50">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" group-hover:scale-110 transitionicon icon-tabler icons-tabler-outline icon-tabler-vip-2  w-8 text-[#d8b45c] mx-auto mb-2"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 5h4" /> <path d="M17 5h4" /> <path d="M3 19h18" /> <path d="M4 9l2 6h1l2 -6" /> <path d="M12 10v5" /> <path d="M16 15v-6h2a2 2 0 1 1 0 4h-2" /> <path d="M10 5a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2" /></svg>

                            <h3 className="text-[#d8b45c] font-medium text-xs text-center">
                                Premium Services
                            </h3>

                            <p className="text-gray-300 mt-2 text-xs hidden lg:block leading-tight text-center">
                                Exclusive benefits for premium users
                            </p>

                        </div>


                        <div className=" hover:scale-105 group rounded-2xl cursor-pointer pt-5 pb-5 border border-white/10 bg-black/30  backdrop-blur-xl  transition-all duration-500 hover:border-[#d8b45c]/50 hover:bg-black/50">

                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 text-[#d8b45c] mx-auto mb-2 icon icon-tabler icons-tabler-outline icon-tabler-headset group-hover:scale-110 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M4 14v-3a8 8 0 1 1 16 0v3" /> <path d="M18 19c0 1.657 -2.686 3 -6 3" /> <path d="M4 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3" /> <path d="M15 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3" /> </svg>

                            <h3 className="text-[#d8b45c] font-medium text-xs text-center">
                                24/7&nbsp; Support
                            </h3>

                            <p className="text-gray-300 mt-2 hidden lg:block text-center text-xs leading-tight">
                                We are here<br></br>

                                for you always
                            </p>

                        </div>


                    </div>

                    <footer className="mt-20  w-max p-1 bg-black/30">
                        <p className="text-gray-300 text-xs text-center lg:text-left font-serif">
                            © 2026 <span className="text-[#d8b45c] text-bold">&nbsp; NBI</span> - National Bank of India. All Rights Reserved.
                        </p>
                        <p className="text-gray-400 text-xs text-center lg:text-left font-serif"> Made with ❤️ by <span className="text-[#d8b45c] text-bold">Gaurav</span></p>
                    </footer>


                </div>
                

            </div>

        </div>





    )
}

export default Login 