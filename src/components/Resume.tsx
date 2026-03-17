"use client";
import Image from "next/image";
import addressBook from "@/image/icons/Address Book.png";
import resumeScreenshot from "@/image/resumeScreenshot.png";
import minimizeIcon from "@/image/icons/Minimize.png";
import closeIcon from "@/image/icons/Exit.png";
import maximizeIcon from "@/image/icons/Maximize.png";
import restoreIcon from "@/image/icons/Restore.png";
import Draggable from "react-draggable";
import { RefObject, useRef } from "react";

interface ResumeWindowProps {
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    toggleMinimize: () => void;
    toggleMaximize: () => void;
    closeWindow: () => void;
    restoreWindow: () => void;
    position: { x: number; y: number };
    setPosition: (position: { x: number; y: number }) => void;
}

export default function ResumeWindow({
    isOpen,
    isMinimized,
    isMaximized,
    toggleMinimize,
    toggleMaximize,
    closeWindow,
    restoreWindow,
    position,
    setPosition,
}: ResumeWindowProps) {
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {/* Keep Draggable always mounted so react-draggable's ref never breaks.
                Hide via display:none instead of unmounting. */}
            <Draggable
                nodeRef={nodeRef as RefObject<HTMLElement>}
                handle=".drag-handle"
                disabled={isMaximized}
                position={position}
                onStop={(_e, data) => setPosition({ x: data.x, y: data.y })}
            >
                <div
                    ref={nodeRef}
                    className={`fixed ${
                        isMaximized ? "top-0 left-0 w-full h-full" : "top-20 left-20 w-[600px]"
                    } border border-gray-700 shadow-xl z-50 bg-gray-100`}
                    style={{ display: !isOpen || isMinimized ? "none" : undefined }}
                >
                    {/* Title bar */}
                    <div className="drag-handle flex items-center justify-between px-2 py-1 cursor-move select-none"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgb(31,47,134) 0px,rgb(49,101,196) 3%,rgb(54,130,229) 6%,rgb(68,144,230) 10%,rgb(43,113,224) 18%,rgb(33,87,214) 40%,rgb(37,98,223) 86%,rgb(25,65,165) 98%)",
                        }}
                    >
                        <div className="flex items-center gap-2 text-white">
                            <Image src={addressBook} alt="icon" width={16} height={16} />
                            <span className="text-sm font-bold">My Resume - Microsoft Word</span>
                        </div>
                        <div className="flex gap-1">
                            <button onClick={toggleMinimize} className="w-6 h-6 border border-black cursor-pointer" title="Minimize">
                                <Image src={minimizeIcon} height={50} width={50} alt="minimize" />
                            </button>
                            <button onClick={toggleMaximize} className="w-6 h-6 border border-black cursor-pointer" title="Maximize / Restore">
                                {isMaximized
                                    ? <Image src={restoreIcon} height={50} width={50} alt="restore" />
                                    : <Image src={maximizeIcon} height={50} width={50} alt="maximize" />}
                            </button>
                            <button onClick={closeWindow} className="w-6 h-6 border border-black cursor-pointer" title="Close">
                                <Image src={closeIcon} height={50} width={50} alt="close" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`bg-white p-4 relative ${
                        isMaximized ? "h-[calc(100vh-2rem)] flex items-center justify-center" : "h-[400px]"
                    } overflow-auto`}>
                        <Image
                            src={resumeScreenshot}
                            alt="resume"
                            width={500}
                            height={400}
                            className={isMaximized ? "object-contain h-full w-full" : ""}
                        />
                        <a
                            href={resumeScreenshot.src}
                            download="Ha_Nguyen_Resume.png"
                            className="absolute top-0 right-0 bg-red-400 hover:bg-red-500 text-white p-2 rounded-md text-sm m-4 cursor-pointer"
                        >
                            Download my resume
                        </a>
                    </div>
                </div>
            </Draggable>

            {/* Taskbar button — visible whenever window is open */}
            {isOpen && (
                <div
                    className={`fixed bottom-0 left-24 z-50 px-3 h-[30px] flex items-center gap-1 cursor-pointer text-xs text-white border-r border-[#4a7ebf] ${
                        isMinimized ? "bg-blue-900 opacity-80" : "bg-blue-600"
                    }`}
                    style={{ minWidth: "110px" }}
                    onClick={isMinimized ? restoreWindow : toggleMinimize}
                >
                    📄 My Resume
                </div>
            )}
        </>
    );
}
