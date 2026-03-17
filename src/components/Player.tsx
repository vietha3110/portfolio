"use client";
import Image from "next/image";
import Draggable from "react-draggable";
import { RefObject, useRef, useState, useEffect } from "react";
import windowsMediaPlayer from "@/image/icons/Windows Media Player 10.png";
import minimizeIcon from "@/image/icons/Minimize.png";
import closeIcon from "@/image/icons/Exit.png";
import maximizeIcon from "@/image/icons/Maximize.png";
import restoreIcon from "@/image/icons/Restore.png";

interface PlayerWindowProps {
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

const BAR_DELAYS = [0, 0.1, 0.2, 0.05, 0.15, 0.25, 0.08, 0.18, 0.03, 0.13, 0.22, 0.07];
const BAR_DURATIONS = [0.6, 0.8, 0.5, 0.9, 0.7, 0.6, 0.85, 0.65, 0.75, 0.55, 0.8, 0.7];

export default function Player({
    isOpen,
    isMinimized,
    isMaximized,
    toggleMinimize,
    toggleMaximize,
    closeWindow,
    restoreWindow,
    position,
    setPosition,
}: PlayerWindowProps) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(80);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(() => {});
            setIsPlaying(true);
        }
    };

    const handleStop = () => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
        setProgress(0);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const onTimeUpdate = () => {
            if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
        };
        const onEnded = () => setIsPlaying(false);
        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("ended", onEnded);
        return () => {
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("ended", onEnded);
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume / 100;
    }, [volume]);

    return (
        <>
            {/* Keep Draggable always mounted so the ref stays valid across open/close/minimize */}
            <Draggable
                nodeRef={nodeRef as RefObject<HTMLElement>}
                handle=".player-drag-handle"
                disabled={isMaximized}
                position={position}
                onStop={(_e, data) => setPosition({ x: data.x, y: data.y })}
            >
                <div
                    ref={nodeRef}
                    className={`fixed ${
                        isMaximized ? "top-0 left-0 w-full h-full" : "top-24 left-56 w-[380px]"
                    } border border-gray-800 shadow-2xl z-50`}
                    style={{ display: !isOpen || isMinimized ? "none" : undefined }}
                >
                    {/* Title bar */}
                    <div
                        className="player-drag-handle flex items-center justify-between px-2 py-1 cursor-move select-none"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgb(31,47,134) 0px,rgb(49,101,196) 3%,rgb(54,130,229) 6%,rgb(68,144,230) 10%,rgb(43,113,224) 18%,rgb(33,87,214) 40%,rgb(37,98,223) 86%,rgb(25,65,165) 98%)",
                        }}
                    >
                        <div className="flex items-center gap-2 text-white">
                            <Image src={windowsMediaPlayer} alt="icon" width={16} height={16} />
                            <span className="text-sm font-bold">Windows Media Player</span>
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

                    {/* Player body */}
                    <div style={{ background: "#1e1e2e", color: "white" }}>
                        {/* Visualizer */}
                        <div
                            className="flex items-end justify-center gap-1 px-4"
                            style={{ background: "#000", height: "120px", paddingBottom: "12px" }}
                        >
                            {BAR_DELAYS.map((delay, i) => (
                                <div
                                    key={i}
                                    className={`w-4 rounded-sm${isPlaying ? " player-bar-animate" : ""}`}
                                    style={{
                                        background: "linear-gradient(180deg,#ff6600,#ffcc00)",
                                        height: "6px",
                                        animationDelay: `${delay}s`,
                                        animationDuration: `${BAR_DURATIONS[i]}s`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Track info */}
                        <div className="px-4 py-2 border-b border-gray-700 text-center">
                            <p className="text-sm font-bold truncate">Windows XP Startup Sound</p>
                            <p className="text-xs text-gray-400">Ha Nguyen Portfolio</p>
                        </div>

                        {/* Progress bar */}
                        <div className="px-4 py-2">
                            <div className="w-full h-2 rounded overflow-hidden" style={{ background: "#333" }}>
                                <div
                                    className="h-full rounded transition-all duration-300"
                                    style={{ width: `${progress}%`, background: "linear-gradient(90deg,#2563eb,#60a5fa)" }}
                                />
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-4 px-4 pb-3">
                            <button className="text-white p-1 hover:text-blue-400" title="Previous">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                                </svg>
                            </button>
                            <button className="text-white p-1 hover:text-blue-400" title="Stop" onClick={handleStop}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 6h12v12H6z" />
                                </svg>
                            </button>
                            <button
                                onClick={togglePlay}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer"
                                style={{ background: "linear-gradient(180deg,#3b82f6,#1d4ed8)" }}
                                title={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>
                            <button className="text-white p-1 hover:text-blue-400" title="Next">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 18l8.5-6L6 6v12zm2.5-6 6-4.3V16zM16 6h2v12h-2z" />
                                </svg>
                            </button>
                            <div className="flex items-center gap-1 ml-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                                </svg>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={volume}
                                    className="w-16 h-1 accent-blue-500 cursor-pointer"
                                    onChange={(e) => setVolume(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>

                    <audio ref={audioRef} src="/sound/startup.mp3" />
                </div>
            </Draggable>

            {/* Taskbar button */}
            {isOpen && (
                <div
                    className={`fixed bottom-0 z-50 px-3 h-[30px] flex items-center gap-1 cursor-pointer text-xs text-white border-r border-[#4a7ebf] ${
                        isMinimized ? "bg-blue-900 opacity-80" : "bg-blue-600"
                    }`}
                    style={{ left: "230px", minWidth: "110px" }}
                    onClick={isMinimized ? restoreWindow : toggleMinimize}
                >
                    🎵 Media Player
                </div>
            )}
        </>
    );
}
