import { LogOut, ShieldCheck, X } from "lucide-react";

function LogoutDialog({
    isOpen,
    onClose,
    onConfirm,
    loading = false,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center px-4">


            <div
                className="absolute inset-0 bg-black/75 backdrop-blur-md"
                onClick={onClose}
            />


            <div
                className="
                    relative
                    w-full
                    max-w-md
                    overflow-hidden
                    rounded-2xl
                    border border-[#b9953f]/40
                    bg-[#0c0c0b]
                    shadow-[0_25px_80px_rgba(0,0,0,0.75)]
                "
            >


                <div
                    className="
                        absolute
                        left-1/2
                        top-0
                        h-0.5
                        w-2/3
                        -translate-x-1/2
                        `bg-linear-to-r
                        from-transparent
                        via-[#d4af57]
                        to-transparent
                        blur-[1px]
                    "
                />


                <button
                    onClick={onClose}
                    disabled={loading}
                    className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        text-gray-500
                        cursor-pointer
                        transition-all
                        hover:bg-white/5
                        hover:text-[#d4af57]
                    "
                >
                    <X size={18} />
                </button>


                <div className="px-7 pb-7 pt-8">


                    <div className="mb-6 flex justify-center">
                        <div
                            className="
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-[#d4af57]/40
                                bg-[#d4af57]/10
                                shadow-[0_0_30px_rgba(212,175,87,0.12)]
                            "
                        >
                            <LogOut
                                size={27}
                                strokeWidth={1.7}
                                className="text-[#d4af57]"
                            />
                        </div>
                    </div>


                    <div className="text-center">

                        <p
                            className="
                                mb-2
                                text-[11px]
                                font-medium
                                uppercase
                                tracking-[0.28em]
                                text-[#b9953f]
                            "
                        >
                            Secure Session
                        </p>

                        <h2
                            className="
                                text-2xl
                                font-medium
                                tracking-wide
                                text-white
                            "
                        >
                            Sign out of NBI?
                        </h2>

                        <p
                            className="
                                mx-auto
                                mt-3
                                max-w-sm
                                text-sm
                                leading-6
                                text-gray-400
                            "
                        >
                            Are you sure you want to logout from your<p></p>
                            National Bank of India account?
                        </p>

                    </div>


                    <div
                        className="
                            mt-6
                            flex
                            items-start
                            gap-3
                            rounded-xl
                            border
                            border-[#d4af57]/15
                            bg-[#d4af57]/4
                            px-4
                            py-3.5
                        "
                    >
                        <ShieldCheck
                            size={19}
                            className="mt-0.5 shrink-0 text-[#d4af57]"
                        />

                        <p className="text-xs leading-5 text-gray-400">
                            Your current secure session will be ended.
                            You can sign in again anytime using your
                            registered credentials.
                        </p>
                    </div>


                    <div className="mt-7 flex gap-3">


                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="
                                flex-1
                                rounded-xl
                                border
                                border-white/10
                                bg-white/3
                                px-5
                                py-3
                                text-sm
                                font-medium
                                text-gray-300
                                transition-all
                                duration-200
                                hover:border-[#d4af57]/30
                                hover:bg-white/6
                                hover:text-white
                                cursor-pointer
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            Cancel
                        </button>


                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="
                                group
                                flex-1
                                rounded-xl
                                border
                                border-[#d4af57]/60
                                bg-[#d4af57]
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-black
                                shadow-[0_8px_25px_rgba(212,175,87,0.12)]
                                transition-all
                                duration-200
                                hover:bg-[#e2c16b]
                                hover:shadow-[0_8px_30px_rgba(212,175,87,0.2)]
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                                cursor-pointer
                            "
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span
                                        className="
                                            h-4
                                            w-4
                                            animate-spin
                                            rounded-full
                                            border-2
                                            border-black/30
                                            border-t-black
                                        "
                                    />
                                    Signing out...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2 ">
                                    Logout
                                    <LogOut
                                        size={16}
                                        className="
                                            transition-transform
                                            group-hover:translate-x-0.5
                                        "
                                    />
                                </span>
                            )}
                        </button>

                    </div>

                </div>


                <div className="h-px bg-linear-to-r from-transparent via-[#d4af57]/20 to-transparent" />

            </div>
        </div>
    );
}

export default LogoutDialog;