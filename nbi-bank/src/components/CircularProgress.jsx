import React from "react";

function CircularProgress({
    percentage = 75,
    size = 100,
    strokeWidth = 10,
}) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const offset =
        circumference - (percentage / 100) * circumference;

    return (
        <div
            className="relative flex items-center justify-center"
            style={{
                width: size,
                height: size,
            }}
        >
            <svg
                width={size}
                height={size}
                className="-rotate-90"
            >

                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#1A1A1A"
                    strokeWidth={strokeWidth}
                    fill="none"
                />


     s          <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#d8b45c"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{
                        transition: "all 0.8s ease",

                    }}
                />
            </svg>


            <div className="absolute flex flex-col items-center">
                <span className="text-white text-lg font-bold">
                  {Math.round(percentage)}%
                </span>

                <span className="text-[#d8b45c] text-[10px] tracking-wider uppercase">
                    Score
                </span>
            </div>
        </div>
    );
}

export default CircularProgress;