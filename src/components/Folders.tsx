"use client";
import Image from "next/image";
import addressBook from "@/image/icons/Address Book.png";
import email from "@/image/icons/Email.png";
import windows from "@/image/icons/Windows Media Player 10.png";
import criticalIcon from "@/image/icons/Critical.png";
import picturesIcon from "@/image/icons/My Pictures.png";
import { useState } from "react";
import ResumeWindow from "./Resume";
import Player from "./Player";
import Minesweeper from "./Minesweeper";
import Notepad from "./Notepad";

function useWindowState(initialPos = { x: 0, y: 0 }) {
    const [open, setOpen] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [maximized, setMaximized] = useState(false);
    const [position, setPosition] = useState(initialPos);
    const toggleMaximize = () => { if (!maximized) setPosition({ x: 0, y: 0 }); setMaximized(m => !m); };
    const close = () => { setOpen(false); setMinimized(false); setMaximized(false); setPosition(initialPos); };
    return { open, setOpen, minimized, setMinimized, maximized, toggleMaximize, close, position, setPosition };
}

export default function Folders() {
    const resume = useWindowState();
    const player = useWindowState();
    const sweep = useWindowState();
    const notepad = useWindowState();

    const iconLabel = "text-xs text-left text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]";

    return (
        <>
            <div className="grid grid-cols-2 w-[180px] gap-5 pt-6 pl-6">
                <button className="flex flex-col gap-2 items-start" onClick={() => resume.setOpen(true)}>
                    <Image src={addressBook} alt="" width={50} height={50} />
                    <span className={iconLabel}>My resume</span>
                </button>

                <button className="flex flex-col gap-2 items-start" onClick={() => (window.location.href = "mailto:")}>
                    <Image src={email} alt="" width={50} height={50} />
                    <span className={iconLabel}>Email me</span>
                </button>

                <button className="flex flex-col gap-2 items-start" onClick={() => player.setOpen(true)}>
                    <Image src={windows} alt="" width={50} height={50} />
                    <span className={iconLabel}>Media</span>
                </button>

                <button className="flex flex-col gap-2 items-start" onClick={() => notepad.setOpen(true)}>
                    <Image src={picturesIcon} alt="" width={50} height={50} />
                    <span className={iconLabel}>readme.txt</span>
                </button>

                <button className="flex flex-col gap-2 items-start" onClick={() => sweep.setOpen(true)}>
                    <Image src={criticalIcon} alt="" width={50} height={50} />
                    <span className={iconLabel}>Minesweeper</span>
                </button>
            </div>

            <ResumeWindow
                isOpen={resume.open}
                isMinimized={resume.minimized}
                isMaximized={resume.maximized}
                toggleMinimize={() => resume.setMinimized(m => !m)}
                toggleMaximize={resume.toggleMaximize}
                closeWindow={resume.close}
                restoreWindow={() => resume.setMinimized(false)}
                position={resume.position}
                setPosition={resume.setPosition}
            />

            <Player
                isOpen={player.open}
                isMinimized={player.minimized}
                isMaximized={player.maximized}
                toggleMinimize={() => player.setMinimized(m => !m)}
                toggleMaximize={player.toggleMaximize}
                closeWindow={player.close}
                restoreWindow={() => player.setMinimized(false)}
                position={player.position}
                setPosition={player.setPosition}
            />

            <Minesweeper
                isOpen={sweep.open}
                isMinimized={sweep.minimized}
                toggleMinimize={() => sweep.setMinimized(m => !m)}
                closeWindow={sweep.close}
                restoreWindow={() => sweep.setMinimized(false)}
                position={sweep.position}
                setPosition={sweep.setPosition}
            />

            <Notepad
                isOpen={notepad.open}
                isMinimized={notepad.minimized}
                isMaximized={notepad.maximized}
                toggleMinimize={() => notepad.setMinimized(m => !m)}
                toggleMaximize={notepad.toggleMaximize}
                closeWindow={notepad.close}
                restoreWindow={() => notepad.setMinimized(false)}
                position={notepad.position}
                setPosition={notepad.setPosition}
            />
        </>
    );
}
