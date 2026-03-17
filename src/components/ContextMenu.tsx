"use client";
import { useEffect } from "react";

interface Props {
    x: number;
    y: number;
    onClose: () => void;
}

const ITEMS = [
    { label: "Arrange Icons By", arrow: true },
    { label: "Refresh" },
    { separator: true },
    { label: "Paste" },
    { label: "Paste Shortcut" },
    { separator: true },
    { label: "New", arrow: true },
    { separator: true },
    { label: "Properties" },
];

export default function ContextMenu({ x, y, onClose }: Props) {
    useEffect(() => {
        const close = () => onClose();
        window.addEventListener("click", close);
        window.addEventListener("contextmenu", close);
        return () => {
            window.removeEventListener("click", close);
            window.removeEventListener("contextmenu", close);
        };
    }, [onClose]);

    // Clamp so menu doesn't overflow screen
    const safeX = Math.min(x, window.innerWidth - 180);
    const safeY = Math.min(y, window.innerHeight - ITEMS.length * 24 - 40);

    return (
        <div
            className="fixed z-[300]"
            style={{
                left: safeX,
                top: safeY,
                background: "#f0f0f0",
                border: "1px solid #808080",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.35)",
                minWidth: "168px",
                padding: "2px",
            }}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
        >
            {ITEMS.map((item, i) =>
                item.separator ? (
                    <div key={i} style={{ borderTop: "1px solid #a0a0a0", margin: "3px 4px" }} />
                ) : (
                    <div
                        key={i}
                        className="flex items-center justify-between px-4 py-0.5 text-sm cursor-pointer group"
                        style={{ color: "#000" }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "#003399";
                            (e.currentTarget as HTMLElement).style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                            (e.currentTarget as HTMLElement).style.color = "#000";
                        }}
                        onClick={onClose}
                    >
                        <span>{item.label}</span>
                        {item.arrow && <span className="text-xs">▶</span>}
                    </div>
                )
            )}
        </div>
    );
}
