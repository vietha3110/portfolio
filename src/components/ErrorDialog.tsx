"use client";
import { useState, useEffect, useRef, RefObject } from "react";
import Image from "next/image";
import Draggable from "react-draggable";
import criticalIcon from "@/image/icons/Critical.png";

const ERRORS = [
    {
        title: "Recruiting Assistant XP",
        msg: "A highly qualified candidate has been detected on your screen.\n\nHire Ha Nguyen immediately to prevent further productivity loss.",
        buttons: ["Hire Now", "Remind Me Later"],
    },
    {
        title: "Career.exe — Critical Warning",
        msg: "WARNING: Your team is currently missing a software engineer who used to be a product manager.\n\nThis is a rare combo. Do not ignore.",
        buttons: ["I'll Fix This", "Ignore (not recommended)"],
    },
    {
        title: "Windows Job Market",
        msg: "Ha Nguyen's resume has been left unread for too long.\n\nThis may cause irreversible damage to your engineering team.",
        buttons: ["Open Resume", "Take the Risk"],
    },
    {
        title: "Stack Overflow — Alert",
        msg: "Ha has Googled the same CSS flexbox question 47 times.\n\nDespite this, everything on screen looks great. Consider hiring.",
        buttons: ["Fair Enough", "OK"],
    },
    {
        title: "TaskManager.exe",
        msg: "Process detected: Ha_Nguyen.exe\nCPU: 100%  RAM: Full of ideas  Status: Building cool stuff\n\nTerminate process?",
        buttons: ["End Task (bad idea)", "Keep Running"],
    },
    {
        title: "Windows — Low Opportunity",
        msg: "Your organization is running low on engineers who understand both the product and the code.\n\nFree up a headcount by hiring Ha.",
        buttons: ["Add Headcount", "Suffer"],
    },
    {
        title: "git commit — Unverified",
        msg: "Ha has committed code without writing tests again.\n\n\"I'll add them later\" — Ha, probably.\n\nHire anyway?",
        buttons: ["Yes", "Absolutely"],
    },
    {
        title: "404 — Engineer Not Found",
        msg: "The engineer you are looking for could not be found on your team.\n\nSuggested fix: hire Ha Nguyen.",
        buttons: ["Apply Fix", "Keep Searching (slow)"],
    },
    {
        title: "Windows Genuine Talent",
        msg: "This portfolio has been verified as 100% genuine.\n\nCertificate of Authenticity: Ha Nguyen, Software Engineer.",
        buttons: ["Nice", "Very Nice"],
    },
    {
        title: "Product Roadmap.exe — Deprecated",
        msg: "Ha has permanently migrated from product roadmaps to pull requests.\n\nNo rollback available. No regrets detected.",
        buttons: ["Respect", "OK"],
    },
];

interface DialogData {
    id: number;
    error: typeof ERRORS[0];
    x: number;
    y: number;
}

let nextId = 0;

export default function ErrorDialog() {
    const [dialogs, setDialogs] = useState<DialogData[]>([]);

    const dismiss = (id: number) =>
        setDialogs((prev) => prev.filter((d) => d.id !== id));

    const spawnError = () => {
        const error = ERRORS[Math.floor(Math.random() * ERRORS.length)];
        const x = 80 + Math.random() * Math.max(window.innerWidth - 450, 100);
        const y = 60 + Math.random() * Math.max(window.innerHeight - 250, 100);
        setDialogs((prev) => [...prev, { id: nextId++, error, x, y }]);
    };

    useEffect(() => {
        // First popup after 10s, then randomly every 25-50s
        const t1 = setTimeout(spawnError, 10000);
        let recurring: ReturnType<typeof setTimeout>;
        const schedule = () => {
            recurring = setTimeout(() => { spawnError(); schedule(); }, 25000 + Math.random() * 25000);
        };
        schedule();
        return () => { clearTimeout(t1); clearTimeout(recurring); };
    }, []);

    return (
        <>
            {dialogs.map((d) => (
                <SingleDialog key={d.id} data={d} onDismiss={() => dismiss(d.id)} />
            ))}
        </>
    );
}

function SingleDialog({ data, onDismiss }: { data: DialogData; onDismiss: () => void }) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const raised: React.CSSProperties = { border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff" };

    return (
        <Draggable nodeRef={nodeRef as RefObject<HTMLElement>} handle=".err-drag" defaultPosition={{ x: data.x, y: data.y }}>
            <div
                ref={nodeRef}
                className="fixed z-[200] shadow-2xl"
                style={{ background: "#c0c0c0", minWidth: "340px", maxWidth: "420px", ...raised }}
            >
                {/* Title bar */}
                <div
                    className="err-drag flex items-center justify-between px-2 py-1 cursor-move select-none"
                    style={{ backgroundImage: "linear-gradient(rgb(31,47,134) 0px,rgb(49,101,196) 3%,rgb(54,130,229) 6%,rgb(68,144,230) 10%,rgb(43,113,224) 18%,rgb(33,87,214) 40%,rgb(37,98,223) 86%,rgb(25,65,165) 98%)" }}
                >
                    <div className="flex items-center gap-2 text-white">
                        <Image src={criticalIcon} width={16} height={16} alt="error" />
                        <span className="text-sm font-bold">{data.error.title}</span>
                    </div>
                    <button
                        onClick={onDismiss}
                        className="w-5 h-5 flex items-center justify-center text-xs font-bold cursor-pointer"
                        style={{ background: "#c0c0c0", border: "1px solid #808080", color: "#000" }}
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="flex gap-3 p-4">
                    <Image src={criticalIcon} width={32} height={32} alt="critical" className="shrink-0 mt-1" />
                    <p className="text-sm text-black leading-relaxed whitespace-pre-line">{data.error.msg}</p>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-2 pb-4">
                    {data.error.buttons.map((btn) => (
                        <button
                            key={btn}
                            onClick={onDismiss}
                            className="px-4 py-1 text-sm cursor-pointer active:translate-y-px"
                            style={{ ...raised, background: "#c0c0c0", minWidth: "80px" }}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
            </div>
        </Draggable>
    );
}
