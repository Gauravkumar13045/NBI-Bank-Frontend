import { useState, useRef, useEffect } from "react";


function OtpModal({ isOpen, onClose, email, onVerified, purpose }) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(300);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [resendLoading, setResendLoading] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const inputRefs = useRef([]);



    useEffect(() => {
        if (!isOpen) return;
        setTimer(300);
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isOpen]);


    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
            setOtp(["", "", "", "", "", ""]);
            setError("");
        }
    }, [isOpen]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const handleChange = (index, value) => {
        // Sirf number allow karo
        if (!/^\d*$/.test(value)) return;
        setError("");

        const newOtp = [...otp];


        if (value.length > 1) {
            const digits = value.replace(/\D/g, "").split("").slice(0, 6);
            digits.forEach((digit, i) => {
                if (index + i < 6) newOtp[index + i] = digit;
            });
            setOtp(newOtp);
            const nextIndex = Math.min(index + digits.length, 5);
            inputRefs.current[nextIndex]?.focus();
            return;
        }

        newOtp[index] = value;
        setOtp(newOtp);


        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const otpValue = otp.join("");
        if (otpValue.length < 6) {
            setError("Please enter all 6 digits");
            return;
        }
        if (timer === 0) {
            setError("OTP has expired. Please request a new one.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const verifyUrl =
                purpose === "login"
                    ? "http://localhost:5000/verify-login-otp"
                    : "http://localhost:5000/verify-otp";

            const res = await fetch(verifyUrl, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    otp: otpValue,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Invalid OTP. Please try again.");
                setOtp(["", "", "", "", "", ""]);
                inputRefs.current[0]?.focus();
                return;
            }

            onVerified();

        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResendLoading(true);
        setError("");
        setResendSuccess(false);

        try {
            const res = await fetch("http://localhost:5000/resend-login-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to resend OTP.");
                return;
            }

            setTimer(300);
            setOtp(["", "", "", "", "", ""]);
            setResendSuccess(true);
            inputRefs.current[0]?.focus();
            setTimeout(() => setResendSuccess(false), 3000);

        } catch {
            setError("Network error. Please try again.");
        } finally {
            setResendLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>

            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >

                <div
                    className="relative w-full max-w-md rounded-2xl overflow-hidden"
                    style={{
                        background: "linear-gradient(145deg, #0f0f0f, #0a0a0a)",
                        border: "1px solid rgba(216,180,92,0.2)",
                        boxShadow: "0 0 60px rgba(216,180,92,0.08), 0 25px 50px rgba(0,0,0,0.8)",
                    }}
                >

                    <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #D8B45C, transparent)" }} />

                    <div className="p-8">


                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 mb-6 cursor-pointer group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                                className="w-4 text-gray-500 group-hover:text-[#D8B45C] transition-colors">
                                <path d="M19 12H5" />
                                <path d="M12 19l-7-7 7-7" />
                            </svg>
                            <span className="text-gray-500 text-sm group-hover:text-[#D8B45C] transition-colors">Back</span>
                        </button>


                        <div className="flex flex-col items-center text-center mb-6">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                                style={{
                                    background: "rgba(216,180,92,0.08)",
                                    border: "1px solid rgba(216,180,92,0.25)",
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
                                    className="w-8 text-[#D8B45C]">
                                    <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
                                    <path d="M11 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                    <path d="M12 12l0 2.5" />
                                </svg>
                            </div>

                            <h2 className="text-white text-2xl font-semibold mb-2" style={{ fontFamily: "Playfair Display" }}>
                                Verify Your Email
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                We've sent a 6-digit OTP to
                            </p>
                            <p className="text-[#D8B45C] text-sm font-medium mt-1">
                                {email || "gauravkumar@email.com"}
                            </p>

                            {/* Gold divider */}
                            <div className="h-px w-12 mt-4" style={{ background: "linear-gradient(to right, transparent, #D8B45C, transparent)" }} />
                        </div>


                        <p className="text-center text-gray-400 text-sm mb-4">
                            Enter the OTP below
                        </p>


                        <div className="flex gap-3 justify-center mb-5">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="text-center text-white text-xl font-semibold rounded-xl transition-all duration-200 focus:outline-none"
                                    style={{
                                        width: "52px",
                                        height: "58px",
                                        background: digit ? "rgba(216,180,92,0.08)" : "rgba(255,255,255,0.03)",
                                        border: digit
                                            ? "1.5px solid rgba(216,180,92,0.6)"
                                            : error
                                                ? "1.5px solid rgba(239,68,68,0.5)"
                                                : "1.5px solid rgba(255,255,255,0.1)",
                                        boxShadow: digit ? "0 0 12px rgba(216,180,92,0.1)" : "none",
                                        caretColor: "#D8B45C",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.border = "1.5px solid rgba(216,180,92,0.8)";
                                        e.target.style.boxShadow = "0 0 15px rgba(216,180,92,0.15)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.border = digit
                                            ? "1.5px solid rgba(216,180,92,0.6)"
                                            : "1.5px solid rgba(255,255,255,0.1)";
                                        e.target.style.boxShadow = digit ? "0 0 12px rgba(216,180,92,0.1)" : "none";
                                    }}
                                />
                            ))}
                        </div>


                        {error && (
                            <div className="flex items-center justify-center gap-1.5 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 text-red-400 shrink-0">
                                    <path d="M12 9v4m0 4h.01M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9s-9-1.8-9-9s1.8-9 9-9z" />
                                </svg>
                                <p className="text-red-400 text-xs">{error}</p>
                            </div>
                        )}


                        {resendSuccess && (
                            <div className="flex items-center justify-center gap-1.5 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 text-green-400">
                                    <path d="M5 12l5 5l10-10" />
                                </svg>
                                <p className="text-green-400 text-xs">New OTP sent successfully!</p>
                            </div>
                        )}


                        <div className="flex items-center justify-center gap-2 mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                                className={`w-4 ${timer <= 60 ? "text-red-400" : "text-[#D8B45C]"}`}>
                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                <path d="M12 7v5l3 3" />
                            </svg>
                            <span className={`text-sm font-mono font-semibold ${timer <= 60 ? "text-red-400" : "text-[#D8B45C]"}`}>
                                OTP expires in {formatTime(timer)}
                            </span>
                        </div>


                        <button
                            onClick={handleVerify}
                            disabled={loading || otp.join("").length < 6}
                            className={`w-full py-3.5 rounded-xl font-semibold text-black flex items-center justify-center gap-2 transition-all duration-300
                                ${loading || otp.join("").length < 6
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                                }`}
                            style={{
                                background: loading || otp.join("").length < 6
                                    ? "#555"
                                    : "linear-gradient(135deg,#A66C19,#c88b2f,#CF9533,#E1A940,#DFA43C,#c88b2f,#BB7E25)",
                                boxShadow: otp.join("").length === 6 ? "0 0 25px rgba(216,180,92,0.25)" : "none",
                            }}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Verify OTP
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4">
                                        <path d="M5 12l14 0" />
                                        <path d="M13 18l6-6" />
                                        <path d="M13 6l6 6" />
                                    </svg>
                                </>
                            )}
                        </button>

                        <div className="text-center ">
                            <p className="text-gray-600 text-xs leading-relaxed">
                                Incase check Spam if OTP isn't received.
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-0 mt-5">
                            <span className="text-gray-500 text-xs">Didn't receive the code?</span>
                            <button
                                onClick={handleResend}
                                disabled={timer > 0 && !resendLoading}
                                className={`text-xs font-semibold ml-1 transition-colors ${timer === 0
                                    ? "text-[#D8B45C] hover:text-[#f0cf72] cursor-pointer"
                                    : "text-gray-600 cursor-not-allowed"
                                    }`}
                            >
                                {resendLoading ? "Sending..." : timer === 0 ? "Resend OTP" : `Resend in ${formatTime(timer)}`}
                            </button>
                        </div>



                    </div>



                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(216,180,92,0.03)" }} className=" block">

                        <div className="px-8 py-4 flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
                                className="w-5 text-[#D8B45C]/50 shrink-0">
                                <path d="M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-6" />
                                <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0-2 0" />
                                <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                            </svg>
                            <p className="text-gray-600 text-xs leading-relaxed">
                                Never share your OTP with anyone. NBI Bank will never ask for your OTP or password.
                            </p>
                        </div>





                    </div>



                </div>
            </div>
        </>
    );
}

export default OtpModal;