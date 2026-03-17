"use client";
import { useState, useEffect } from "react";

export default function RightStartFooter() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const update = () => {
            const now = new Date();
            const h = now.getHours().toString().padStart(2, "0");
            const m = now.getMinutes().toString().padStart(2, "0");
            setTime(`${h}:${m}`);
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div
            className="flex items-center gap-2 px-3 h-full text-white text-xs shrink-0 border-l border-[#4a7ebf]"
            style={{
                backgroundImage:
                    "linear-gradient(rgb(18,52,156) 0px,rgb(30,75,190) 6%,rgb(20,58,176) 20%,rgb(14,40,138) 50%,rgb(18,52,156) 86%,rgb(10,28,100) 98%)",
            }}
        >
            {/* Volume */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
            {/* Network */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            <span className="font-bold tracking-wide">{time}</span>
        </div>
    );
}
