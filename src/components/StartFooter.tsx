import xpLogo from "@/image/logo.png";
import Image from "next/image";
import RightStartFooter from "./RightStartFooter";

export default function StartFooter() {
    return (
        <footer>
            <div
                className="absolute bottom-0 w-full z-40"
                style={{
                    backgroundImage:
                        "linear-gradient(rgb(31,47,134) 0px,rgb(49,101,196) 3%,rgb(54,130,229) 6%,rgb(68,144,230) 10%,rgb(56,131,229) 12%,rgb(43,113,224) 15%,rgb(38,99,218) 18%,rgb(35,91,214) 20%,rgb(34,88,213) 23%,rgb(33,87,214) 38%,rgb(36,93,219) 54%,rgb(37,98,223) 86%,rgb(36,95,220) 89%,rgb(33,88,212) 92%,rgb(29,78,192) 95%,rgb(25,65,165) 98%)",
                    boxShadow: "0 -1px 2px #00000080",
                }}
            >
                <div className="h-8 flex items-center justify-between w-full">
                    {/* Start button */}
                    <div className="shrink-0">
                        <button
                            className="flex flex-row px-4 h-8 items-center rounded-r-lg italic font-bold text-white text-sm"
                            style={{
                                backgroundImage:
                                    "linear-gradient(180deg,#509d4f 0%,#499e47 69.2%,#48b347 100%)",
                                boxShadow:
                                    "1px 1px 1px #196045 inset,2px 0 3px #00000040 inset,0 -4px 4px #00000040 inset,-4px 0 6px #00000040 inset,2px 4px 4px #ffffff78 inset,0 0 #ffffff40 inset,4px 0 4px #00000040 inset",
                            }}
                        >
                            <Image src={xpLogo} width={20} height={20} alt="logo" />
                            <span className="ml-2">start</span>
                        </button>
                    </div>

                    {/* Taskbar window area (window buttons float here via fixed positioning) */}
                    <div className="flex-1 h-full" />

                    {/* System tray */}
                    <RightStartFooter />
                </div>
            </div>
        </footer>
    );
}
