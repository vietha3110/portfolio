"use client";
import bgHome from "@/image/bgHomeImg.webp";
import Folders from "@/components/Folders";
import StartFooter from "@/components/StartFooter";
import ErrorDialog from "@/components/ErrorDialog";
import ContextMenu from "@/components/ContextMenu";
import { useEffect, useState } from "react";

export default function Home() {
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const audio = new Audio("/sound/startup.mp3");
        audio.play().catch(() => {});
    }, []);

    return (
        <div
            className="relative h-svh w-screen overflow-hidden flex flex-col"
            style={{
                backgroundImage: `url(${bgHome.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                setContextMenu({ x: e.clientX, y: e.clientY });
            }}
        >
            <Folders />
            <StartFooter />
            <ErrorDialog />
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onClose={() => setContextMenu(null)}
                />
            )}
        </div>
    );
}
