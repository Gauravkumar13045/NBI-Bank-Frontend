import React,{useState} from "react";
import Loginbg from "../images/loginbg2.png";
import logo from "../images/logo/logo-nbi-new.png";
import formbg from "../images/formbg.png";
import { useNavigate } from "react-router-dom";





function Login() {

     const [focusedField, setFocusedField] = useState("");
     const navigate = useNavigate();

    return (


        <div
            className="relative h-screen w-full sm:bg-cover bg-top-left p-5"
            style={{
                backgroundImage: `url(${Loginbg})`,
            }}
        >


            <div className="absolute inset-0 bg-black/0"></div>


            <div className="relative z-10 flex flex-col md:flex-row h-full ">
                <div className=" flex-col md:w-1/2 hidden md:flex">

                    <img
                        src={logo}
                        alt="NBI - National Bank of India"
                        className=" w-45  md:w-55 p-3  object-contain cursor-pointer"
                        onClick={() => navigate("/")}
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


                        <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-4 gap-4 w-[80%] lg:w-[90%] xl:w-[80%] mt-5">


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

                        <footer className="bottom-0 mt-18 w-max p-1 bg-black/30">
                            <p className="text-gray-300 text-xs text-center lg:text-left font-serif">
                                © 2026 <span className="text-[#d8b45c] ">&nbsp; NBI</span> - National Bank of India. All Rights Reserved.
                            </p>
                            <p className="text-gray-400 text-xs text-center lg:text-left font-serif"> Made with ❤️ by <span className="text-[#d8b45c] ">Gaurav</span></p>
                        </footer>


                    </div>

                </div>


                <div className="flex flex-col items-center justify-center w-full md:w-1/2 py-6">

                    <div className="md:hidden bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2 ">
                        <img
                            src={logo}
                            alt="NBI - National Bank of India"
                            className="w-45 md:hidden object-contain cursor-pointer "
                            onClick={() => navigate("/")}
                        />
                    </div>


                    <div className=" backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full mt-5 md:m-0 max-w-md mx-4 text-center" style={{
                        backgroundImage: `url(${formbg})`,
                    }}>
                        <div className="leading-tight">
                            <h1 className="text-white text-3xl " style={{ fontFamily: "Playfair Display" }} >
                                Welcome <span className="text-[#d8b45c]">Back</span>
                            </h1>

                            <p className="text-gray-400 text-sm mt-0.5">
                                Login to access your <span className="text-[#d8b45c]">NBI</span> account
                            </p>
                            <div className="h-[0.5px] w-12 mx-auto mt-4" style={{ background: "linear-gradient(to right, #d8b45c 0%, #d8b45c 70%, transparent 100%)", }}></div>

                        </div>


                        <div className="text-left mt-5">
                            <div>
                                <label className={` text-sm ${focusedField === "EmailAddressorMobilenumber" ? "text-[#d8b45c]" : "text-[#D3D3D2]" }`}>Email Address or Mobile number</label><br></br>

                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-mail text-[#D3D3D2] w-7 absolute mt-3.5 ml-3 ${focusedField === "EmailAddressorMobilenumber" ? "text-[#d8b45c]" : "text-[#D3D3D2]" }`}> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" /> <path d="M3 7l9 6l9 -6" /></svg>
                                    <input type="text" placeholder="Email address or Mobile number" onFocus={() => setFocusedField("EmailAddressorMobilenumber")} onBlur={() => setFocusedField("")} className=" mt-1 rounded-lg border-2 border-[#313030] text-gray-300 p-2.5 pl-12 w-full placeholder:text-sm bg-black/20 focus:outline-none focus:border-[#d8b45c] focus:shadow-[0_0_15px_rgba(216,180,92,0.2)] transition-all duration-300"></input>

                                </div>
                            </div>

                            <div className="mt-3">
                                <label className={` text-sm ${focusedField === "Password" ? "text-[#d8b45c]" : "text-[#D3D3D2]" }`}>Password</label><br></br>

                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-lock text-[#D3D3D2] w-7 absolute mt-3.5 ml-3 ${focusedField === "Password" ? "text-[#d8b45c]" : "text-[#D3D3D2]" }`}> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" /> <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /> <path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>
                                    <input type="password" onFocus={() => setFocusedField("Password")} onBlur={() => setFocusedField("")} className=" mt-1 rounded-lg border-2 border-[#313030] text-gray-300 p-2.5 w-full pl-12 placeholder:text-sm bg-black/20 focus:outline-none focus:border-[#d8b45c] focus:shadow-[0_0_15px_rgba(216,180,92,0.2)] transition-all duration-300" placeholder="Password" ></input>

                                </div>

                            </div>

                            <div className="flex justify-between items-center w-full mt-5">

                                <div className="flex items-center gap-2">

                                    <input type="checkbox" className="size-4 accent-[#d8b45c] cursor-pointer" />

                                    <label className="text-gray-300 text-sm cursor-pointer">Remember Me</label>

                                </div>

                                <button className="text-sm text-[#d8b45c] font-medium  hover:text-[#f1da92] transition cursor-pointer">
                                    Forgot Password?
                                </button>

                            </div>

                            <button
                                className="w-full mt-5 py-3 rounded-xl font-medium text-black text-md cursor-pointer transition-all duration-300 hover:scale-[1.02]  active:scale-95 shadow-xl  bg-[linear-gradient(135deg,#A66C19,#c88b2f,#CF9533,#E1A940,#DFA43C,#c88b2f,#BB7E25)] "
                            >
                                Login to Account
                            </button>



                            <div className="flex items-center gap-3 mt-6">

                                <div
                                    className="flex-1 h-px"
                                    style={{
                                        background:
                                            "linear-gradient(to right, transparent, #6B7280)"
                                    }}
                                />

                                <p className="text-gray-300 text-xs ">
                                    or continue with
                                </p>

                                <div
                                    className="flex-1 h-px"
                                    style={{
                                        background:
                                            "linear-gradient(to left, transparent, #6B7280)"
                                    }}
                                />

                            </div>


                            <div className="flex items-center justify-center gap-4 mt-6">


                                <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer hover:border-[#d8b45c]/40 hover:bg-white/10 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
                                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                                    </svg>
                                </div>


                                <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer hover:border-[#d8b45c]/40 hover:bg-white/10 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0,0,256,256">
                                        <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}>
                                            <g transform="scale(5.12,5.12)">
                                                <path d="M44.52734,34.75c-1.07812,2.39453 -1.59766,3.46484 -2.98437,5.57813c-1.94141,2.95313 -4.67969,6.64063 -8.0625,6.66406c-3.01172,0.02734 -3.78906,-1.96484 -7.87891,-1.92969c-4.08594,0.01953 -4.9375,1.96875 -7.95312,1.9375c-3.38672,-0.03125 -5.97656,-3.35156 -7.91797,-6.30078c-5.42969,-8.26953 -6.00391,-17.96484 -2.64844,-23.12109c2.375,-3.65625 6.12891,-5.80469 9.65625,-5.80469c3.59375,0 5.85156,1.97266 8.82031,1.97266c2.88281,0 4.63672,-1.97656 8.79297,-1.97656c3.14063,0 6.46094,1.71094 8.83594,4.66406c-7.76562,4.25781 -6.50391,15.34766 1.33984,18.31641zM31.19531,8.46875c1.51172,-1.94141 2.66016,-4.67969 2.24219,-7.46875c-2.46484,0.16797 -5.34766,1.74219 -7.03125,3.78125c-1.52734,1.85938 -2.79297,4.61719 -2.30078,7.28516c2.69141,0.08594 5.47656,-1.51953 7.08984,-3.59766z" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>


                                <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer hover:border-[#d8b45c]/40 hover:bg-white/10 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d8b45c" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3" />
                                        <path d="M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6" />
                                        <path d="M12 11v2a14 14 0 0 0 2.5 8" />
                                        <path d="M8 15a18 18 0 0 0 1.8 6" />
                                        <path d="M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95" />
                                    </svg>
                                </div>

                            </div>


                            <p className="text-center text-gray-500 text-xs mt-5 cursor-pointer group" onClick={() => navigate("/signup")}>
                                Don't have an account?{" "}
                                <span className="text-[#d8b45c] cursor-pointer group-hover:text-[#f9d16c] font-medium">&nbsp; Sign Up</span>
                            </p>







                        </div>


                    </div>
                </div>

            </div>

        </div>





    )
}

export default Login 