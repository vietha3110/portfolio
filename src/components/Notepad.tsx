"use client";
import { useState, useEffect, useRef, RefObject } from "react";
import Image from "next/image";
import Draggable from "react-draggable";
import minimizeIcon from "@/image/icons/Minimize.png";
import closeIcon from "@/image/icons/Exit.png";
import maximizeIcon from "@/image/icons/Maximize.png";
import restoreIcon from "@/image/icons/Restore.png";

const BIO = `============================================
  H A   N G U Y E N   |   readme.txt
============================================

  From product manager to software engineer,
  I've switched plans for lines of code,
  swapping product roadmaps for debugging mode.

--------------------------------------------
  ABOUT.EXE
--------------------------------------------
  Name       : Ha Nguyen
  Role       : Software Engineer
  Previously : Product Manager
  Status     : Compiling...

--------------------------------------------
  SKILLS.LOG
--------------------------------------------
  [████████░░]  Problem Solving
  [███████░░░]  Frontend Dev
  [██████░░░░]  Backend Dev
  [██████████]  Learning new things

--------------------------------------------
  DEBUG LOG
--------------------------------------------
  [SUCCESS]  Career switch
  [OPTIMAL]  Coffee intake
  [MANY   ]  Bugs fixed
  [??????]   Bugs created
  [OPEN   ]  Stack Overflow tabs

// EOF — Thanks for reading!
`;

interface Props {
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    toggleMinimize: () => void;
    toggleMaximize: () => void;
    closeWindow: () => void;
    restoreWindow: () => void;
    position: { x: number; y: number };
    setPosition: (p: { x: number; y: number }) => void;
}

export default function Notepad({
    isOpen, isMinimized, isMaximized,
    toggleMinimize, toggleMaximize, closeWindow, restoreWindow,
    position, setPosition,
}: Props) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);

    // Restart typewriter every time the window opens
    useEffect(() => {
        if (!isOpen) {
            setDisplayed("");
            setDone(false);
            return;
        }
        setDisplayed("");
        setDone(false);
        let i = 0;
        const id = setInterval(() => {
            i++;
            setDisplayed(BIO.slice(0, i));
            if (i >= BIO.length) { clearInterval(id); setDone(true); }
        }, 12);
        return () => clearInterval(id);
    }, [isOpen]);

    const MENUS = ["File", "Edit", "Format", "View", "Help"];

    return (
        <>
            <Draggable
                nodeRef={nodeRef as RefObject<HTMLElement>}
                handle=".np-drag"
                disabled={isMaximized}
                position={position}
                onStop={(_e, d) => setPosition({ x: d.x, y: d.y })}
            >
                <div
                    ref={nodeRef}
                    className={`fixed ${isMaximized ? "top-0 left-0 w-full h-full" : "top-14 left-32 w-[520px]"} border border-gray-600 shadow-xl z-50 flex flex-col`}
                    style={{ display: !isOpen || isMinimized ? "none" : undefined, background: "#fff" }}
                >
                    {/* Title bar */}
                    <div
                        className="np-drag flex items-center justify-between px-2 py-1 cursor-move select-none shrink-0"
                        style={{ backgroundImage: "linear-gradient(rgb(31,47,134) 0px,rgb(49,101,196) 3%,rgb(54,130,229) 6%,rgb(68,144,230) 10%,rgb(43,113,224) 18%,rgb(33,87,214) 40%,rgb(37,98,223) 86%,rgb(25,65,165) 98%)" }}
                    >
                        <div className="flex items-center gap-2 text-white text-sm font-bold">
                            <span>📄</span> readme.txt — Notepad
                        </div>
                        <div className="flex gap-1">
                            <button onClick={toggleMinimize} className="w-6 h-6 border border-black cursor-pointer">
                                <Image src={minimizeIcon} height={50} width={50} alt="minimize" />
                            </button>
                            <button onClick={toggleMaximize} className="w-6 h-6 border border-black cursor-pointer">
                                {isMaximized
                                    ? <Image src={restoreIcon} height={50} width={50} alt="restore" />
                                    : <Image src={maximizeIcon} height={50} width={50} alt="maximize" />}
                            </button>
                            <button onClick={closeWindow} className="w-6 h-6 border border-black cursor-pointer">
                                <Image src={closeIcon} height={50} width={50} alt="close" />
                            </button>
                        </div>
                    </div>

                    {/* Menu bar */}
                    <div className="flex items-center bg-[#f0f0f0] border-b border-gray-300 shrink-0">
                        {MENUS.map((m) => (
                            <button
                                key={m}
                                className="px-3 py-0.5 text-sm hover:bg-[#003399] hover:text-white cursor-default"
                            >
                                {m}
                            </button>
                        ))}
                    </div>

                    {/* Text area */}
                    <div className={`overflow-auto flex-1 ${isMaximized ? "" : "h-[320px]"}`}>
                        <pre
                            className="font-mono text-sm p-3 leading-relaxed text-black whitespace-pre-wrap"
                        >
                            {displayed}
                            {!done && <span className="animate-pulse border-r-2 border-black">&nbsp;</span>}
                        </pre>
                    </div>

                    {/* Status bar */}
                    <div className="flex justify-between border-t border-gray-300 bg-[#f0f0f0] px-2 py-0.5 text-xs text-gray-600 shrink-0">
                        <span>Ln 1, Col 1</span>
                        <span>100%</span>
                        <span>Windows (CRLF)</span>
                        <span>UTF-8</span>
                    </div>
                </div>
            </Draggable>

            {isOpen && (
                <div
                    className={`fixed bottom-0 z-50 px-3 h-[30px] flex items-center gap-1 cursor-pointer text-xs text-white border-r border-[#4a7ebf] ${isMinimized ? "bg-blue-900 opacity-80" : "bg-blue-600"}`}
                    style={{ left: "475px", minWidth: "110px" }}
                    onClick={isMinimized ? restoreWindow : toggleMinimize}
                >
                    📄 readme.txt
                </div>
            )}
        </>
    );
}
