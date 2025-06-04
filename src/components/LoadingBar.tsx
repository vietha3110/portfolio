"use client"
import { useState, useEffect } from "react";

export default function LoadingBarTest() {
    const totalSegments = 20;
    const activeSegments = 3; 
    const animationSpeed = 150; 

    const [currentStartSegment, setCurrentStartSegment] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentStartSegment(prev => (prev + 1) % totalSegments);
        }, animationSpeed);
        return () => clearInterval(intervalId);
    }, [totalSegments, setCurrentStartSegment, animationSpeed]);

    return (
        <div className="w-[440px] h-[28px] p-[2px] rounded-md border border-foreground shadow-inner">
            <div className="flex w-full h-full items-center space-x-[2px]">
                {Array.from({ length: totalSegments }).map((_, index) => {
                let isActive = false;
                
                for (let i = 0; i < activeSegments; i++) {
                    if ((currentStartSegment + i) % totalSegments === index) {
                        isActive = true;
                        break;
                    }
                }
                return (
                    <div
                        key={index}
                        className={`h-[14px] flex-1 ${
                            isActive ? 'bg-[#0058E4]' : 'transparent'
                        }`}
                    >
                    </div>
                );
                })} 
            </div>
        </div>

    )
}
