"use client";
import { useState, useEffect, useRef, RefObject } from "react";
import Image from "next/image";
import Draggable from "react-draggable";
import minimizeIcon from "@/image/icons/Minimize.png";
import closeIcon from "@/image/icons/Exit.png";

const ROWS = 9, COLS = 9, MINES = 10;

type Cell = { isMine: boolean; isRevealed: boolean; isFlagged: boolean; neighbors: number };
type Status = "idle" | "playing" | "won" | "lost";

const NUM_COLORS: Record<number, string> = {
    1: "#0000ff", 2: "#007b00", 3: "#ff0000",
    4: "#00007b", 5: "#7b0000", 6: "#007b7b",
    7: "#000000", 8: "#7b7b7b",
};

function makeBoard(): Cell[][] {
    return Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => ({ isMine: false, isRevealed: false, isFlagged: false, neighbors: 0 }))
    );
}

function buildBoard(skipR: number, skipC: number): Cell[][] {
    const b = makeBoard();
    let placed = 0;
    while (placed < MINES) {
        const r = Math.floor(Math.random() * ROWS);
        const c = Math.floor(Math.random() * COLS);
        if ((Math.abs(r - skipR) <= 1 && Math.abs(c - skipC) <= 1) || b[r][c].isMine) continue;
        b[r][c].isMine = true;
        placed++;
    }
    for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++) {
            if (b[r][c].isMine) continue;
            let n = 0;
            for (let dr = -1; dr <= 1; dr++)
                for (let dc = -1; dc <= 1; dc++) {
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && b[nr][nc].isMine) n++;
                }
            b[r][c].neighbors = n;
        }
    return b;
}

function flood(board: Cell[][], row: number, col: number): Cell[][] {
    const b = board.map(r => r.map(c => ({ ...c })));
    const q: [number, number][] = [[row, col]];
    while (q.length) {
        const [r, c] = q.shift()!;
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS) continue;
        if (b[r][c].isRevealed || b[r][c].isFlagged) continue;
        b[r][c].isRevealed = true;
        if (b[r][c].neighbors === 0 && !b[r][c].isMine)
            for (let dr = -1; dr <= 1; dr++)
                for (let dc = -1; dc <= 1; dc++)
                    if (!(dr === 0 && dc === 0)) q.push([r + dr, c + dc]);
    }
    return b;
}

interface Props {
    isOpen: boolean; isMinimized: boolean;
    toggleMinimize: () => void; closeWindow: () => void; restoreWindow: () => void;
    position: { x: number; y: number }; setPosition: (p: { x: number; y: number }) => void;
}

export default function Minesweeper({ isOpen, isMinimized, toggleMinimize, closeWindow, restoreWindow, position, setPosition }: Props) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const [board, setBoard] = useState<Cell[][]>(makeBoard);
    const [status, setStatus] = useState<Status>("idle");
    const [flags, setFlags] = useState(0);
    const [time, setTime] = useState(0);
    const [pressing, setPressing] = useState(false);

    useEffect(() => {
        if (status !== "playing") return;
        const id = setInterval(() => setTime(t => Math.min(t + 1, 999)), 1000);
        return () => clearInterval(id);
    }, [status]);

    const reset = () => { setBoard(makeBoard()); setStatus("idle"); setFlags(0); setTime(0); };

    const handleClick = (r: number, c: number) => {
        if (status === "won" || status === "lost") return;
        if (board[r][c].isRevealed || board[r][c].isFlagged) return;
        let b = board;
        if (status === "idle") { b = buildBoard(r, c); setStatus("playing"); }
        if (b[r][c].isMine) {
            const lost = b.map(row => row.map(cell => ({ ...cell, isRevealed: cell.isMine ? true : cell.isRevealed })));
            setBoard(lost); setStatus("lost"); return;
        }
        const next = flood(b, r, c);
        setBoard(next);
        if (next.every(row => row.every(cell => cell.isMine || cell.isRevealed))) setStatus("won");
    };

    const handleFlag = (e: React.MouseEvent, r: number, c: number) => {
        e.preventDefault();
        if (status === "won" || status === "lost" || board[r][c].isRevealed) return;
        const next = board.map(row => row.map(c => ({ ...c })));
        next[r][c].isFlagged = !next[r][c].isFlagged;
        setFlags(f => next[r][c].isFlagged ? f + 1 : f - 1);
        setBoard(next);
    };

    const face = status === "won" ? "😎" : status === "lost" ? "😵" : pressing ? "😮" : "🙂";

    // XP beveled border helpers
    const raised = { border: "2px solid", borderColor: "#ffffff #808080 #808080 #ffffff" } as React.CSSProperties;
    const sunken = { border: "2px solid", borderColor: "#808080 #ffffff #ffffff #808080" } as React.CSSProperties;

    return (
        <>
            <Draggable
                nodeRef={nodeRef as RefObject<HTMLElement>}
                handle=".ms-drag"
                position={position}
                onStop={(_e, d) => setPosition({ x: d.x, y: d.y })}
            >
                <div
                    ref={nodeRef}
                    className="fixed top-16 left-80 z-50 shadow-xl select-none"
                    style={{ display: !isOpen || isMinimized ? "none" : undefined, background: "#c0c0c0", ...raised }}
                >
                    {/* Title bar */}
                    <div
                        className="ms-drag flex items-center justify-between px-2 py-1 cursor-move"
                        style={{ backgroundImage: "linear-gradient(rgb(31,47,134) 0px,rgb(49,101,196) 3%,rgb(54,130,229) 6%,rgb(68,144,230) 10%,rgb(43,113,224) 18%,rgb(33,87,214) 40%,rgb(37,98,223) 86%,rgb(25,65,165) 98%)" }}
                    >
                        <div className="flex items-center gap-2 text-white text-sm font-bold">
                            <span>💣</span> Minesweeper
                        </div>
                        <div className="flex gap-1">
                            <button onClick={toggleMinimize} className="w-6 h-6 border border-black cursor-pointer">
                                <Image src={minimizeIcon} height={50} width={50} alt="minimize" />
                            </button>
                            <button onClick={closeWindow} className="w-6 h-6 border border-black cursor-pointer">
                                <Image src={closeIcon} height={50} width={50} alt="close" />
                            </button>
                        </div>
                    </div>

                    {/* Game */}
                    <div className="p-2">
                        {/* Header */}
                        <div className="flex items-center justify-between px-3 py-1 mb-2" style={{ ...sunken, background: "#c0c0c0" }}>
                            <div className="font-mono bg-black text-red-500 px-1 text-xl font-bold leading-none py-0.5" style={{ minWidth: "3ch", textAlign: "right" }}>
                                {String(Math.max(MINES - flags, -99)).padStart(3, "0")}
                            </div>
                            <button
                                onClick={reset}
                                className="text-xl w-8 h-8 flex items-center justify-center cursor-pointer"
                                style={{ ...raised, background: "#c0c0c0" }}
                            >
                                {face}
                            </button>
                            <div className="font-mono bg-black text-red-500 px-1 text-xl font-bold leading-none py-0.5" style={{ minWidth: "3ch", textAlign: "right" }}>
                                {String(Math.min(time, 999)).padStart(3, "0")}
                            </div>
                        </div>

                        {/* Grid */}
                        <div style={{ ...sunken, display: "inline-block" }}>
                            {board.map((row, r) => (
                                <div key={r} className="flex">
                                    {row.map((cell, c) => {
                                        const showMine = cell.isMine && status === "lost";
                                        const content =
                                            cell.isFlagged && !cell.isRevealed ? "🚩"
                                            : cell.isRevealed && cell.isMine ? "💣"
                                            : cell.isRevealed && cell.neighbors > 0 ? cell.neighbors
                                            : "";
                                        return (
                                            <button
                                                key={c}
                                                className="w-6 h-6 flex items-center justify-center font-bold"
                                                style={{
                                                    fontSize: "11px",
                                                    background: showMine ? "#ff0000" : "#c0c0c0",
                                                    color: cell.neighbors ? NUM_COLORS[cell.neighbors] : undefined,
                                                    ...(cell.isRevealed
                                                        ? { border: "1px solid #808080" }
                                                        : raised),
                                                }}
                                                onClick={() => handleClick(r, c)}
                                                onContextMenu={(e) => handleFlag(e, r, c)}
                                                onMouseDown={() => setPressing(true)}
                                                onMouseUp={() => setPressing(false)}
                                            >
                                                {content}
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>

                        {(status === "won" || status === "lost") && (
                            <p className="text-center text-xs mt-2 font-bold" style={{ color: status === "won" ? "#007b00" : "#ff0000" }}>
                                {status === "won" ? "You win! 🎉" : "Game over! 💥"} — Click 🙂 to restart
                            </p>
                        )}
                    </div>
                </div>
            </Draggable>

            {isOpen && (
                <div
                    className={`fixed bottom-0 z-50 px-3 h-[30px] flex items-center gap-1 cursor-pointer text-xs text-white border-r border-[#4a7ebf] ${isMinimized ? "bg-blue-900 opacity-80" : "bg-blue-600"}`}
                    style={{ left: "350px", minWidth: "110px" }}
                    onClick={isMinimized ? restoreWindow : toggleMinimize}
                >
                    💣 Minesweeper
                </div>
            )}
        </>
    );
}
